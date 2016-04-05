var packager = require('electron-packager');

var options={
    dir:__dirname+'/src/',
    name:'Electron Video Player',
    all:true,
    version:'0.31.1',
    out:'./build/',
    'app-bundle-id':'it.diginow.electronvideoplayer',
    'app-version':'1.0.0',
    overwrite:true,
    icon:__dirname+'/src/img/logo-256.png',
    'version-string':{
        CompanyName:'digiNow inc.',
        ProductVersion:'1.0.0',
        ProductName:'Electron Video Player'
    }
}

console.log(options);

packager(
    options,
    function done (err, appPath) {
        console.log(err,appPath)
    }
);
