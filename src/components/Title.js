import React from "react";
import {TitleLine,SmallTitleLine} from '../constants/icons/index';

//Here, a component is created that combines the title icon and its text.
const Title = ({title,width,height,isSmall}) => (
  <div className="dp-flex-center title">
    <span>{title}</span>
    {isSmall ? <SmallTitleLine width={width} height={height} color="#FF0000"/> :<TitleLine width={width} height={height} color="#FF0000"/>}
  </div>
)
export default Title;