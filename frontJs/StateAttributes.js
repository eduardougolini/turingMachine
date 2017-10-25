var selectedStateIndex;

document.body.addEventListener('click', defineStateTypeDialog);

function defineStateTypeDialog(event) {
    var x = event.clientX;
    var y = event.clientY;

    if (y < 30 || selectedMenu != selectorMenu) {
        return;
    }

    for(var i in statesList) {
        if(Math.pow(statesList[i].x - x, 2)+Math.pow(statesList[i].y - y, 2) < Math.pow(50, 2)) {
            selectedStateIndex = i;
            var attributesSelector = document.querySelector('.attributesSelector');

            attributesSelector.style.marginLeft = x + 'px';
            attributesSelector.style.marginTop = y + 'px';
            attributesSelector.classList.remove('hidden');
        }
    }
}

function setStateType(type) {
    switch (type) {
        case 'initial':
            statesList[selectedStateIndex].initial = true;
            break;
        case 'final':
            statesList[selectedStateIndex].final = true;
            break;
    }

    document.querySelector('.attributesSelector').classList.add('hidden');
}