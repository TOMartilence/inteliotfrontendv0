import React from "react";

function Loader(props) {
  return (
    <div>
      <body>
        <div id="loader" style={{ display: props.display , zIndex:"100000"}}>
          <div class="ls-particles ls-part-1"></div>
          <div class="ls-particles ls-part-2"></div>
          <div class="ls-particles ls-part-3"></div>
          <div class="ls-particles ls-part-4"></div>
          <div class="ls-particles ls-part-5"></div>
          <div class="lightsaber ls-left ls-green"></div>
          <div class="lightsaber ls-right ls-red"></div>
        </div>
      </body>
    </div>
  );
}

export default Loader;
