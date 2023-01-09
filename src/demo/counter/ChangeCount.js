import React from "react";
import Increment from "./Increment";
import Decrement from "./Decrement";

function ChangeCount(props) {
  return (
    <div>
      <Increment />
      <Decrement />
    </div>
  );
}

export default ChangeCount;
