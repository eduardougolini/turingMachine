var htmlCanvas = document.querySelector('canvas');

document.body.addEventListener('click', drawLink);
htmlCanvas.addEventListener('mousemove', identifyPosition);

function drawLink(event) {

    if (event.clientY < 30 || selectedMenu != linkMenu) {
        return;
    }

    for(var i in statesList) {
        if (statesList[i].hover == true) {
            console.log('clicou dentro');
        }
    }
}

function identifyPosition(event) {
    if (event.clientY < 30 || selectedMenu != linkMenu) {
        return;
    }

    var x = event.clientX , y = event.clientY;

    htmlCanvas.classList.remove("default");
    htmlCanvas.classList.remove("crosshair");

    var cursor = ' default';

    for(var i in statesList) {
        if(Math.pow(statesList[i].x - x, 2)+Math.pow(statesList[i].y - y, 2) < Math.pow(50, 2)) {
            cursor = ' crosshair'
            statesList[i].hover = true;
        } else {
            statesList[i].hover = false;
        }
    }

    htmlCanvas.className += cursor;
}