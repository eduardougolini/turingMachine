const {ipcRenderer} = require('electron');

var menuItems = document.querySelectorAll('#Toolbar .menu');
var selectedMenu = selectorMenu;

for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function(){
        selectedMenu = this.getAttribute('name');
    });
}