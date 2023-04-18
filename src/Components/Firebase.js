// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc,updateDoc, serverTimestamp, doc, query, limit, orderBy, where, onSnapshot} from 'firebase/firestore'
import { getAuth
        , GoogleAuthProvider
        , signInWithPopup
        , onAuthStateChanged,  
        signOut} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseapp);
const answersCol = collection(db, 'answers'); 
const levelCol = collection(db, 'level'); 


let currentDoc;
async function startLevel() {
  const docRef = await addDoc(levelCol, {
    startTime: serverTimestamp(),
    endTime: serverTimestamp(), 
    level: 'Waldo', 
    userid: getCurrentUserId(),
    displayName: getCurrentUserName()
  })
  currentDoc = docRef.id;
  return docRef.id; //new id of document.
}

async function endLevel() {
  // debugger;
  await updateDoc(doc(db, "level", currentDoc), {
    endTime: serverTimestamp()
  })
  
  //create timeTaken
  let timeTakenUser = 0;
  await getDocs(levelCol)
    .then(snapshot => {
      snapshot.forEach(async doc1 => {
        if(doc1.id === currentDoc) {
          let timeTaken = doc1.data().endTime - doc1.data().startTime; 
          timeTakenUser = timeTaken; 

          await updateDoc(doc(db, "level", currentDoc), {
            timeTaken: timeTaken
          })
        }
      })
    })
  
    return timeTakenUser;
}

async function getAnswer(answer,position) {
  let answers = [];
  await getDocs(answersCol)
  .then((snapshot) => {
    snapshot.docs.forEach((doc)=> {
      if (doc.data().name.toLowerCase() === answer.toLowerCase()) {
        answers.push({ ...doc.data(), id: doc.id })
      }
    })
  }).catch( err => {
    console.error(err);
  }); 
  let checkAnswerReturn = checkAnswer(answers[0],position);
  return checkAnswerReturn;
}

function checkAnswer(answer, position) {
  let correctPosition = false; 
  if (
    answer.x >= position.vLeftMin && answer.x <= position.vLeftMax
    &&
    answer.y >= position.vTopMin && answer.y <= position.vTopMax
  ) {
    correctPosition = true; 
  }  
  return correctPosition; 
}



// User sign in functions
const auth = getAuth(firebaseapp)
signUserOut(); // sign out user first.

const provider = new GoogleAuthProvider();

async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider); 
  } catch(error) {
    console.error(error)
  }
}


onAuthStateChanged(auth, (user) => {
  if (user) {
    //user is signed in...
    const uid = user.uid;
  } else {
    //user is signed out..
  }
})

function getCurrentUserId() {
  return auth?.currentUser?.uid ||  null;
}
function getCurrentUserName() {
  return auth?.currentUser?.displayName || null;
}

function signUserOut() {
  signOut(auth)
    .then(() => {
      //success
    })
    .catch(error => {
      console.error(error);
    })
}


// Leaderboard
async function getLeaderboard() {
  const q = query(levelCol, orderBy("userid"),orderBy("timeTaken"), where("userid", "!=", null), limit(10));
  return new Promise((resolve, reject) => {
      onSnapshot(q, (snapshot) => {
      const board = snapshot.docs.map(q => ({id: q.id, ...q.data()}))
      resolve(board);
    })
  })  
}

export default { firebaseapp, getAnswer, googleSignIn,getCurrentUserId, startLevel, endLevel, signUserOut, getLeaderboard }