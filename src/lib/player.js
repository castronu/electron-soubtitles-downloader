window.addEventListener(
    'DOMContentLoaded',
    init
);

function init(){
    document.querySelector('#prog').value = 0;
    document.querySelector('#volRange').value=document.querySelector('#videoContainer').volume;
    bindEvents();




}

function bindEvents(){
    var video = document.querySelector('#videoContainer');
    var progBar = document.querySelector('#prog');
    var dropArea = document.querySelector('#dropArea');

    video.addEventListener(
        'timeupdate',
        showProgress
    );

    video.addEventListener(
        'play',
        playing
    );

    video.addEventListener(
        'ended',
        ended
    );

    video.addEventListener(
        'pause',
        paused
    );

    video.addEventListener(
        'error',
        function(e){
            videoError('Video Error');
        }
    );

    video.addEventListener(
        'stalled',
        function(e){
            videoError('Video Stalled');
        }
    );

    dropArea.addEventListener(
        'dragleave',
        makeUnDroppable
    );

    dropArea.addEventListener(
        'dragenter',
        makeDroppable
    );

    dropArea.addEventListener(
        'dragover',
        makeDroppable
    );

    dropArea.addEventListener(
        'drop',
        loadSoubtitles
    );

    document.querySelector('#chooseVideo').addEventListener(
        'change',
        loadVideo
    );

    document.querySelector('#volRange').addEventListener(
        'change',
        adjustVolume
    );

   /* document.querySelector('#enterLink').addEventListener(
        'change',
        loadVideo
    );*/

    window.addEventListener(
        'keyup',
        function(e){
            switch(e.keyCode){
                case 13 : //enter
                case 32 : //space
                    togglePlay();
                    break;
            }
        }
    );
}


function getTime(ms){

    var date = new Date(ms);
    var time = [];

    time.push(date.getUTCHours());
    time.push(date.getUTCMinutes());
    time.push(date.getUTCSeconds());

    return time.join(':');
}

function adjustVolume(e){
    var video = document.querySelector('#videoContainer');
    video.volume=e.target.value;
}

function showProgress(){
    var video = document.querySelector('#videoContainer');
    var progBar = document.querySelector('#prog');
    var count = document.querySelector('#count');
    progBar.value=(video.currentTime/video.duration);
    count.innerHTML = getTime(video.currentTime*1000) +
        '/'+
    getTime(video.duration*1000);
}

function togglePlay(){
    document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
}

function toggleScreen(){
    document.querySelector('.fullscreen:not(.hide),.smallscreen:not(.hide)').click();
}

function playing(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#play').classList.add('hide');
    document.querySelector('#pause').classList.remove('hide');
    player.classList.remove('paused');

    hideFileArea();
}

function fullscreened(e){
    var player = document.querySelector('#playerContainer');
    player.classList.add('fullscreened');
    player.webkitRequestFullscreen();

}


function smallscreened(e){
    var player = document.querySelector('#playerContainer');
    player.classList.remove('fullscreened');
    document.webkitExitFullscreen();
}


function hideFileArea(){
    var dropArea=document.querySelector('#dropArea');
    dropArea.classList.add('hidden');

    setTimeout(
        function(){
            var dropArea=document.querySelector('#dropArea');
            dropArea.classList.add('hide');
        },
        500
    );
}

function showFileArea(){
    var dropArea=document.querySelector('#dropArea');
    dropArea.classList.remove('hide');

    setTimeout(
        function(){
            var dropArea=document.querySelector('#dropArea');
            dropArea.classList.remove('hidden');
        },
        10
    );
}

function paused(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#pause').classList.add('hide');
    document.querySelector('#play').classList.remove('hide');
    player.classList.add('paused');

    showFileArea();
}

function ended(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#play').classList.remove('hide');
    document.querySelector('#pause').classList.add('hide');
    player.classList.add('paused');

    showFileArea();
}

function makeDroppable(e) {
    e.preventDefault();
    e.target.classList.add('droppableArea');
};

function makeUnDroppable(e) {
    e.preventDefault();
    e.target.classList.remove('droppableArea');
};

function loadSoubtitles(e) {
    e.preventDefault();

    var fs = require('fs');

    var soubtitleDownloader = new SoubtitleDownloader();



    var files = [];
    if(e.dataTransfer){
        files=e.dataTransfer.files;
    }


    var file = e.dataTransfer.files[0];
    if (fs.lstatSync(file.path).isDirectory()) {
        soubtitleDownloader.checkDirectoryAndDownloadFiles(file.path);
        return;
    } else {
        soubtitleDownloader.searchAndDownloadSoubtitles(file.path);
    }


};

function loadVideo(e) {

    e.preventDefault();
    var files = [];
    if(e.dataTransfer){
        files=e.dataTransfer.files;
    }else if(e.target.files){
        files=e.target.files;
    }else{
        files=[
            {
                type:'video',
                path:e.target.value
            }
        ];
    }

    //@ToDo handle playlist
    for (var i=0; i<files.length; i++) {
        console.log(files[i]);
        if(files[i].type.indexOf('video')>-1){
            var video = document.querySelector('video');
            video.src=files[i].path;
            setTimeout(
                function(){
                    document.querySelector('.dropArea').classList.remove('droppableArea');
                    document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
                },
                250
            );
        }
    };
};

function videoError(message){
    var err=document.querySelector('#error');
    err.querySelector('h1').innerHTML=message;
    err.classList.remove('hide')

    setTimeout(
        function(){
            document.querySelector('#error').classList.remove('hidden');
        },
        10
    );
}

function closeError(){
    document.querySelector('#error').classList.add('hidden');
    setTimeout(
        function(){
            document.querySelector('#error').classList.add('hide');
        },
        300
    );
}



