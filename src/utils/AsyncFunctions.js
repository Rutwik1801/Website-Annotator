import { collection, addDoc,getDocs,doc,deleteDoc } from "firebase/firestore"; 
import { db } from "./firebase";


export const SendBoxData=async (boxObject)=>{
    try {
        const docRef = await addDoc(collection(db, "boxes"), {
         ...boxObject
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const GetBoxData=async ()=>{

    const querySnapshot = await getDocs(collection(db, "boxes"));
    let temp=[]
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
}

export const SendCommentData=async (comment,commentBoxId,uniqueCommentId)=>{
    try {
        const docRef = await addDoc(collection(db, "comments"), {
         commentBoxId:commentBoxId,
           uniqueCommentId:uniqueCommentId,
          comment:comment,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const GetCommentData=async (id,comment,uniqueCommentId,commentBoxId)=>{

}
export const DeleteComment=async (commentBoxId,uniqueCommentId)=>{
  await deleteDoc(doc(db, "comments", uniqueCommentId));

}