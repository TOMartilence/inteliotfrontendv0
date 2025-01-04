import React from 'react';
import {Link} from "react-router-dom"
const Timeline = ({ events }) => {
  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div
          key={index}
          className={`timeline-container ${index % 2 === 0 ? 'left' : 'right'}`}
          style={{ marginTop: "70px" }}
        >
          <div className="timeline-dot"></div>

          <div className="timeline-content">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <br />
            <p className="timeline-date">
              <strong>
                From: {event.startDate.substring(0, 10)} <br />
                To: {event.endDate.substring(0, 10)}
              </strong>
            </p>
            <Link to= "/gallery"><button className='viewPhotosButton' >View Photos</button></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
