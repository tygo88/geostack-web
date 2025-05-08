import { useEffect } from "react";
import * as Cesium from "cesium";

function CesiumViewer() {
  useEffect(() => {
    Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

    const viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          credit: "© Esri"
        }),
        terrainProvider: new Cesium.EllipsoidTerrainProvider(),
        baseLayerPicker: true,
        animation: false,
        timeline: false,
      });


    // 지형 로딩 완료 후후 카메라 이동
    const removeEvent = viewer.scene.globe.tileLoadProgressEvent.addEventListener(function (remaining) {
      if (remaining === 0) {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(126.9780, 37.5665, 3000),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-30),
            roll: 0,
          },
          duration: 2.5 
        });
        
        removeEvent(); // 한 번만 실행되도록 이벤트 제거
      }
    });
   
    viewer.homeButton.container.style.right = "80px";
    viewer.sceneModePicker.container.style.right = "80px";
    viewer.baseLayerPicker.container.style.right = "80px";
    viewer.fullscreenButton.container.style.right = "80px";

  }, []);

  return (
    <div
      id="cesiumContainer"
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}

export default CesiumViewer;
