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
    var firstTapeReadValue = document.querySelector('.readValue.first').value;
    var firstTapeWriteValue = document.querySelector('.writeValue.first').value;
    var firstTapeSelect = document.querySelector('.writeOrientation.first');
    var firstTapeSelectedValue = firstTapeSelect.options[firstTapeSelect.selectedIndex].value;
    var secondTapeReadValue = document.querySelector('.readValue.second').value;
    var secondTapeWriteValue = document.querySelector('.writeValue.second').value;
    var secondTapeSelect = document.querySelector('.writeOrientation.second');
    var secondTapeSelectedValue = secondTapeSelect.options[secondTapeSelect.selectedIndex].value;

    transitionsMap.push({
        'entryState': selectedObjects[0].index,
        'exitState': selectedObjects[1].index,
        'firstTapeReadValue': firstTapeReadValue,
        'firstTapeWriteValue': firstTapeWriteValue,
        'firstTapeWriteOrientation': firstTapeSelectedValue,
        'secondTapeReadValue': secondTapeReadValue,
        'secondTapeWriteValue': secondTapeWriteValue,
        'secondTapeWriteOrientation': secondTapeSelectedValue
    });

    selectedObjects = [];

    var promptBox = document.querySelector('.promptBox');
    promptBox.innerHTML = "";
    promptBox.classList.add('hidden');

    document.body.addEventListener('click', drawLink);
}

function getTransitionData() {
    var promptBox = document.querySelector('.promptBox');

    promptBox.classList.remove('hidden');

    var promptBoxStructure = 'Valor de leitura da primeira fita: <input class="readValue first" type="text" /><br/>' +
        'Valor de escrita da primeira fita: <input class="writeValue first" type="text" /><br/>' +
        'Orientação da escrita da primeira fita: <select class="writeOrientation first"><option value="D">D</option><option value="E">E</option><option value="S">S</option></select><br/><br/>' +
        'Valor de leitura da segunda fita: <input class="readValue second" type="text" /><br/>' +
        'Valor de escrita da segunda fita: <input class="writeValue second" type="text" /><br/>' +
        'Orientação da escrita da segunda fita: <select class="writeOrientation second"><option value="D">D</option><option value="E">E</option><option value="S">S</option></select><br/>' +
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