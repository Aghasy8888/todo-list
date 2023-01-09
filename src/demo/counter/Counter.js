import React from "react";
import ChangeCount from "./ChangeCount";
import ShowCount from "./ShowCount";

function Counter() {
  return (
    <div>
      <ShowCount />
      <ChangeCount />
    </div>
  );
}

export default Counter;
