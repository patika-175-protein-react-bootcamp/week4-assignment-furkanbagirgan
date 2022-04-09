import React from "react";
import {ChoiceLine} from '../constants/icons/index';

//Here, a component is created that combines the choice icon and its text.
function Choice({choice,order,control,color}){
  return(
    <div className={"dp-flex-center choice choice"+order}>
      <ChoiceLine width="145" height="127" color={color}/>
      <span onClick={control}>{choice}</span>
    </div>
  )
}

export default Choice;