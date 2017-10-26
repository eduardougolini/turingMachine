var htmlCanvas = document.querySelector('canvas');
var selectedObjects = [];

document.body.addEventListener('click', drawLink);
htmlCanvas.addEventListener('mousemove', identifyPosition);

function drawLink(event) {

    if (event.clientY < 30 || selectedMenu != linkMenu) {
        return;
    }

    for(var i in statesList) {
        if (statesList[i].hover == true) {
            selectedObjects[selectedObjects.length] = statesList[i];
        }
    }

    if (selectedObjects.length == 2) {
        document.body.removeEventListener('click', drawLink);
        drawLineBetweenCircles();
        getTransitionData();
    }
}

function saveTransitionData() {
    var readValue = document.querySelector('.readValue').value;
    var writeValue = document.querySelector('.writeValue').value;
    var select = document.querySelector('.writeOrientation');
    var selectedValue = select.options[select.selectedIndex].value;

    transitionsMap.push({
        'entryState': selectedObjects[0].index,
        'exitState': selectedObjects[1].index,
        'readValue': readValue,
        'writeValue': writeValue,
        'writeOrientation': selectedValue
    })

    selectedObjects = [];

    var promptBox = document.querySelector('.promptBox');
    promptBox.innerHTML = "";
    promptBox.classList.add('hidden');

    document.body.addEventListener('click', drawLink);
}

function getTransitionData() {
    var promptBox = document.querySelector('.promptBox');

    promptBox.classList.remove('hidden');

    var promptBoxStructure = 'Valor de leitura: <input class="readValue" type="text" /><br/>' +
        'Valor de escrita: <input class="writeValue" type="text" /><br/>' +
        'Orientação da escrita: <select class="writeOrientation"><option value="D">D</option><option value="E">E</option><option value="S">S</option></select><br/>' +
        '<a class="saveButton" onclick="saveTransitionData()">Salvar</a>'

    promptBox.insertAdjacentHTML('beforeend', promptBoxStructure);
}

function drawLineBetweenCircles() {
    var canvasContext = htmlCanvas.getContext('2d');

    canvasContext.strokeStyle = '#000';
    canvasContext.lineWidth = 2;

    canvasContext.beginPath();
    canvasContext.moveTo(selectedObjects[0].x, selectedObjects[0].y);

    for (var i = 0; i < 2; i++) {
        canvasContext.lineTo(selectedObjects[i].x, selectedObjects[i].y);
    }
    canvasContext.arc(selectedObjects[1].x, selectedObjects[1].y, 5, 0, Math.PI * 2, true);

    canvasContext.stroke();
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
            cursor = ' crosshair';
            statesList[i].hover = true;
        } else {
            statesList[i].hover = false;
        }
    }

    htmlCanvas.className += cursor;
}