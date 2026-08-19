const fs = require('fs');

const activities = [
  { id:'rocket', name:'จรวดขวดน้ำ', mode:'team', teamMin:3, teamMax:3 },
  { id:'painting', name:'วาดภาพระบายสี', mode:'individual' },
  { id:'recycle', name:'ประกวดชุดรีไซเคิล', mode:'individual' }
];

const mockAdminLists = {
  rocket: [
    { fullName: "นาย ก", members: ["นาย ข", "นาย ค"], room: "6/1", grade: "ม.6" }
  ],
  painting: [
    { fullName: "นาย ง", room: "6/1", grade: "ม.6" },
    { fullName: "นาย จ", room: "6/1", grade: "ม.6" }
  ],
  recycle: [
    { fullName: "นาย ฉ", members: ["นาง ช"], room: "6/1", grade: "ม.6" }
  ]
};

let roomStats = {};
Object.entries(mockAdminLists).forEach(([actId, list]) => {
  list.forEach(r => {
    const grade = (r.grade || 'ไม่ระบุ').trim();
    const roomNum = (r.room || '-').trim();
    let fullRoom = 'ไม่ระบุ';
    if (grade !== 'ไม่ระบุ') {
      const gNum = grade.replace('ม.', '');
      if (roomNum.includes('/')) {
        fullRoom = roomNum.startsWith('ม.') ? roomNum : 'ม.' + roomNum;
      } else {
        fullRoom = 'ม.' + gNum + '/' + roomNum;
      }
    }
    const isTeamAct = ['team'].includes(activities.find(a => a.id === actId)?.mode) || actId === 'recycle';
    const increment = actId === 'recycle' 
        ? 1 + (Array.isArray(r.members) ? r.members.length : 0) 
        : ((isTeamAct && Array.isArray(r.members)) ? Math.max(1, r.members.length) : 1);
    
    if (!roomStats[fullRoom]) roomStats[fullRoom] = { total: 0, activities: {} };
    roomStats[fullRoom].total += increment;
    
    if (!roomStats[fullRoom].activities[actId]) {
      roomStats[fullRoom].activities[actId] = { count: 0, items: [] };
    }
    roomStats[fullRoom].activities[actId].count += increment;
    
    if (isTeamAct) {
      const teamMembers = Array.isArray(r.members) && r.members.length > 0 ? r.members.join(', ') : 'ไม่มีข้อมูลสมาชิก';
      roomStats[fullRoom].activities[actId].items.push(`ทีม: ${r.teamName || '-'} (${teamMembers})`);
    } else {
      roomStats[fullRoom].activities[actId].items.push(r.fullName || '-');
    }
  });
});

console.log(JSON.stringify(roomStats, null, 2));
