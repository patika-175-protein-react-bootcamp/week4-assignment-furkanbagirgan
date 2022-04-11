import React, { useContext, useState } from "react";

const ScoreContext = React.createContext();

const ScoreProvider = ({ children }) => {
  //Here are the total scores to be taken from localStorage and the states of tour scores and their functions.
  const [totalScores, setTotalScores] = useState({});
  const [tourScores, setTourScores] = useState({
    point: 0,
    tour: 1,
    question: 1,
    answers: 0,
  });
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

  //Here, the solved question is added to the array of previously solved questions.
  const addQuestion = (question) => {
    setQuestions((prev) => {
      prev.push(question);
      return prev;
    });
  };

  //Here, the solved question's result is added to the array of previously results.
  const addResult = (result) => {
    setResults((prev) => {
      prev.push(result);
      return prev;
    });
  };

  //Here, total scores are retrieved from localStorage, if any, otherwise written.
  const getTotalScores = () => {
    const scores = JSON.parse(localStorage.getItem("totalScores"));

    if (scores) {
      setTotalScores(scores);
    } else {
      localStorage.setItem(
        "totalScores",
        JSON.stringify({
          point: 0,
          questions: 0,
          answers: 0,
        })
      );
      setTotalScores({
        point: 0,
        questions: 0,
        answers: 0,
      });
    }
  };

  //Here, for each question solution, the answer to that question is checked,
  //the necessary scores are updated and scores are added.
  const controlTourScores = (isCorrect, choiceValue) => {
    if (isCorrect) {
      const newPoint = Math.ceil(Math.sqrt(parseInt(choiceValue)));
      setTourScores((prev) => {
        let newScores = { ...prev };
        newScores.question++;
        newScores.answers++;
        newScores.point += newPoint;
        return newScores;
      });
    } else {
      setTourScores((prev) => {
        let newScores = { ...prev };
        newScores.question++;
        return newScores;
      });
    }
  };

  //Here, the existing lap scores are reset and the number of laps is increased by 1 to start a new round.
  const resetTour = () => {
    setQuestions([]);
    setResults([]);
    setTourScores((prev) => {
      let newScores = { ...prev };
      newScores.point = 0;
      newScores.tour++;
      newScores.question = 1;
      newScores.answers = 0;
      return newScores;
    });
  };

  //It is randomly selected from the numbers, and the selected number is reduced or increased and assigned to the wrong options.
  function getWrongChoices(number1,number2){
    let wrongC=[];
    let num1 = 1;
    let num2 = 1;
    if (Math.floor(Math.random() * 2) + 1 === 1) {
      if (Math.floor(Math.random() * 2) + 1 === 1 && number1 - 1 !== 0) {
        num1 = number1 - 1;
        num2 = number2;
        wrongC.push(String(num1 * num2));
        num2 = number2 + 1;
        num1 = number1;
        wrongC.push(String(num1 * num2));
      } else {
        num1 = number1 + 1;
        num2 = number2;
        wrongC.push(String(num1 * num2));
        num2 = number2 - 1;
        num1 = number1;
        wrongC.push(String(num1 * num2));
      }
    } else {
      if (Math.floor(Math.random() * 2) + 1 === 1 && number2 - 1 !== 0) {
        num2 = number2 - 1;
        num1 = number1;
        wrongC.push(String(num1 * num2));
        num1 = number1 + 1;
        num2 = number2;
        wrongC.push(String(num1 * num2));
      } else {
        num2 = number2 + 1;
        num1 = number1;
        wrongC.push(String(num1 * num2));
        num1 = number1 - 1;
        num2 = number2;
        wrongC.push(String(num1 * num2));
      }
    }
    return wrongC;
  };

  //Here the new question is setting and sending the necessary data.
  const getQuestion = () => {
    let result1 = "";
    let result2 = "";
    let result3 = "";

    //Here, 2 numbers are chosen randomly for the new question.
    const number1 = Math.floor(Math.random() * 9) + 1;
    const number2 = Math.floor(Math.random() * 9) + 1;
    let nextQuestion = number1 + " x " + number2;
    let result = String(number1 * number2);

    //Here, the correct answer to the question is randomly assigned to a choice.
    switch (Math.floor(Math.random() * 3) + 1) {
      case 1:
        result1 = result;
        let wrongChoices=getWrongChoices(number1,number2);
        result2=wrongChoices[0];
        result3=wrongChoices[1];
        break;
      case 2:
        result2 = result;
        let wrongChoices2=getWrongChoices(number1,number2);
        result1=wrongChoices2[0];
        result3=wrongChoices2[1];
        break;
      case 3:
        result3 = result;
        let wrongChoices3=getWrongChoices(number1,number2);
        result1=wrongChoices3[0];
        result2=wrongChoices3[1];
        break;
      default:
        result1 = result;
        result2 = result - 1;
        result3 = result - 2;
    }

    return {
      nextQuestion,
      result,
      result1,
      result2,
      result3,
    };
  };

  //Here, necessary data is passed to context.
  return (
    <ScoreContext.Provider
      value={{
        totalScores,
        tourScores,
        questions,
        results,
        getTotalScores,
        controlTourScores,
        resetTour,
        getQuestion,
        addQuestion,
        addResult,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

//Here, the necessary data is exported with the useScore method.
function useScore() {
  return useContext(ScoreContext);
}

export { ScoreProvider, ScoreContext, useScore };
