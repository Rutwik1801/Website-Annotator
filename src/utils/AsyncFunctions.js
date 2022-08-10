import { collection, addDoc,getDocs,doc } from "firebase/firestore"; 
import { db } from "./firebase";
export const SendCommentData=async (id,comment,uniqueCommentId,commentBoxId)=>{
    try {
        const docRef = await addDoc(collection(db, "boxes"), {
         commentBoxId:commentBoxId,
           uniqueCommentId:uniqueCommentId,
          comment:comment,
         replies:[]
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const GetCommentData=async (id,comment,uniqueCommentId,commentBoxId)=>{

    const querySnapshot = await getDocs(collection(db, "boxes"));
    let temp=[]
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push(doc.data());
    //   console.log(doc.id, " => ", doc.data());
    });
    return temp;
}