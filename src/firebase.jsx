import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyB2_Pu2NOq1oTDeZ6dKhp6k2ePS3mJKQdo",
    authDomain: "gato-minimax.firebaseapp.com",
    projectId: "gato-minimax",
    storageBucket: "gato-minimax.appspot.com",
    messagingSenderId: "1071507517842",
    appId: "1:1071507517842:web:92cc35edbe33a14437d14b",
    measurementId: "G-CLT87VKX31"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export async function postResult(game) {
    // Reference to your collection and document
    const docRef = collection(db,'resultados');

    addDoc(docRef, game)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            throw new Error("Error writing document: ", error)
        });
}

export async function getStats() {
    // Reference to your collection and document
    
    const snapshot = await getDocs(collection(db, 'resultados'));
    const data = snapshot.docs.map( doc => doc.data() ) 

    return({
        total: data.length,
        wins: data.filter( doc => doc.winner === false).length,
        loses: data.filter( doc => doc.winner === true ).length,
        draws: data.filter( doc => doc.winner === null).length,
        matches: data.length,
    })

    /*
 
    const data = snapshot.map(doc => doc.data());
    console.log(data)
    return data;
    
    */

    /*
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    */
}