import $ from 'jquery'

export function initCanvas(id, size=8, color="#000000"){
    var context = document.getElementById(id).getContext("2d");
    var canvas = document.getElementById(id);
    context.strokeStyle =color;
    context.lineJoin = "round";
    context.lineWidth = size;

    var clickX = [];
    var clickY = [];
    var clickDrag =  [];
    var paint;

    function addClick(x, y, dragging) {
        clickX.push(x - $(canvas).parent().offset().left);
        clickY.push(y - $(canvas).parent().offset().top);
        clickDrag.push(dragging);
    }

    function drawNew(context) {
        var i = clickX.length - 1;
        if (!clickDrag[i]) {
            if (clickX.length == 0) {
                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else {
                context.closePath();

                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            }
        } else {
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.stroke();
    }

    function mouseDownEventHandler(e) {
        paint = true;
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, false);
            drawNew(context);
        }
    }
    
    function mouseUpEventHandler(e) {
        context.closePath();
        paint = false;
    }

    function mouseMoveEventHandler(e) {
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, true);
            drawNew(context);
        }
    }

    function setUpHandler(detectEvent) {
            canvas.addEventListener('mouseup', mouseUpEventHandler);
            canvas.addEventListener('mousemove', mouseMoveEventHandler);
            canvas.addEventListener('mousedown', mouseDownEventHandler);
            mouseDownEventHandler(detectEvent);
    }

    canvas.addEventListener('mousedown', setUpHandler );
}
