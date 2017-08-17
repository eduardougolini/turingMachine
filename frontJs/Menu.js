const {ipcRenderer} = require('electron');

var menuItems = document.querySelectorAll('#Toolbar .menu');
var selectedMenu = selectorMenu;

for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function(){
        for (var j = 0; j < menuItems.length; j++) {
            menuItems[j].classList.remove('selected');
        }

        selectedMenu = this.getAttribute('name');
        this.classList.add('selected');
    });
}