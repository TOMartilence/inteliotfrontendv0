import React from 'react'
import Timeline from '../Components/Timeline'
import Timelineform from "../Components/Timelineform"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"
function TimelinePage() {
    const [count, setCount] = useState(0);
    const [formdisplay, setFormdisplay] = useState("none");
    const [timelinedata,setTimelinedata] = useState([]);
    const handleNewTimeline = () => {
        console.log(count);
        setCount((prevCount) => prevCount + 1);
        if (count >= 0 && count % 2 === 0) {
          setFormdisplay("");
        } else {
          setFormdisplay("none");
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_backendbaseurl }/api/gettimelinedata`);
            setTimelinedata(response.data.data.reverse());
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div style={{
        backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        position: "absolute",
        minHeight: "100vh",
        left: "0",
        width: "100%",
        overflow: "hidden",
    }}>
        <Timelineform display = {formdisplay} />
        <Timeline events={timelinedata}/> 
      {sessionStorage.getItem("token") ? (<>
      <button onClick={handleNewTimeline} style={{backgroundColor:"white",borderRadius:"50%",height : "50px",width:"50px",border : "none",position:"fixed",bottom : "20px",right:"20px"}}><i className='fas fa-plus' style={{fontSize:"34px",color:"black"}}></i></button>
      </>) : ("")}
    </div>
  )
}


export default TimelinePage
