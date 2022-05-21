import React from "react";
import "../assets/css/selection.css";

type Props = {
  name?: string;
  color?: string;
};

export default function Selection({ name, color }: Props) {
  return (
    <div className="selection">
      <div
        className="selection_border"
        style={{
          borderColor: color,
        }}
      />
      <div className="selection_name" style={{ background: color }}>
        {name}
      </div>
    </div>
  );
}
