import CesiumViewer from './CesiumViewer';
import RightSidebar from './components/RightSidebar';


function App() {
  return (
    <div className="App">
      <div className="map-container">
        <CesiumViewer />
        <div className="main-content">지도 영역</div>
      </div>
      <div className="hover-zone">
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;