import React, { useState, useEffect } from "react";

export const Wheel = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  onRotate,
  onRotateFinish,
  primaryColor,
  strokeColor,
  contrastColor,
  buttonText,
  isOnlyOnce = true,
  size = 290,
  upDuration = 1000,
  downDuration = 100,
  fontFamily = 'proxima-nova',
  width = 100,
  height = 100,
}) => {

  let currentSegment = '';
  let isStarted = false;
  const [isFinished, setFinished] = useState(false);
  let timerHandle = 0;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext = null;
  let maxSpeed = Math.PI / segments.length;
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = 300;
  const centerY = 300;

  const segmentRadian = (2 * Math.PI) / segments.length;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas = document.getElementById('canvas');
    if (navigator.appVersion.indexOf('MSIE') !== -1) {
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.setAttribute('id', 'canvas');
      document.getElementById('wheel').appendChild(canvas);
    }
    canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext('2d');
  };

  const spin = () => {
    isStarted = true;
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      timerHandle = setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {

  };

  const wheelDraw = () => {
    clear();
    drawWheel();
  };

  const draw = () => {
    clear();
    drawWheel();
  };

  const drawSegment = (key, lastAngle, angle) => {
    const ctx = canvasContext;
    const value = segments[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColors[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor || 'white';
    ctx.font = 'bold 1em ' + fontFamily;
    ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const _drawSegment = (title, color, startAngle, endAngle) => {
    const ctx = canvasContext;

    // Save initial state
    ctx.save();

    // Draw segment's area
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, startAngle, endAngle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Add segment text
    ctx.fillStyle = 'black';
    ctx.rotate((startAngle + endAngle) / 2);
    ctx.fillText(title, centerX, centerY);

    // restore state 
    ctx.restore();
  }

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor || 'black';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '1em ' + fontFamily;
    for (let i = 0; i < segments.length; i++) {
      // const angle = PI2 * ((i + 1) / segments.length) + angleCurrent;
      // drawSegment(i, lastAngle, angle);
      // lastAngle = angle;
      const startAngle = i * segmentRadian;
      const endAngle = startAngle + segmentRadian;
      _drawSegment(segments[i], segColors[i], startAngle, endAngle);
    }

    // Draw a center circle
    // ctx.restore();
    // ctx.beginPath();
    // ctx.arc(centerX, centerY, 40, 0, PI2, false);
    // ctx.closePath();
    // ctx.fillStyle = 'white';
    // ctx.fill();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();
    ctx.strokeStyle = strokeColor || 'white';
    ctx.stroke();
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };

  return (
    <div id="wheel">
      <canvas
        id="canvas"
        width="600"
        height="600"
        style={{
          pointerEvents: isFinished && isOnlyOnce ? 'none' : 'auto',
        }}
      />
    </div>
  );
};
