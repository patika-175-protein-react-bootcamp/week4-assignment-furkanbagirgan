import React from "react";
import {QuestionBoard} from '../constants/icons/index';

//Here, a component is created that combines the question icon and its text.
const Question = ({question}) => (
  <div className="question">
    <QuestionBoard size="651" color="white"/>
    <span>{question}</span>
  </div>
)
export default Question;