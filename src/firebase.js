import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signOut, signInWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCv_IEvfBcnAkGea3M6tzj13s1iJUsOBx8",
  authDomain: "netflix-clone-7ad4b.firebaseapp.com",
  projectId: "netflix-clone-7ad4b",
  storageBucket: "netflix-clone-7ad4b.appspot.com",
  messagingSenderId: "211484890830",
  appId: "1:211484890830:web:b6a36c966c26a4454de29f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async(name, email, password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid : user.uid,
            name,
            authProvider:"local",
            email,
            
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, signUp, login, logout}