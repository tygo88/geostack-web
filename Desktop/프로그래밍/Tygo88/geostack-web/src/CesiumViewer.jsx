import React, { useEffect, useRef, useState } from "react";
import * as Cesium from "cesium";

function CesiumViewer({ glbUrl, referencePoint, setReferencePoint }) {
  const viewerRef = useRef(null);
  const modelEntityRef = useRef(null);
  const pinEntityRef = useRef(null);

  const [pinScreenPosition, setPinScreenPosition] = useState(null);

  useEffect(() => {
    Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;

    const viewer = new Cesium.Viewer("cesiumContainer", {
      animation: false,
      timeline: false,
      baseLayerPicker: true,
      terrainProvider: new Cesium.EllipsoidTerrainProvider(),
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        credit: "© Esri"
      })
    });

    viewerRef.current = viewer;

    const removeEvent = viewer.scene.globe.tileLoadProgressEvent.addEventListener((remaining) => {
      if (remaining === 0) {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(126.9780, 37.5665, 3000),
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-30),
            roll: 0,
          },
          duration: 2.5,
        });
        removeEvent();
      }
    });

    return () => {
      if (!viewer.isDestroyed()) viewer.destroy();
    };
  }, []);


 // 핀- 모델 흐름 구조

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !glbUrl || !referencePoint) return;

    const { lon, lat, height } = referencePoint;

   
    viewer.entities.removeById("reference-pin");
    viewer.entities.removeById("delete-button");

    // 새 기준점 핀 추가 //
    const pin = viewer.entities.add({
      id: "reference-pin",
      name: "기준점",
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      billboard: {
        image: "/icons/map-pin.svg",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 1.2,
      }
    });

    viewer.entities.add({
      id: "delete-button",
      name: "삭제",
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      billboard: {
        image: "/icons/delete.svg",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 1.0,
        pixelOffset: new Cesium.Cartesian2(25, -40),
      }
    });

    pinEntityRef.current = pin;

    // 기존 모델 제거 X //
    const entity = viewer.entities.add({
      name: "GLB 모델",
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      model: {
        uri: glbUrl,
        scale: 1.0,
        minimumPixelSize: 128,
        maximumScale: 20000,
      }
    });

    viewer.flyTo(entity);
  }, [referencePoint, glbUrl]);



  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !referencePoint) return;

    const { lon, lat, height } = referencePoint;

    if (pinEntityRef.current) {
      viewer.entities.remove(pinEntityRef.current);
    }

    const pin = viewer.entities.add({
      id: "reference-pin",
      name: "기준점",
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      billboard: {
        image: "/icons/map-pin.svg",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 1.2,
      }
    });

    const entities = viewer.entities.add({
      id: "delete-button",
      name: "삭제",
      position: Cesium.Cartesian3.fromDegrees(lon, lat, height),
      billboard: {
        image: "/icons/delete.svg",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 1.0,
        pixelOffset: new Cesium.Cartesian2(25, -40) // ← 이게 위치 조정
      }
    });

    pinEntityRef.current = pin;
    viewer.flyTo(pin);

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click) => {
      const picked = viewer.scene.pick(click.position);
      if (!Cesium.defined(picked)) return;

      const idName = picked.id?.name;

      if (idName === "기준점") {
        const time = Cesium.JulianDate.now();
        const cartesian = picked.id.position?.getValue(time);
        if (!cartesian) return;

        const screenPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
          viewer.scene,
          cartesian
        );

        if (screenPos) {
          setPinScreenPosition({
            x: screenPos.x,
            y: screenPos.y - 40,
          });
        }
      } else if (idName === "삭제") {
        viewer.entities.removeById("reference-pin");
        viewer.entities.removeById("delete-button");
        setReferencePoint(null);
        setPinScreenPosition(null);
      } else {
        setPinScreenPosition(null);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    return () => handler.destroy();
  }, [referencePoint]);

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
