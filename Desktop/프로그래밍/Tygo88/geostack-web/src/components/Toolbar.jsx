import React from "react";
import "./Toolbar.css";

export default function Toolbar({ onStackClick, onReferenceClick }) {
  const icons = [
    { name: "프로젝트 개요", src: "icons/project-info.svg" },
    { name: "기준점", src: "icons/refer-pin.svg", onClick: onReferenceClick },
    { name: "스택", src: "icons/stack.svg", onClick: onStackClick },
    { name: "가시성", src: "icons/eyeoff.svg" },
    { name: "길 찾기", src: "icons/navigation.svg" },
    { name: "공유", src: "icons/share.svg" },
  ];

  return (
    <div className="toolbar">
      {icons.map((icon, index) => (
        <div key={index} className="toolbar-button" onClick={icon.onClick}>
          <img src={icon.src} alt={icon.name} />
          <span className="tooltip">{icon.name}</span>
        </div>
      ))}
    </div>
  );
}
