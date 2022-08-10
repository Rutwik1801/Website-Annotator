import React,{useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import RepliesBox from '../replies/RepliesBox';
import "./commentsBox.css"

export default function CommentsBox(props) {
  // comment written by the user
  const [comment, setComment] = useState("");
  const [allReplies, setAllReplies] = useState([]);
  const [particularReplies, setParticularReplies] = useState([]);
  const [replyFlag, setReplyFlag] = useState(false);
  // =============================
  useEffect(() => {}, [props.comments]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  // add comment to allComments array and also show the comments of currently selected box
  const handleClick = async (e) => {
    // uuidv4() to create unique id for each comment
    props.handleFilterComments(props.commentBoxId, comment, uuidv4());
    // ==========================
  };
  // =============================================

  const handleResolveClick = (e) => {
    props.handleResolveComments(props.commentBoxId, e.target.id);
  };

  // when user clicks the view replies button
  const handleViewRepliesClick = () => {
    setReplyFlag(true);
    console.log(replyFlag);
  };

  // =======================

  //  add reply to all reply and particular reply
  const handleFilterReplies = (uniqueCommentId, uniqueReplyId, reply,commentBoxId) => {
    let temp = allReplies;
    temp.push({
      commentBoxId:commentBoxId,
      uniqueCommentId: uniqueCommentId,
      uniqueReplyId: uniqueReplyId,
      reply: reply,
    });
    setAllReplies(temp);
    setParticularReplies(
      allReplies.filter((e) => {
        return (e.uniqueCommentId === uniqueCommentId && e.commentBoxId===props.commentBoxId);
      })
    );
    // add updated replies to replies array in comment object
    // props.handleAddRepliesToComment(uniqueCommentId,particularReplies,props.commentBoxId)
    // ==========================
  };
  //  ====================================

  // close the comment box when user clicks on x
  const handleBoxCloseClick = () => {
    props.handleBoxCloseClick();
  };
  // =====================

  const handleRepliesBoxClose = () => {
    setReplyFlag(false);
  };

  return (
    <div className="main-comments--div">
      <button className="btn-close" onClick={handleBoxCloseClick}>
        X
      </button>
      <div>
        <input
          className="add-comment--input"
          type="text"
          placeholder="type your comment"
          onChange={handleChange}
        />
        <button className="add-comment--btn" onClick={handleClick}>
          +
        </button>
      </div>
      <div>
        {props.comments.map((e, idx) => {
          return (
            <div key={idx} style={{ backgroundColor: "#eee" }}>
              <p>{e.comment}</p>
              <p>{props.commentBoxId}</p>
              <p>{e.uniqueCommentId}</p>
              <button onClick={handleViewRepliesClick}>View Replies</button>
              <button id={e.uniqueCommentId} onClick={handleResolveClick}>
                Resolve
              </button>
              <div>
                {replyFlag && (
                  <RepliesBox
                    commentBoxId={props.commentBoxId}
                    handleRepliesBoxClose={handleRepliesBoxClose}
                    uniqueCommentId={props.uniqueCommentId}
                    replies={particularReplies}
                    handleFilterReplies={handleFilterReplies}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
