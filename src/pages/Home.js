import React, { useEffect } from "react";
import '../App.css';
import ScoreTable from "../components/ScoreTable";
import Button from './../components/Button';
import Title from './../components/Title';
import { useScore } from '../contexts/scoreData';

function Home() {
  //Here, the function that brings the total data and the total score data is taken over the context.
  const {totalScores, getTotalScores} = useScore();

  //Here, total data is retrieved from the context.
  useEffect(getTotalScores, []);

  //Here, the components of the first opened page are printed on the screen.
  return (
    <div className="dp-flex-center home">
        <Title title="Mathematics Game" isSmall={false} width="510" height="10"/>
        <ScoreTable isTotal={true} point={totalScores.point} questions={totalScores.questions} answers={totalScores.answers}/>
        <Button title="Start" final={false}/>
    </div>
  );
}

export default Home;