import React, { useState } from "react";
import "./referencepoint.css";

export default function ReferencePointModal({ onConfirm, onClose }) {
  const [x, setX] = useState("126.9780");
  const [y, setY] = useState("37.5665");
  const [z, setZ] = useState("50");

  const handleSubmit = () => {
    const lon = parseFloat(x);
    const lat = parseFloat(y);
    const height = parseFloat(z);
    if (!isNaN(lon) && !isNaN(lat) && !isNaN(height)) {
      onConfirm({ lon, lat, height });
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>기준점 좌표 입력</h3>

        <div className="input-group">
          <label>X 좌표</label>
          <input
            type="text"
            placeholder="예: 126.9780"
            value={x}
            onChange={e => setX(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Y 좌표</label>
          <input
            type="text"
            placeholder="예: 37.5665"
            value={y}
            onChange={e => setY(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Z (m)</label>
          <input
            type="text"
            placeholder="예: 50"
            value={z}
            onChange={e => setZ(e.target.value)}
          />
        </div>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>확인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}
