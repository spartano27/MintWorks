import React from "react";
import "../assets/css/selection.css";

type Props = {
  name?: string;
  color?: string;
};

export default function Selection({ name, color }: Props) {
  return (
    <div 
    style={{position: "absolute",
            pointerEvents: "none",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0}}>
      <div
        
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          bottom: "-5px",
          left: "-5px",
          borderRadius: "11px",
          opacity: 0.2,
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: color
        }}
      />
      <div className="selection_name" style=
      {{  position: "absolute",
          top: "-29px",
          padding: "0 6px",
          borderRadius: "3px",
          fontSize: "12px",
          lineHeight: "20px",
          height: "20px",
          color: "white",
          right: 0,
          background: color }}>
        {name}
      </div>
    </div>
  );
}
