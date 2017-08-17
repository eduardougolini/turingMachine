const {ipcRenderer} = require('electron');

var menuItems = document.querySelectorAll('#Toolbar .menu');

for(var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('click', function(){
        ipcRenderer.send('menuItemClick', this.getAttribute('name'));
    });
}