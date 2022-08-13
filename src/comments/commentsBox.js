import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getDocs,collection, orderBy } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import "./commentsBox.css";
import { SendCommentData } from '../utils/AsyncFunctions';

export default function CommentsBox(props){
  const [comments,setComments]=useState([]);
  const [comment, setComment] = useState("");

  const handleBoxCloseClick = () => {
    props.handleBoxCloseClick();
  };
    const handleChange = (e) => {
      setComment(e.target.value);
    };

    // load all comments when site loads
  useEffect(()=>{
    const gets=async()=>{
      const querySnapshot= await getDocs(collection(db, "comments"),orderBy("createdAt","desc"));
      let temp=[];
      querySnapshot.forEach((e)=>{
        if(e.data().commentBoxId===props.commentBoxId)
        temp.push(e.data());
      })
      setComments(temp)
      console.log(temp)
      console.log("this one comments")
    }
    gets();
  },[]);
// =============================
// async call to send typed comment
  const handleSendComment=async (e)=>{
    e.preventDefault();
    SendCommentData(comment,props.commentBoxId,uuidv4(),props.user.uid,props.user.displayName,props.user.photoURL)
  }
  // ===========================
  return (
    <div className='main-comments--div'>
         <button className="btn-close" onClick={handleBoxCloseClick}>
        X
      </button>
      <form onSubmit={handleSendComment}>
      <input
          className="add-comment--input"
          type="text"
          placeholder="type your comment"
          value={comment}
          onChange={handleChange}
        />
        <button className="add-comment--btn" type='submit'>
          Post Comment
        </button>
      </form>
      <div style={{display:"flex",flexDirection:"column-reverse",alignItems:"flex-start"}}>
      {comments.map((commentObj)=>{
        return (
          <div
            className={(commentObj.userId===auth.currentUser.uid)?"sent--comment":"recieved--comment"}
          >
            <div>
            <img style={{height:"50px",width:"50px",borderRadius:"50%"}} src={commentObj.photoURL} />
            <p>{commentObj.userName}</p>
            </div>
            <p>{commentObj.comment}</p>
            {(commentObj.userId===auth.currentUser.uid) &&<button className="resolve--btn">Resolve</button>}
          </div>
        );
      })}
      </div>
    </div>
  );
}