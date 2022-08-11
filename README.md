This is a Website-Annotation Library Built on top of React.
Install it in any React Project and get going with a few lines of Code.

###App.js

import React,{ useState } from 'react';
import Annote from './annotation/ann';
function App() {
  const [coords,setCoords]=useState({
   origin:{
    x:0,
    y:0
   },
   target:{
    x:0,
    y:0
   }
  })

  return (
    <Annote
       onSelect={(e,coords)=>{
         setCoords({
          origin:coords.origin,
          target:coords.target
         })
       }}
       coords={coords}
       style={{
        backgroundColor: "rgba(0,0,255,0.4)",
        borderColor: "blue",
        borderColor: "5px dotted blue"
      }}
    >
    <div className="App" >
     Your Code
    </div>
    </Annote>
  );
}

export default App;


You can set the styles according to the object as shown in the code
