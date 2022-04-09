import React from "react";

//Here, a component is created that displays the total and tour scores.
const ScoreTable = ({isTotal,point,questions,answers}) => (
  <div className="dp-flex-center scoreTable">
    <span>{isTotal ? "Total Point: " + point : "Point: " + point}</span>
    <span>{isTotal ? "Total Questions: " + questions : "Questions: " + questions}</span>
    <span>{"Correct Answers: " + answers}</span>
  </div>
)
export default ScoreTable;