import React,{useState} from 'react'
import "./annote.css"
import CommentsBox from '../comments/commentsBox';
export default function Ann(props) {
    const [animationInProgress,setAnimationInProgress]=useState();
    const [viewCommentsFlag,setViewCommentsFlag]=useState(false)
    // id of annotation box as a whole
    const [commentBoxId,setCommentBoxId]=useState(-1)
    // ===================
    const [allComments,setAllComments]=useState([])
    const [particularComments,setParticularComments]=useState([])
    const [flag,setFlag]=useState(false)
    const [hold,setHold]=useState(false)
    const [selectionBox,setSelectionBox]=useState(false)
    const [selectionBoxOrigin,setSelectionBoxOrigin]=useState([0,0]);
    const [selectionBoxTarget,setSelectionBoxTarget]=useState([0,0]);
    const [animation,setAnimation]=useState("");
    //==========
    let [allBoxes,setAllBoxes]=useState([]);
    //==========

   const handleTransformBox=()=> {
        if(flag){
        //   const { selectionBoxOrigin, selectionBoxTarget } = this.state;
          if (
            selectionBoxOrigin[1] > selectionBoxTarget[1] &&
            selectionBoxOrigin[0] > selectionBoxTarget[0]
          )
            return "scaleY(-1) scaleX(-1)";
      
          if (selectionBoxOrigin[1] > selectionBoxTarget[1]) return "scaleY(-1)";
          if (selectionBoxOrigin[0] > selectionBoxTarget[0]) return "scaleX(-1)";
          return null;
        }
    
      }


     const closeSelectionBox=()=> {
        if(flag){
        // black rectangle dimensions-------------
      //   this.setState({flag:true,rectHt: Math.abs(
      //     this.state.selectionBoxTarget[1] - this.state.selectionBoxOrigin[1] - 1
      //   ),
      //  rectWt: Math.abs(
      //     this.state.selectionBoxTarget[0] - this.state.selectionBoxOrigin[0] - 1
      //   ),
      // })
      // storing all the selected rectangles-----------
      let temp=allBoxes;
      temp.push({flag:true,rectHt: Math.abs(
        selectionBoxTarget[1] -selectionBoxOrigin[1] - 1
      ),
     rectWt: Math.abs(
        selectionBoxTarget[0] -selectionBoxOrigin[0] - 1
      ),
      x:selectionBoxOrigin[0],
      y:selectionBoxOrigin[1]
    })
    setAllBoxes(temp);  
      // -------------
      //   ------------------------------------
      if (props.onMouseUp) props.onMouseUp();
      setHold(false);
      setAnimation("react-rectangle-selection--fadeout")
       setTimeout(() => {
        setAnimation("")
        setSelectionBox(false)
        setAnimationInProgress();
      }, 300);
        }
      }
    

     const  handleMouseDown=(e)=> {
        if(flag){
        //   if (this.props.disabled) return;
          // let doubleClick = false;
          clearTimeout(animationInProgress);
          setAnimationInProgress();
          setAnimation("");
          setSelectionBox(false)
      
          if (
            animation.length > 0 &&
            e.target.id === "react-rectangle-selection"
          ) {
            setSelectionBox(false);
            setAnimation("")
            // doubleClick = true;
          }
            setHold(true);
            setSelectionBoxOrigin([e.nativeEvent.pageX, e.nativeEvent.pageY]);
            setSelectionBoxTarget([e.nativeEvent.pageX, e.nativeEvent.pageY])
        }
      }

      const baseStyle = {
        zIndex: 10,
        left: selectionBoxOrigin[0],
        top: selectionBoxOrigin[1],
        height: Math.abs(
          selectionBoxTarget[1] - selectionBoxOrigin[1] - 1
        ),
        width: Math.abs(
          selectionBoxTarget[0] - selectionBoxOrigin[0] - 1
        ),
        userSelect: "none",
        transformOrigin: "top left",
        transform: handleTransformBox()
      };

  //  function to filter comments according to the annotation box selected
      const handleFilterComments=(id,comment,uniqueCommentId)=>{
        let temp=allComments;
        temp.push({commentBoxId:commentBoxId,
          uniqueCommentId:uniqueCommentId,
          comment:comment});
        setAllComments(temp)
        setParticularComments(allComments.filter((e)=>{
          return(e.commentBoxId===commentBoxId);
        }));
      }
// ==================================================================

// delete/resolve a comment
  const handleResolveComments=(commentBoxId,uniqueCommentId)=>{
    setAllComments(allComments.filter((e)=>{
      return(e.uniqueCommentId!==uniqueCommentId);
    }));  
    setParticularComments(allComments.filter((e)=>{
      return(e.commentBoxId===commentBoxId);
    }));   
  }

// ============================





      // const handleCommentsBoxFlag=(idx)=>{
      //   // console.log(e)
      //   setViewCommentsFlag(true);
      //   setCommentId(idx)
      //   setCommentsFlag(true)
      // }

  return (
    <div>
    <div
     style={{ height: "inherit", width: "inherit" }}
     onMouseLeave={() => {
       closeSelectionBox();
     }}
     onMouseDown={e => handleMouseDown(e)}
     onMouseUp={() => closeSelectionBox()}
     onMouseMove={evt => {
       if (hold && !selectionBox) {
         if (props.onMouseDown) props.onMouseDown();
         setSelectionBox(true)
       }
       if (selectionBox && !animationInProgress) {
        setSelectionBoxTarget([evt.nativeEvent.pageX, evt.nativeEvent.pageY]);

         props.onSelect(evt, {
           origin: selectionBoxOrigin,
           target: selectionBoxTarget
         });
       }
     }}
   >
     {selectionBox && (
       <div
         className={`react-rectangle-selection ${animation}`}
         id={"react-rectangle-selection"}
         style={Object.assign(baseStyle,props.style)}
       />
     )}
     {props.children}
     {/* all the boxes created by the user will be displayed--------- */}
     {allBoxes.map((e,idx)=>{
        return (
         <div>
         <div key={idx}
          style={{height:e.rectHt,
          width:e.rectWt,
          backgroundColor:"rgba(0,0,255,0.1)",
          border:"2px dashed rgba(0,0,255,0.4)",
          position:"absolute",
          zIndex:10,
          left:e.x,
          top:e.y}}>
         {!flag &&
         <div>
         {/* <button id={idx} className="comment-btn">Add Comment</button> */}

         {/* view comments button */}
         <button id={idx} className="comment-btn" 
         onClick={
          ()=>{
            setViewCommentsFlag(true);
            setCommentBoxId(idx)
            // handleCommentsBoxFlag(idx)
            }
            }></button>
         </div>}</div>
        </div>
        );
     })}
     {viewCommentsFlag  && <CommentsBox 
     commentBoxId={commentBoxId} 
     comments={particularComments} 
     handleFilterComments={handleFilterComments} 
     handleResolveComments={handleResolveComments}
     />}
     {/* ============================ */}
   </div>

   <button className="annotation-trigger--btn" 
    onClick={()=>{
        setFlag(!flag)
        }}>
     {flag?"Stop Annotation":"Start Annotation"}
   </button>

   </div>
  )
}
