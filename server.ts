import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import fs from "fs";
import cors from "cors";

const firebaseConfig = {
  "projectId": "dogwood-provider-lcf5x",
  "appId": "1:462562646689:web:d002cbc35d38f921706ee0",
  "apiKey": "AIzaSyCqCrkizf9tfbLyZB8Hk7c8p6SPWMfDdHs",
  "authDomain": "dogwood-provider-lcf5x.firebaseapp.com",
  "firestoreDatabaseId": "ai-studio-7cc38071-589f-44ad-ae71-6b6190adf747",
  "storageBucket": "dogwood-provider-lcf5x.firebasestorage.app",
  "messagingSenderId": "462562646689"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

const ADMIN_CODE = process.env.ADMIN_CODE || 'SCI2569';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // --- API ROUTES ---

  // Get all registrations (only for admin)
  app.post("/api/admin/registrations", async (req, res) => {
    const { passcode, activityId } = req.body;
    if (passcode !== ADMIN_CODE) {
      return res.status(401).json({ error: "Invalid passcode" });
    }
    
    try {
      if (activityId === 'all') {
         const activities = ['rocket', 'painting', 'essay', 'quiz', 'recycle', 'show'];
         const allData = {};
         for (const actId of activities) {
           const docRef = doc(db, "registrations", actId);
           const snap = await getDoc(docRef);
           allData[actId] = snap.exists() ? snap.data().list || [] : [];
         }
         return res.json({ allData });
      } else {
         const docRef = doc(db, "registrations", activityId);
         const snap = await getDoc(docRef);
         const list = snap.exists() ? snap.data().list || [] : [];
         res.json({ list });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  // Get specific registration status
  app.get("/api/status/:regId", async (req, res) => {
    const { regId } = req.params;
    
    try {
      // In a real app we'd query better, but here we just fetch all to find it
      // since the client previously fetched all.
      // We will optimize by checking until found.
      const activities = ['rocket', 'painting', 'essay', 'quiz', 'recycle', 'show'];
      let found = null;
      let foundActId = null;

      for (const actId of activities) {
        const docRef = doc(db, "registrations", actId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const list = snap.data().list || [];
          const r = list.find(x => x.id === regId);
          if (r) {
            found = r;
            foundActId = actId;
            break;
          }
        }
      }

      if (found) {
        res.json({ found, foundActId });
      } else {
        res.status(404).json({ error: "Not found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  // Get public summary of all activities (seat counts)
  app.get("/api/activities/summary", async (req, res) => {
    try {
      const activities = ['rocket', 'painting', 'essay', 'quiz', 'recycle', 'show'];
      const summary = {};
      
      for (const actId of activities) {
        const docRef = doc(db, "registrations", actId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const list = snap.data().list || [];
          summary[actId] = list.length;
        } else {
          summary[actId] = 0;
        }
      }
      res.json({ summary });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  // Register
  app.post("/api/register", async (req, res) => {
    const DEADLINE = new Date('2026-08-13T23:59:59+07:00');
    if (Date.now() > DEADLINE.getTime()) {
        return res.status(400).json({ error: "หมดเวลารับสมัครแล้ว" });
    }
    
    const { activityId, data, isTeam } = req.body;
    
    try {
      const docRef = doc(db, "registrations", activityId);
      const snap = await getDoc(docRef);
      const list = snap.exists() ? snap.data().list || [] : [];
      
      // Check room limits (for teams typically 1, for individuals it varies)
      if (data.room) {
         const limit = req.body.roomLimit !== undefined ? req.body.roomLimit : (isTeam ? 1 : 0);
         if (limit > 0) {
             const normalizeRoom = (str) => {
                 const m = str.match(/[\d\/]+/);
                 return m ? m[0] : str.replace(/\s+/g, '').toLowerCase();
             };
             const roomCount = list.filter((r: any) => r.room && normalizeRoom(r.room) === normalizeRoom(data.room)).length;
             if (roomCount >= limit) {
                 return res.status(400).json({ error: `โควตาห้องนี้เต็มแล้ว (สูงสุด ${limit} ${isTeam ? 'ทีม' : 'คน'}/ห้อง)` });
             }
         }
      }
      
      const entry = {
        id: activityId.slice(0,3).toUpperCase()+'-'+Date.now().toString(36).toUpperCase(),
        timestamp: new Date().toISOString(),
        ...data
      };
      
      list.push(entry);
      await setDoc(docRef, { list });
      
      res.json({ success: true, entry });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Admin Check Duplicates
  app.post("/api/check-duplicate", async (req, res) => {
    const { phone, searchName, searchMembers, periods } = req.body;
    
    try {
       const activities = ['rocket', 'painting', 'essay', 'quiz', 'recycle', 'show'];
       
       const allData = [];
       for(const aId of activities) {
          const docRef = doc(db, "registrations", aId);
          const snap = await getDoc(docRef);
          allData.push({ actId: aId, list: snap.exists() ? snap.data().list || [] : [] });
       }
       
       let isDuplicate = false;
       let dupActivityId = '';
       
       for (const { actId, list } of allData) {
          // In a real app we'd map actId to period. We'll pass periods from client.
          const isMorning = periods[actId]?.isMorning;
          const isAfternoon = periods[actId]?.isAfternoon;
          
          // "ชื่อห้ามซ้ำทุกรายการ ยกเว้นรายการตอนบ่าย" means afternoon activities do not conflict with each other
          // So conflict only happens if BOTH are morning activities.
          // Wait, if one is morning and one is morning -> conflict.
          // If one is afternoon and one is afternoon -> NO conflict (because of the exception).
          // If one is morning and one is afternoon -> NO conflict.
          const timeConflict = (periods.currentIsMorning && isMorning);
          
          if (timeConflict) {
             const found = list.find((r: any) => {
                if (phone && r.phone === phone) return true;
                const rName = r.fullName || r.teamName;
                const rMembers = Array.isArray(r.members) ? r.members : [];
                if (searchName && (rName === searchName || rMembers.includes(searchName))) return true;
                if (searchMembers && searchMembers.some((m: string) => m === rName || rMembers.includes(m))) return true;
                return false;
             });
             if (found) {
               isDuplicate = true;
               dupActivityId = actId;
               break;
             }
          }
       }
       
       res.json({ isDuplicate, dupActivityId });
    } catch (e) {
       console.error(e);
       res.status(500).json({ error: "Server error" });
    }
  });

  // Admin / User Cancel Registration
  app.post("/api/cancel", async (req, res) => {
    const { activityId, regId, passcode } = req.body;
    
    // In a real app, require some auth to cancel (like a token or admin passcode).
    // If it's a student cancelling their own, they might just need the regId. 
    // We'll trust regId since it's hard to guess (e.g. ROC-123ABCD)
    
    try {
      const docRef = doc(db, "registrations", activityId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const list = snap.data().list || [];
        const newList = list.filter((x: any) => x.id !== regId);
        await setDoc(docRef, { list: newList });
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Not found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  });

  // Admin Reset Activity
  app.post("/api/admin/reset", async (req, res) => {
     const { activityId, passcode } = req.body;
     if (passcode !== ADMIN_CODE) {
       return res.status(401).json({ error: "Invalid passcode" });
     }
     
     try {
       const docRef = doc(db, "registrations", activityId);
       await setDoc(docRef, { list: [] });
       res.json({ success: true });
     } catch (e) {
       console.error(e);
       res.status(500).json({ error: "Server error" });
     }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
