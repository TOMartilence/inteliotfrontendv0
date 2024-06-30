import React, { useState, useEffect } from 'react';

const Typer = ({ sentence }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    if (isDeleting) {
      if (index > 0) {
        const timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, typingSpeed);
        return () => clearTimeout(timeoutId);
      } else {
        setIsDeleting(false);
        setTypingSpeed(60);
      }
    } else {
      if (index < sentence.length) {
        const timeoutId = setTimeout(() => {
          setDisplayedText((prev) => prev + sentence.charAt(index));
          setIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timeoutId);
      } else {
        setIsDeleting(true);
        setTypingSpeed(50); // Increase speed while deleting
      }
    }
  }, [index, isDeleting, sentence, typingSpeed]);

  return <div className="typing-effect">{displayedText}</div>;
};

export default Typer;
