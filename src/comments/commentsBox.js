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
  // useEffect(()=>{
  //       const querySnapshot= getDocs(collection(db, "comments"));
  //         querySnapshot.forEach((e)=>{
  //           setComments(e.data())
  //           console.log(e.data())
  //         })
  // },[]);
  const handleClick=async ()=>{
    const querySnapshot= await getDocs(collection(db, "comments"));
    let temp=[];
    querySnapshot.forEach((e)=>{
      temp.push(e.data());
      // setComments(e.data())
      // console.log(e.data())
    })
    setComments(temp)
    console.log(comments)
  }
  const handleSendComment=async (e)=>{
    e.preventDefault();
    // console.log(comment)
    SendCommentData(comment)
  }
  return (
    <div className='main-comments--div'>
         <button className="btn-close" onClick={handleBoxCloseClick}>
        X
      </button>
      <button onClick={handleClick}>fff</button>
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
        return(
          <div  style={{ backgroundColor: "#FCF8E8" ,padding:"5px 10px",margin:"5px",borderRadius:"5px",letterSpacing:"2px",overflow:"hidden"}}>
            <p>img</p>
            <p>{comment}</p>
            <button className='resolve--btn'>Resolve</button>
          </div>
        );
      })}
    </div>
  );
}