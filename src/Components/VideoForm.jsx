import React from 'react'
import { useState } from 'react'
import axios from "axios"
function VideoForm() {
    const [height,setHeight]=useState(0);
    const [width,setWidth] = useState(0);
    const [link,setLink] = useState("");
    const handleSubmit = async(e)=>{
      e.preventDefault();
        try {
            const response = await axios.post("https://inteliotbackendv0.onrender.com/api/addYtvideo",{link,height,width});
            alert(response.data.message)
        } catch (error) {

        }
    } 
  return (
    <>
    <div style={ {  backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        top: "0",
        minHeight: "100vh",
        left: "0",
        width: "100%",
        overflow: "hidden",
        padding: "30px",}}>
      <form onSubmit={handleSubmit} style={ { position: "absolute" , top : "200px", left : "50%", transform : "translateX(-50%)",color : "black",backgroundColor : "wheat",padding : "40px"}}>
        <div className="form-group">
          <label htmlFor="question">Youtube Link:</label>
          <input
            type="text"
            id="question"
            name="question"
            onChange={(e)=>setLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Width: </label>
          <input
            type="text"
            id="question"
            name="question"
            onChange={(e)=>setWidth(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="question">Height:</label>
          <input
            type="text"
            id="question"
            name="question"
            onChange={(e)=>{setHeight(e.target.value)}}
            required    
          />
        </div>
        <button type="submit" style={{backgroundColor:"yellow",color : "black",fontWeight : "bolder",padding : "4px",border : "0.2px solid black",borderRadius : "4px",overflow : "hidden"}}>Submit</button>
      </form>
    </div>

    <div style={{border : "2px solid white",height : height, width : width}}>
        
    </div>
    </>
  )
}

export default VideoForm
