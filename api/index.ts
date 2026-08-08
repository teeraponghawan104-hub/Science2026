import express from "express";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

const app = express();
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
       const allData: any = {};
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
    const activities = ['rocket', 'painting', 'essay', 'quiz', 'recycle', 'show'];
    let found = null;
    let foundActId = null;
    for (const actId of activities) {
      const docRef = doc(db, "registrations", actId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const list = snap.data().list || [];
        const r = list.find((x: any) => x.id === regId);
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
    const summary: any = {};
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
  const { activityId, data } = req.body;
  try {
    const docRef = doc(db, "registrations", activityId);
    const snap = await getDoc(docRef);
    const list = snap.exists() ? snap.data().list || [] : [];
    
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
     const allData: any[] = [];
     for(const aId of activities) {
        const docRef = doc(db, "registrations", aId);
        const snap = await getDoc(docRef);
        allData.push({ actId: aId, list: snap.exists() ? snap.data().list || [] : [] });
     }
     
     let isDuplicate = false;
     let dupActivityId = '';
     
     for (const { actId, list } of allData) {
        const isMorning = periods[actId]?.isMorning;
        const isAfternoon = periods[actId]?.isAfternoon;
        const timeConflict = (periods.currentIsMorning && isMorning) || (periods.currentIsAfternoon && isAfternoon);
        
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

export default app;
