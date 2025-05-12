import React, { useState } from 'react';
import CesiumViewer from './CesiumViewer';
import RightSidebar from './components/RightSidebar';
import LoginForm from './components/LoginForm';
import Toolbar from './components/Toolbar';
import Upload from './components/Upload';
import ReferencePointModal from './components/referencepoint';

import app from './firebase-config';

function App() {
  const [showUpload, setShowUpload] = useState(false);
  const [glbUrl, setGlbUrl] = useState(null);
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [referencePoint, setReferencePoint] = useState(null); // 기준점 상태

  return (
    <div className="App">
      <LoginForm />

      <div className="map-container">
        <CesiumViewer
          glbUrl={glbUrl}
          referencePoint={referencePoint}
          setReferencePoint={setReferencePoint} // 핀 삭제 위해 전달
        />

        <Toolbar
          onStackClick={() => setShowUpload(!showUpload)}
          onReferenceClick={() => setShowReferenceModal(true)}
        />

        <div className="hover-zone">
          <RightSidebar />
        </div>
      </div>

      {showUpload && (
        <Upload
          onUpload={setGlbUrl}
          onClose={() => setShowUpload(false)}
        />
      )}

      {showReferenceModal && (
        <ReferencePointModal
          onConfirm={(coords) => setReferencePoint(coords)}
          onClose={() => setShowReferenceModal(false)}
        />
      )}
    </div>
  );
}

export default App;
