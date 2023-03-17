import './App.scss';
import React, { useState } from "react";
import Owl from './ui_components/Owl.png';
import Shutter from './ui_components/Shutter Button.png';
import ShutterSpeedIcon from './ui_components/Shutter Speed Icon.png';
import Flip from './ui_components/flip orientation-button.png';
import Undo from './ui_components/Undo button.png';
import CurrentSetting from './ui_components/Current Setting.png';
import LastImageMarker from './ui_components/Last Image Marker.png';
import MatrixSquare from './ui_components/Matrix Square.png';


function SidePanel(){
  return (
    <div id='side-panel'></div>
  );
}

function ControlPanel(){
  return (
    <div id='control-panel'>
      <ExposurePanel/>
      <CaptureButton/>
    </div>
  );
}

function CameraViewPort(){
  return (
    <div id="camera-viewport">
    <img
      src = {Owl}
      alt = "Owl_notFound"
    />
    </div>
  );
}

function UI(){
  return (
    <div id="ui">
      <ControlPanel />
      <SidePanel />
    </div>
    );
}

function CaptureButton(){
  return (
    <div id="capture-button">
      <button>
        <img src={Shutter} alt="Capture Button" />
      </button>
    </div>
  )
}

function ExposureSpace(){
  const [markerPosition, setMarkerPosition] = useState({ x: 125, y: 55 });

  const handleMarkerPositionChange = (newPosition) => {
    setMarkerPosition(newPosition);
  };

  return (
    <div id="exposure-space">
      <img src={MatrixSquare} alt="Matrix Square" />
      <ExposureMarker
        position={markerPosition}
        onPositionChange={handleMarkerPositionChange}
      />
    </div>
  )
}

function ExposureLabels(){
  return (
    <div id="exposure-space">
      
    </div>
  )
}

function ExposurePanel(){
  return(
    <div id="exposure-panel">
      <ExposureSpace/>
      <img src={LastImageMarker} alt="Last Image Marker" />
    </div>
  )
}

function ExposureMarker({ position, onPositionChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });

  const handleTouchStart = (event) => {
    setIsDragging(true);
    setDragStartPos({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };

  const handleTouchMove = (event) => {
    if (!isDragging) {
      return;
    }
  
    const marker = document.getElementById("exposure-marker");
    const exposureSpace = document.getElementById("exposure-space");
    const markerRect = marker.getBoundingClientRect();
    const exposureSpaceRect = exposureSpace.getBoundingClientRect();
  
    const newLeft = position.x + event.touches[0].clientX - dragStartPos.x;
    const newTop = position.y + event.touches[0].clientY - dragStartPos.y;
  
    const maxX = exposureSpaceRect.width - markerRect.width;
    const maxY = exposureSpaceRect.height - markerRect.height;
    const limitedLeft = Math.max(0, Math.min(newLeft, maxX));
    const limitedTop = Math.max(0, Math.min(newTop, maxY));
  
    const newPosition = {
      x: limitedLeft,
      y: limitedTop,
    };

    onPositionChange(newPosition);

    setDragStartPos({
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    });
  };

  const handleTouchEnd = (event) => {
    setIsDragging(false);
  };

  return (
    <div
      id="exposure-marker"
      style={{
        left: position.x,
        top: position.y,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img src={CurrentSetting} alt="Exposure Marker" />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CameraViewPort />
      <UI/>
    </div>
  );
}

export default App;