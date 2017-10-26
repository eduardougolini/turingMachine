var actualUserInputIndex, success, firstUserInput, secondUserInput, stateIndex;

function executeTuringMachine(event) {
    var promptBox = document.querySelector('.promptBox');

    promptBox.classList.remove('hidden');

    var promptBoxStructure = 'Entrada da primeira fita: <input class="inputData first" type="text" /><br/>' +
        'Entrada da segunda fita: <input class="inputData second" type="text" /><br/>' +
        '<a class="saveButton" onclick="runTuringMachine()">Rodar</a>'

    promptBox.insertAdjacentHTML('beforeend', promptBoxStructure);
}

function runTuringMachine() {
    firstUserInput = document.querySelector('.inputData.first').value
    secondUserInput = document.querySelector('.inputData.second').value

    var promptBox = document.querySelector('.promptBox');
    promptBox.innerHTML = "";
    promptBox.classList.add('hidden');

    actualUserInputIndex = 0;

    success = false;

    for (var i = 0; i < statesList.length; i++) {
        if (statesList[i].initial) {
            stateIndex = i;
            validateState();
        }
    }

    if (success) {
        alert('Aceito - ' + firstUserInput + ' - ' + secondUserInput);
    } else {
        alert('Não aceito - ' + firstUserInput + ' - ' + secondUserInput);
    }
}

function validateState() {
    for (var i = 0; i < transitionsMap.length; i++) {

        if (transitionsMap[i].entryState == stateIndex && transitionsMap[i].firstTapeWriteOrientation == 'D') {
            validateStateInRightOrientation(i);
        } else if (transitionsMap[i].entryState == stateIndex && transitionsMap[i].firstTapeWriteOrientation == 'E') {
            validateStateInLeftOrientation(i);
        }

    }
}

function validateStateInLeftOrientation(i) {
    if (firstUserInput.indexOf(transitionsMap[i].firstTapeReadValue, actualUserInputIndex) == actualUserInputIndex && secondUserInput.indexOf(transitionsMap[i].secondTapeReadValue, actualUserInputIndex) == actualUserInputIndex) {
        firstUserInput = firstUserInput.replaceAt(actualUserInputIndex, transitionsMap[i].firstTapeWriteValue);
        secondUserInput = secondUserInput.replaceAt(actualUserInputIndex, transitionsMap[i].secondTapeWriteValue);
        actualUserInputIndex--;

        stateIndex = transitionsMap[i].exitState

        if (statesList[stateIndex].final) {
            success = true;
        }

        validateState();
    }
}

function validateStateInRightOrientation(i) {
    if (firstUserInput.indexOf(transitionsMap[i].firstTapeReadValue, actualUserInputIndex) == actualUserInputIndex && secondUserInput.indexOf(transitionsMap[i].secondTapeReadValue, actualUserInputIndex) == actualUserInputIndex) {
        firstUserInput = firstUserInput.replaceAt(actualUserInputIndex, transitionsMap[i].firstTapeWriteValue);
        secondUserInput = secondUserInput.replaceAt(actualUserInputIndex, transitionsMap[i].secondTapeWriteValue);
        actualUserInputIndex++;

        stateIndex = transitionsMap[i].exitState

        if (statesList[stateIndex].final) {
            success = true;
        }

        validateState();
    }
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}