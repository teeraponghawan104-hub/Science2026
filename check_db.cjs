const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = require('./firebase-applet-config.json');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const docRef = doc(db, 'registrations', 'recycle');
  const snap = await getDoc(docRef);
  if(snap.exists()){
    console.log(JSON.stringify(snap.data(), null, 2));
  } else {
    console.log("No data for recycle");
  }
  process.exit(0);
}
run();
