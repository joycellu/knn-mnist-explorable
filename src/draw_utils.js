import $ from 'jquery'

// export function initCanvas(id, size=8, color="#000000"){
//     console.log('0');
//     var context = document.getElementById(id).getContext("2d");
//     var canvas = document.getElementById(id);
//     context.strokeStyle =color;
//     context.lineJoin = "round";
//     context.lineWidth = size;

//     var clickX = [];
//     var clickY = [];
//     var clickDrag =  [];
//     var paint;

//     function addClick(x, y, dragging) {
//         console.log('1');
//         clickX.push(x - $(canvas).parent().offset().left);
//         clickY.push(y - $(canvas).parent().offset().top);
//         clickDrag.push(dragging);
//     }

//     function drawNew(context) {
//         console.log('2');
//         var i = clickX.length - 1;
//         if (!clickDrag[i]) {
//             if (clickX.length == 0) {
//                 context.beginPath();
//                 context.moveTo(clickX[i], clickY[i]);
//                 context.stroke();
//             } else {
//                 context.closePath();

//                 context.beginPath();
//                 context.moveTo(clickX[i], clickY[i]);
//                 context.stroke();
//             }
//         } else {
//             context.lineTo(clickX[i], clickY[i]);
//             context.stroke();
//         }
//         context.stroke();
//     }

//     function mouseDownEventHandler(e) {
//         console.log('3');
//         paint = true;
//         var x = e.pageX - canvas.offsetLeft;
//         var y = e.pageY - canvas.offsetTop;
//         if (paint) {
//             addClick(x, y, false);
//             drawNew(context);
//         }
//     }
    
//     function mouseUpEventHandler(e) {
//         console.log('4');
//         context.closePath();
//         paint = false;
//     }

//     function mouseMoveEventHandler(e) {
//         console.log('5');
//         var x = e.pageX - canvas.offsetLeft;
//         var y = e.pageY - canvas.offsetTop;
//         if (paint) {
//             console.log('nani');
//             addClick(x, y, true);
//             drawNew(context);
//         }
//     }

//     function setUpHandler(detectEvent) {
//         console.log('listening');
//             canvas.addEventListener('mouseup', mouseUpEventHandler);
//             canvas.addEventListener('mousemove', mouseMoveEventHandler);
//             canvas.addEventListener('mousedown', mouseDownEventHandler);
//             mouseDownEventHandler(detectEvent);
//     }

//     canvas.addEventListener('mousedown', setUpHandler );
// }

export function initCanvas(id, size = 8, color = "#000000") {
  console.log('Initializing canvas');
  var canvas = document.getElementById(id);
  var context = canvas.getContext("2d");
  context.strokeStyle = color;
  context.lineJoin = "round";
  context.lineWidth = size;

  var drawing = false;
  var lastX = 0;
  var lastY = 0;

  function startPosition(e) {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  function endPosition() {
    drawing = false;
  }

  function draw(e) {
    if (!drawing) return;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }

  canvas.addEventListener('mousedown', startPosition);
  canvas.addEventListener('mouseup', endPosition);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseout', endPosition);
}
