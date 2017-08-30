var htmlCanvas = document.querySelector('canvas');
var stateIndex = 0;

htmlCanvas.width = window.innerWidth;
htmlCanvas.height = window.innerHeight;

document.body.addEventListener('click', drawState);

function drawState(event) {

    if (event.clientY < 30 || selectedMenu != stateMenu) {
        return;
    }

    var canvasContext = htmlCanvas.getContext('2d');

    canvasContext.beginPath();
    canvasContext.arc(event.clientX, event.clientY - 30, 50, 0, Math.PI * 2, true);
    canvasContext.fillStyle = 'yellow';
    canvasContext.font = '26px serif';
    canvasContext.fill();
    canvasContext.fillStyle = 'black';
    canvasContext.fillText('q' + stateIndex, event.clientX - 13, event.clientY - 26);
    canvasContext.stroke();

    stateIndex++;

    statesList.push({
       x: event.clientX,
       y: event.clientY
    });
}