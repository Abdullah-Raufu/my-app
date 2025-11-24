import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import {addDoc, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword,getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {collection} from "firebase/firestore";
import { toast } from "react-toastify";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzUPSm2m-CLlr4XOxve2iCNdPP9QUq1DI",
  authDomain: "dev-master-x.firebaseapp.com",
  projectId: "dev-master-x",
  storageBucket: "dev-master-x.firebasestorage.app",
  messagingSenderId: "890403000107",
  appId: "1:890403000107:web:b96c5caee53fb44ea87f6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup=async(name, email, password )=>{
    try{
        const res= await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"users"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    }catch(err){
        console.log(err);

        toast.error(err.code.split("/")[1].split("-").join(" "));
    }
};

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(err){
        console.log(err);

        toast.error(err.code.split("/")[1].split("-").join(" "));
    }
};

const logout = ()=>{
    signOut(auth);
};
export {auth , db, login, signup, logout};