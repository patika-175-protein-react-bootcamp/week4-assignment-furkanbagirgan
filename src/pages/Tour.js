import React, { useEffect, useState } from "react";
import '../App.css';
import Question from './../components/Question';
import Choice from './../components/Choice';
import { useNavigate } from "react-router-dom";
import { useScore } from '../contexts/scoreData';

function Tour() {
  //Here are the necessary states in the page and the data and functions taken from the context.
  const {tourScores,controlTourScores, getQuestion,addQuestion,addResult} = useScore();
  const [question,setQuestion] = useState();
  const [choices,setChoices] = useState([]);
  const [choiceColors,setChoiceColors] = useState(["white","white","white"]);
  const [choiceCorrect,setChoiceCorrect] = useState([]);
  const [buttonActive,setButtonActive] = useState(true);
  const navigate = useNavigate();

  //Here, the necessary function is called to display the question on the screen at the first boot.
  useEffect(()=>{
    nextQuestion();
  },[]);

  //Here, the questions and options required on the screen are pulled from the context and set to show on the screen.
  function nextQuestion(){
    const {nextQuestion,result,result1,result2,result3}=getQuestion();
    const choice1Correct=result===result1;
    const choice2Correct=result===result2;
    const choice3Correct=result===result3;
    setChoiceCorrect([choice1Correct,choice2Correct,choice3Correct]);
    setQuestion(nextQuestion);
    const currentQuestion=nextQuestion+" = "+result;
    addQuestion(currentQuestion);
    setChoices([result1,result2,result3]);
  }

  //Here, the events that will take place on the screen are set by checking the accuracy for each clicked choice.
  const control= (isCorrect,order,choiceValue)=>{
    if(buttonActive){
      setButtonActive(!buttonActive);
      if(isCorrect){
        document.body.style.backgroundColor="#00BF63";
        setChoiceColors(prev=>{
          let newColors=[...prev];
          newColors[order-1]="black";
          return newColors;
        });
        addResult(1);
      }
      else{
        document.body.style.backgroundColor="#FA0000";
        setChoiceColors(prev=>{
          let newColors=[...prev];
          newColors[order-1]="black";
          let index=choiceCorrect.findIndex(choice=>choice);
          newColors[index]="#00BF63";
          return newColors;
        });
        addResult(0);
      }
      document.querySelector(".choice"+order+" span").style.color="black";
      //After waiting for 3 seconds, new questions and options appear on the screen.
      setTimeout(() => {
        if(tourScores.question<=10){
          document.body.style.backgroundColor="#2D2D2D";
          setChoiceColors(["white","white","white"]);
          document.querySelector(".choice"+order+" span").style.color="white";
          controlTourScores(isCorrect,choiceValue);
          nextQuestion();
          setButtonActive(true);
          if(tourScores.question===10){
            document.body.style.backgroundColor="#2D2D2D";
            navigate("/outcome");
          }
        }
      }, 3000);
    }
  }

  //Here, deactivation or activation is performed according to the clicks of the buttons.
  var choiceButtons=(
    <div className="dp-flex-row choices">
      <Choice choice={choices[0]} order="1" control={()=>{}} color={choiceColors[0]}/>
      <Choice choice={choices[1]} order="2" control={()=>{}} color={choiceColors[1]}/>
      <Choice choice={choices[2]} order="3" control={()=>{}} color={choiceColors[2]}/>
    </div>
  );
  if (buttonActive) {
    choiceButtons = (
      <div className="dp-flex-row choices">
        <Choice choice={choices[0]} order="1" control={()=>control(choiceCorrect[0],1,choices[0])} color={choiceColors[0]}/>
        <Choice choice={choices[1]} order="2" control={()=>control(choiceCorrect[1],2,choices[1])} color={choiceColors[1]}/>
        <Choice choice={choices[2]} order="3" control={()=>control(choiceCorrect[2],3,choices[2])} color={choiceColors[2]}/>
      </div>
    );
  }
  //Here, the components of the tour page are printed on the screen.
  return (
    <div className="tour">
        <div className="dp-flex-row scorePanel">
          <div className="dp-flex-row scores">
            <span>{"Score: "+tourScores.point}</span>
            <span>{"Tour: "+tourScores.tour}</span>
            <span>{"Questions: "+tourScores.answers+"/"+tourScores.question}</span>
          </div>
        </div>
        <Question question={question}/>
        <div className="dp-flex-row choicePanel">
          {choiceButtons}
        </div>
    </div>
  );
}

export default Tour;