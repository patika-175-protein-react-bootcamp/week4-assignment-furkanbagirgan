import React from "react"

//Here, the correct icon is set.
const Correct = props => (
    <svg width={props?.size || "31"} height={props?.size || "31"} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path stroke={props?.color || "white"} d="M2 18.5819C5.35296 21.3546 8.61406 24.1982 11.347 27.6144C12.5477 29.1152 12.052 29.6937 13.2344 26.8504C17.0954 17.5655 20.3179 8.28124 28.6929 2" strokeWidth="3" strokeLinecap="round"/>
    </svg>
)

export default Correct;