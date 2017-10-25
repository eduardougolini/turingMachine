var actualUserInputIndex, success, userInput;

function executeTuringMachine(event) {
    var promptBox = document.querySelector('.promptBox');

    promptBox.classList.remove('hidden');

    var promptBoxStructure = 'Entrada: <input class="inputData" type="text" />' +
        '<a class="saveButton" onclick="runTuringMachine()">Rodar</a>'

    promptBox.insertAdjacentHTML('beforeend', promptBoxStructure);
}

function runTuringMachine() {
    userInput = document.querySelector('.inputData').value

    var promptBox = document.querySelector('.promptBox');
    promptBox.innerHTML = "";
    promptBox.classList.add('hidden');

    actualUserInputIndex = 0;

    success = false;

    for (var i = 0; i < statesList.length; i++) {
        if (statesList[i].initial) {
            validateState(i);
        }
    }

    if (success) {
        alert('Aceito - ' + userInput);
    } else {
        alert('Não aceito - ' + userInput);
    }
}

function validateState(stateIndex) {
    for (var i = 0; i < transitionsMap.length; i++) {
        if (transitionsMap[i].entryState == stateIndex && userInput.indexOf(transitionsMap[i].readValue, actualUserInputIndex) == actualUserInputIndex) {
            userInput = userInput.replaceAt(actualUserInputIndex, transitionsMap[i].writeValue);
            actualUserInputIndex++;

            stateIndex = transitionsMap[i].exitState

            if (statesList[stateIndex].final) {
                success = true;
                break;
            }

            validateState(userInput, stateIndex);
        }
    }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}