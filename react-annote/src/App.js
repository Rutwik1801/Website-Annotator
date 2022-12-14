import React,{ useState } from 'react';
import './App.css';
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
    </Annote>
  );
}

export default App;
