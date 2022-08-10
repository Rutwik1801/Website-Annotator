import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase";
export const SendCommentData=async ()=>{
    try {
        const docRef = await addDoc(collection(db, "boxes"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}