import "../style.less";
import React from "react";
import { FlatIconProps } from "../types";
import SVGDelete from "./SVGDelete";

export const SVGKickUser: React.FC<FlatIconProps> = ({ active, className = "", ...restProps }) => {
    return (
        <svg
            className={`${className} flat-icon ${active ? "is-active" : ""}`}
            fill="none"
            height="0.266667in"
            viewBox="0 0 24 24"
            width="0.266667in"
            xmlns="http://www.w3.org/2000/svg"
            {...restProps}
        >
            <path
                className="flat-icon-fill-color"
                clipRule="evenodd"
                d="M 5.74,12.67
           C 5.74,12.67 18.12,12.67 18.12,12.67
             18.46,12.67 18.72,12.41 18.72,12.07
             18.72,11.74 18.46,11.47 18.12,11.47
             18.12,11.47 5.74,11.47 5.74,11.47
             5.40,11.47 5.14,11.74 5.14,12.07
             5.14,12.41 5.41,12.67 5.74,12.67 Z
           M 12.00,1.20
           C 17.95,1.20 22.80,6.05 22.80,12.00
             22.80,17.95 17.95,22.80 12.00,22.80
             6.05,22.80 1.20,17.95 1.20,12.00
             1.20,6.05 6.05,1.20 12.00,1.20M 12.00,-0.00
           C 5.38,0.00 0.00,5.38 0.00,12.00
             0.00,18.62 5.38,24.00 12.00,24.00
             18.62,24.00 24.00,18.62 24.00,12.00
             24.00,5.38 18.62,0.00 12.00,0.00
             12.00,0.00 12.00,-0.00 12.00,-0.00 Z"
                fill="#5D6066"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default SVGDelete;
