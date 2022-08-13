import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { getDocs,collection } from 'firebase/firestore';
import { db } from '../utils/firebase';
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
      const querySnapshot= await getDocs(collection(db, "comments"));
      let temp=[];
      querySnapshot.forEach((e)=>{
        if(e.data().commentBoxId===props.commentBoxId)
        temp.push(e.data());
      })
      setComments(temp)
      console.log(comments)
      console.log("this one comments")
    }
    gets();
  },[]);
// =============================
// async call to send typed comment
  const handleSendComment=async (e)=>{
    e.preventDefault();
    SendCommentData(comment,props.commentBoxId,uuidv4())
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
      {comments.map(({id,comment})=>{
        return (
          <div
            style={{
              backgroundColor: "#FCF8E8",
              padding: "5px 10px",
              margin: "5px",
              borderRadius: "5px",
              letterSpacing: "2px",
              overflow: "hidden",
            }}
          >
            <p>img</p>
            <p>{comment}</p>
            <button className="resolve--btn">Resolve</button>
          </div>
        );
      })}
    </div>
  );
}