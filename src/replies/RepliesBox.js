import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./RepliesBox.css"

export default function RepliesBox(props) {
    // reply written by the user
    const [reply,setReply]=useState("");
// =============================
    useEffect(()=>{

    },[props.replies])

    const handleChange=(e)=>{
       setReply(e.target.value)
    }

    // add comment to allComments array and also show the comments of currently selected box
    const handleClick=(e)=>{
      // uuidv4() to create unique id for each comment
        props.handleFilterReplies(props.uniqueCommentId,reply,uuidv4())
        // ==========================
    }
// =============================================

//  const handleResolveClick=(e)=>{
//   props.handleResolveComments(props.uniqueCommentId,e.target.id)
//  }

  return (
    <div className='main-comments--div' >
      <button className='btn-close'>X</button>
        <div>
        <input className='add-comment--input' type="text" placeholder="type your reply" onChange={handleChange} />
        <button className='add-comment--btn' 
        onClick={handleClick}
        >+</button>
        </div>
        <div>
        {props.replies.map((e,idx)=>{
          return (
             <div key={idx} style={{backgroundColor:"#eee"}}>
                <p>
                    {e.reply}
                </p>
                <p>{props.uniqueCommentId}</p>
                <p>{e.uniqueCommentId}</p>
                <button>View Replies</button>
            </div>
          );
        })}
        </div>
        </div>

  )
}