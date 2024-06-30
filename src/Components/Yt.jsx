import React from 'react';
import PropTypes from 'prop-types';

function Yt(props) {
  const videoId = props.link.split('/').pop().split('?')[0];
  const embedLink = `https://www.youtube.com/embed/${videoId}`;
  console.log(videoId);
  console.log(embedLink);
  return (
    <div>
      <iframe
        width={props.width}
        height={props.height}
        src={embedLink}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>

      <p></p>
    </div>
  );
}

Yt.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Yt;
