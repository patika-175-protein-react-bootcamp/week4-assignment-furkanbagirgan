import React from "react";
import {Correct,Wrong} from '../constants/icons/index';

//Here, a component is created that displays the solved questions.
const QuestionTable = ({questions,results}) => (
  <div className="questionTable">
    {
      questions.map((question,index)=>(
        index<10 &&
        (<div key={index} className="dp-flex-row questionPanel">
          <span className="span1">{question}</span>
          <span className="span2">{(results[index]===1 ? <Correct size="31" color="white"/> : <Wrong width="21" height="26" color="white"/>)}</span>
        </div>)
      ))
    }
  </div>
)
export default QuestionTable;