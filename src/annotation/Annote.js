import React from "react";
import "./annote.css";
import CommentsBox from "../comments/commentsBox"

export default class Annote extends React.Component {
  constructor(props) {
    super(props);
    this.animationInProgress = null;
    this.state = {
      viewCommentsFlag:false,
      commentId:-1,
      flag:false,
      hold: false,
      selectionBox: false,
      selectionBoxOrigin: [0, 0],
      selectionBoxTarget: [0, 0],
      animation: "",
    // --------  ------my additions
      allBoxes:[],
      rectHt:0,
      rectWt:0,
    //   -----------------------
    };
  }

  handleTransformBox() {
    if(this.state.flag){
      const { selectionBoxOrigin, selectionBoxTarget } = this.state;
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

  closeSelectionBox() {
    if(this.state.flag){
    // black rectangle dimensions-------------
  //   this.setState({flag:true,rectHt: Math.abs(
  //     this.state.selectionBoxTarget[1] - this.state.selectionBoxOrigin[1] - 1
  //   ),
  //  rectWt: Math.abs(
  //     this.state.selectionBoxTarget[0] - this.state.selectionBoxOrigin[0] - 1
  //   ),
  // })
  // storing all the selected rectangles-----------
  this.state.allBoxes.push({flag:true,rectHt: Math.abs(
      this.state.selectionBoxTarget[1] - this.state.selectionBoxOrigin[1] - 1
    ),
   rectWt: Math.abs(
      this.state.selectionBoxTarget[0] - this.state.selectionBoxOrigin[0] - 1
    ),
    x:this.state.selectionBoxOrigin[0],
    y:this.state.selectionBoxOrigin[1]
  })
  console.log(this.state)

  // -------------
  //   ------------------------------------
  if (this.props.onMouseUp) this.props.onMouseUp();
  this.setState({
    hold: false,
    animation: "react-rectangle-selection--fadeout"
  });
  this.animationInProgress = setTimeout(() => {
    this.setState({ animation: "" });
    this.setState({ selectionBox: false });
    this.animationInProgress = null;
  }, 300);
    }
  }

  handleMouseDown(e) {
    if(this.state.flag){
      if (this.props.disabled) return;
      let doubleClick = false;
      clearTimeout(this.animationInProgress);
      this.animationInProgress = null;
      this.setState({ selectionBox: false, animation: "" });
  
      if (
        this.state.animation.length > 0 &&
        e.target.id === "react-rectangle-selection"
      ) {
        this.setState({ selectionBox: false, animation: "" });
        doubleClick = true;
      }
  
      this.setState({
        hold: true,
        selectionBoxOrigin: [e.nativeEvent.pageX, e.nativeEvent.pageY],
        selectionBoxTarget: [e.nativeEvent.pageX, e.nativeEvent.pageY]
      });
    }
  }

  render() {
    const baseStyle = {
      zIndex: 10,
      left: this.state.selectionBoxOrigin[0],
      top: this.state.selectionBoxOrigin[1],
      height: Math.abs(
        this.state.selectionBoxTarget[1] - this.state.selectionBoxOrigin[1] - 1
      ),
      width: Math.abs(
        this.state.selectionBoxTarget[0] - this.state.selectionBoxOrigin[0] - 1
      ),
      userSelect: "none",
      transformOrigin: "top left",
      transform: this.handleTransformBox()
    };
    return (
      <div>
       <div
        style={{ height: "inherit", width: "inherit" }}
        onMouseLeave={() => {
          this.closeSelectionBox();
        }}
        onMouseDown={e => this.handleMouseDown(e)}
        onMouseUp={() => this.closeSelectionBox()}
        onMouseMove={evt => {
          if (this.state.hold && !this.state.selectionBox) {
            if (this.props.onMouseDown) this.props.onMouseDown();
            this.setState({ selectionBox: true });
          }
          if (this.state.selectionBox && !this.animationInProgress) {
            this.setState({
              selectionBoxTarget: [evt.nativeEvent.pageX, evt.nativeEvent.pageY]
            });

            this.props.onSelect(evt, {
              origin: this.state.selectionBoxOrigin,
              target: this.state.selectionBoxTarget
            });
          }
        }}
      >
        {this.state.selectionBox && (
          <div
            className={`react-rectangle-selection ${this.state.animation}`}
            id={"react-rectangle-selection"}
            style={Object.assign(baseStyle, this.props.style)}
          />
        )}
        {this.props.children}
        {/* all the boxes created by the user will be displayed--------- */}
        {this.state.allBoxes.map((e,idx)=>{
           return (
            <div>
            <div key={idx}
             style={{height:e.rectHt,
             width:e.rectWt,
             backgroundColor:"rgba(0,0,255,0.1)",
             position:"absolute",
             zIndex:10,
             left:e.x,
             top:e.y}}>
            {!this.state.flag &&
            <div>
            {/* <button id={idx} className="comment-btn">Add Comment</button> */}
            <button id={idx} className="comment-btn" 
            onClick={()=>{this.setState({viewCommentsFlag:true,commentId:idx})}}>View Comments</button>
            </div>}</div>
           </div>
           );
        })}
        {this.state.viewCommentsFlag  && <CommentsBox commentsFlag={this.state.commentsFlag} commentId={this.state.commentId} />}
        {/* ============================ */}
      </div>

      <button className="annotation-trigger--btn" 
       onClick={()=>{this.setState({flag:!this.state.flag})}}>
        {this.state.flag?"Stop Annotation":"Start Annotation"}
      </button>

      </div>
    );
  }
}