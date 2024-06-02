// import $ from 'jquery'

// export function initCanvas(id, size = 8, color = "#000000") {
//   console.log('Initializing canvas');
//   var canvas = document.getElementById(id);
//   var context = canvas.getContext("2d");
//   context.strokeStyle = color;
//   context.lineJoin = "round";
//   context.lineCap = "round";
//   context.lineWidth = size;

//   var drawing = false;
//   var lastX = 0;
//   var lastY = 0;

//   function startPosition(e) {
//     drawing = true;
//     [lastX, lastY] = [e.offsetX, e.offsetY];
//   }

//   function endPosition() {
//     drawing = false;
//   }

//   function draw(e) {
//     if (!drawing) return;
//     context.beginPath();
//     context.moveTo(lastX, lastY);
//     context.lineTo(e.offsetX, e.offsetY);
//     context.stroke();
//     [lastX, lastY] = [e.offsetX, e.offsetY];
//   }

//   canvas.addEventListener('mousedown', startPosition);
//   canvas.addEventListener('mouseup', endPosition);
//   canvas.addEventListener('mousemove', draw);
//   canvas.addEventListener('mouseout', endPosition);
// }
import * as d3 from 'd3';

export function initCanvas(id, size = 8, color = "#000000") {
  console.log('Initializing canvas with D3');
  var canvas = document.getElementById(id);
  var context = canvas.getContext("2d");
  context.strokeStyle = color;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.lineWidth = size;

  var drawing = false;
  var lastX = 0;
  var lastY = 0;

  function startPosition(event) {
    drawing = true;
    const [x, y] = d3.pointer(event);
    [lastX, lastY] = [x, y];
  }

  function endPosition() {
    drawing = false;
  }

  function draw(event) {
    if (!drawing) return;
    const [x, y] = d3.pointer(event);
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.stroke();
    [lastX, lastY] = [x, y];
  }

  d3.select(canvas)
    .on('mousedown', startPosition)
    .on('mouseup', endPosition)
    .on('mousemove', draw)
    .on('mouseout', endPosition);
}
