
# Website Annotator

Easy to use react website annotation library. Incorporate Annotation function in just few
Line of Code.


## Installation

Install my-project with npm
There are some issues with npm installation...Try using git clone instead
```bash
  npm install react-annote
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/Rutwik1801/Website-Annotator.git
```

Go to the project directory

```bash
  cd website-annotator
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm  start
```


## Usage/Examples

```javascript
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
    //  your Code
    </div>
    </Annote>
  );
}

export default App;

```



## Tech Stack

**Frontend:** ReactJs

**Backend:** FireBase


## Features

- Annotate all Sections of the Website
- SignIn
- Comment and Resolve Issues

