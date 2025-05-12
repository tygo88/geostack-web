// Upload.jsx
import React, { useRef, useState } from 'react';
import './Upload.css';

const Upload = ({ onUpload, onClose }) => {
  const fileInputRef = useRef();
  const [modelList, setModelList] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.glb')) {
      const url = URL.createObjectURL(file);
      const newModel = {
        name: file.name,
        url,
      };
      setModelList((prev) => [...prev, newModel]);
      onUpload(url);
    } else {
      alert('glb 파일만 업로드 가능합니다.');
    }
  };

  const handleDelete = (name) => {
    setModelList((prev) => prev.filter((model) => model.name !== name));
  };

  return (
    <div className="upload-container">
      <button className="upload-close-button" onClick={onClose}>✖</button>
      <h3>📦 GLB 모델 업로드</h3>

      <button className="upload-button" onClick={() => fileInputRef.current.click()}>
        + 모델 추가하기
      </button>
      <input
        type="file"
        accept=".glb"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <ul className="model-list">
        {modelList.map((model) => (
          <li key={model.name} className="model-list-item">
            <span>{model.name}</span>
            <button className="delete-button" onClick={() => handleDelete(model.name)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Upload;
