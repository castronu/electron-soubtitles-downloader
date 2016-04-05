var packager = require('electron-packager');

var options={
    dir:__dirname+'/src/',
    name:'Electron Soubtitler Downloader',
    all:true,
    platform:'darwin',
    arch:'x64',
    version:'0.37.4',
    out:'./build/',
    'app-bundle-id':'com.castronu.electron-soubtitles-downloader',
    'app-version':'1.0.0',
    overwrite:true,
    icon:__dirname+'/src/img/logo-256.png',
    'version-string':{
        CompanyName:'castronu',
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
