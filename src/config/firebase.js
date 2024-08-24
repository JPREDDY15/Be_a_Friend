import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDoc, getDocs } from "firebase/firestore"; 
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAARZIzgsBfwP4asHtx2BkpfkTO_ZBv4AI",
  authDomain: "chat-app-b7444.firebaseapp.com",
  projectId: "chat-app-b7444",
  storageBucket: "chat-app-b7444.appspot.com",
  messagingSenderId: "1093840083987",
  appId: "1:1093840083987:web:2961203d09534941ebb3e6"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email: email,
      name: "",
      avatar: "",
      bio: "Hey, There I am using chat app",
      lastSeen: Date.now()
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: []
    });
    toast.success("User created successfully!");
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" ")); 
  }
};
const login=async(email,password)=>{
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }
  catch(error)
  {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};
const logout=async()=>
{
  try{
    await signOut(auth)
  }
  catch(error)
  {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
const resetPass=async(email)=>{
  if(!email)
  {
    toast.error("Enter your email");
    return null;
  }
  try {
    const userRef=collection(db,'users');
    const q=query(userRef,where("email","==",email));
    const querySnap=await getDocs(q);
    if(!querySnap.empty)
    {
      await sendPasswordResetEmail(auth,email);
      toast.success("Reset Email Sent");
    }
    else{
      toast.error("Email doesn't exists")
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message)
  }
}

export { signup ,login,logout,db,auth,resetPass};
