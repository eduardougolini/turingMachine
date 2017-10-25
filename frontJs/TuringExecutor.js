var actualUserInputIndex, success;

function executeTuringMachine(event) {
    var promptBox = document.querySelector('.promptBox');

    promptBox.classList.remove('hidden');

    var promptBoxStructure = 'Entrada: <input class="inputData" type="text" />' +
        '<a class="saveButton" onclick="runTuringMachine()">Rodar</a>'

    promptBox.insertAdjacentHTML('beforeend', promptBoxStructure);
}

function runTuringMachine() {
    var userInput = document.querySelector('.inputData').value

    var promptBox = document.querySelector('.promptBox');
    promptBox.innerHTML = "";
    promptBox.classList.add('hidden');

    actualUserInputIndex = 0;

    success = false;

    for (var i = 0; i < statesList.length; i++) {
        if (statesList[i].initial) {
            validateState(userInput, i);
        }
    }

    if (success) {
        alert('Aceito');
    } else {
        alert('Não aceito');
    }
}

function validateState(userInput, stateIndex) {
    for (var i = 0; i < transitionsMap.length; i++) {
        if (transitionsMap[i].entryState == stateIndex && userInput.indexOf(transitionsMap[i].readValue, actualUserInputIndex) == actualUserInputIndex) {
            actualUserInputIndex = userInput.indexOf(transitionsMap[i].readValue, actualUserInputIndex) + transitionsMap[0].readValue.length;

            stateIndex = transitionsMap[i].exitState

            if (statesList[stateIndex].final) {
                success = true;
                break;
            }

            validateState(userInput, stateIndex);
        }
    }
}