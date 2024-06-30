import React, { useState, useEffect } from 'react';

const ComingSoon = () => {
  const initialTimeLeft = {
    days: 30,
    hours: 23,
    minutes: 59,
    seconds: 30,
  };

  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const newTime = { ...prevTime };

        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else {
          if (newTime.minutes > 0) {
            newTime.minutes--;
            newTime.seconds = 59;
          } else {
            if (newTime.hours > 0) {
              newTime.hours--;
              newTime.minutes = 59;
              newTime.seconds = 59;
            } else {
              if (newTime.days > 0) {
                newTime.days--;
                newTime.hours = 23;
                newTime.minutes = 59;
                newTime.seconds = 59;
              } else {
                clearInterval(timer);
              }
            }
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="coming-soon-container">
      <h1 className="coming-soon-title">Coming Soon</h1>
      <div className="timer">
        <span>{timeLeft.days} days </span>
        <span>{timeLeft.hours} hours </span>
        <span>{timeLeft.minutes} minutes </span>
        <span>{timeLeft.seconds} seconds</span>
      </div>
    </div>
  );
};

export default ComingSoon;
