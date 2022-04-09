import React from "react";
import { Link } from "react-router-dom";
import {ButtonLine} from '../constants/icons/index';

//Here, a component is created that combines the button icon and its text.
const Button = ({title,final}) => (
  <div className={final? "dp-flex-center finalButton " : "dp-flex-center button"}>
    <ButtonLine width="347" height="108" color="white"/>
    <Link to='/tour'>{title}</Link>
  </div>
)
export default Button;