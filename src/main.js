var app = require('app');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

require('electron-debug')({
    showDevTools: false
});

var player = null;

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});
app.on(
    'ready',
    function() {
        player = new BrowserWindow(
            {
                title:'Electron Video Player',
                'accept-first-mouse':true,
                width: 640,
                height: 480,
                'min-width': 640,
                'min-height': 480,
                frame:false,
                icon:__dirname+'/img/logo-256.png',
                'text-areas-are-resizable':false
            }
        );

        player.loadUrl('file://' + __dirname + '/player.html');

        //player.openDevTools();

        player.on(
            'closed',
            function() {
                player = null;
            }
        );
    }
);



