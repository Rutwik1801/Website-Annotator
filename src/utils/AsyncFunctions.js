import { collection, addDoc,getDocs,doc } from "firebase/firestore"; 
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

export const SendCommentData=async (id,comment,uniqueCommentId,commentBoxId)=>{
    try {
        const docRef = await addDoc(collection(db, "comments"), {
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

    const querySnapshot = await getDocs(collection(db, "comments"));
    let temp=[]
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
}

export const SendReplyData=async (uniqueCommentId, uniqueReplyId, reply,commentBoxId)=>{
  try {
      const docRef = await addDoc(collection(db, "replies"), {
        commentBoxId:commentBoxId,
        uniqueCommentId: uniqueCommentId,
        uniqueReplyId: uniqueReplyId,
        reply: reply,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

export const GetReplyData=async ()=>{

  const querySnapshot = await getDocs(collection(db, "replies"));
  let temp=[]
  querySnapshot.forEach((doc) => {
    temp.push(doc.data());
  });
  return temp;
}