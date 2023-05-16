import "../style.less";
import React from "react";
import { FlatIconProps } from "../types";

export const SVGTcEducation: React.FC<FlatIconProps> = ({
    active,
    className = "",
    ...restProps
}) => {
    return (
        <svg
            className={`${className} flat-icon ${active ? "is-active" : ""}`}
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}
        >
            <g>
                <path
                    d="M 19.5,5.5 C 18.5139,9.97005 18.1805,14.6367 18.5,19.5C 15.4081,22.3549 11.7414,23.1882 7.5,22C 6.61947,21.2917 5.9528,20.4584 5.5,19.5C 4.55896,14.9296 4.22562,10.263 4.5,5.5C 4.5,4.16667 4.5,2.83333 4.5,1.5C 7.6136,2.09132 10.1136,3.75799 12,6.5C 13.2832,2.81456 15.6166,1.48123 19,2.5C 19.4828,3.44802 19.6495,4.44802 19.5,5.5 Z"
                    fill="#3274fb"
                    // style="{opacity = 0.96}"
                />
            </g>
            <g>
                <path
                    d="M 19.5,5.5 C 20.4959,5.41423 21.3292,5.74756 22,6.5C 22.6667,10.5 22.6667,14.5 22,18.5C 20.9887,19.3366 19.8221,19.67 18.5,19.5C 18.1805,14.6367 18.5139,9.97005 19.5,5.5 Z"
                    fill="#60c76f"
                    // style="opacity:0.999"
                />
            </g>
            <g>
                <path
                    d="M 4.5,5.5 C 4.22562,10.263 4.55896,14.9296 5.5,19.5C 4.16667,19.5 2.83333,19.5 1.5,19.5C 1.5,14.8333 1.5,10.1667 1.5,5.5C 2.5,5.5 3.5,5.5 4.5,5.5 Z"
                    fill="#5cc66b"
                    // style="opacity:0.745"
                />
            </g>
        </svg>
    );
};

export default SVGTcEducation;
