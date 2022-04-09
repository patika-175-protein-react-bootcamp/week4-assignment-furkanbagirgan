import React from "react"

//Here, the little line icon that will be under the title is set.
const SmallTitleLine= props => (
    <svg width={props?.width || "175"} height={props?.height || "7"} viewBox="0 0 175 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill={props?.color || "#FF0000"} d="M175 1.06225C175.334 -0.923686 3.42336 0.352983 1.41851 1.06225C-0.586346 1.77151 -0.355817 3.51656 1.41851 5.60154C3.19283 7.68651 169.429 3.04818 169.429 3.04818C169.429 3.04818 174.665 3.04818 175 1.06225Z"/>
    </svg>
)

export default SmallTitleLine;