import React, { useState ,useEffect } from "react";
import '../App.css';
import ScoreTable from "../components/ScoreTable";
import Button from './../components/Button';
import Title from './../components/Title';
import QuestionTable from './../components/QuestionTable';
import { useScore } from '../contexts/scoreData';

function Outcome() {
  //Here, the functions that reset the tour scores and the tour score data,
  //the questions and results data is taken over the context.
  const {tourScores,resetTour,questions,results} = useScore();
  const [scores,setScores] = useState({});

  //Here, tour data is transferred to state without resetting and it saves this data to local storage.
  //Finally, it resets the tour data.
  useEffect(()=>{
    setScores(tourScores);
    saveScores();
    resetTour();
  },[]);

  //Here, the function that saves tour data to local storage.
  function saveScores(){
    let newScores = JSON.parse(localStorage.getItem('totalScores'));
    console.log(scores);
    newScores.point+=tourScores.point;
    newScores.questions+=(tourScores.question-1);
    newScores.answers+=tourScores.answers;
    localStorage.setItem('totalScores',JSON.stringify(newScores));
  }

  //Here, the components of the final page are printed on the screen.
  return (
    <div className="dp-flex-row outcome">
      <div className="dp-flex-center finalScores">
        <Title title="Final" isSmall={true} width="170"  height="7"/>
        <ScoreTable isTotal={false} point={scores.point} questions={(scores.question-1)} answers={scores.answers}/>
        <Button title="Restart" final={true}/>
      </div>
      <div className="allQuestions">
        <Title title="All Questions" isSmall={false} width="380"  height="10"/>
        <QuestionTable questions={questions} results={results}/>
      </div>
    </div>
  );
}

export default Outcome;