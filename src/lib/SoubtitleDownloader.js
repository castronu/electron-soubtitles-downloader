/**
 * Created by castronu on 05/04/16.
 */
class SoubtitleDownloader {


    checkDirectoryAndDownloadFiles(path) {

        var fs = require('fs');
        var pathService = require('path');

        fs.readdir(path, function (err, files) {
            for (var i = 0; i < files.length; i++) {

                if (fs.lstatSync(path + "/" + files[i]).isDirectory()) {

                    new SoubtitleDownloader().checkDirectoryAndDownloadFiles(path + "/" + files[i]);
                }


                var obj = files[i];
                var fileExtension = pathService.extname(obj);
                if (fileExtension === ".mp4" || fileExtension === ".avi" || fileExtension === ".mkv") {

                    new SoubtitleDownloader().searchAndDownloadSoubtitles(path + "/" + files[i]);
                }

            }

        });
    }

    searchAndDownloadSoubtitles(file) {

        var opensubtitles = require("subtitler");
        opensubtitles.api.login()
            .then(function (token) {
                opensubtitles.api.searchForFile(token, lang, file).done(
                    function (results) {
                        if (results.length != 0) {
                            opensubtitles.downloader.download(results, 1, file, null);
                            /*new Notification("title", {
                             title: "Basic Notification",
                             body: "Short message part"
                             });*/
                            var dropZone = document.getElementById("dropZone");
                            var oldHtml = dropZone.innerHTML;
                            dropZone.innerHTML = "Done!";
                            setTimeout(function () {
                                dropZone.innerHTML = oldHtml;
                                document.querySelector('.dropArea').classList.remove('droppableArea');
                            }, 1000)

                        } else {
                            var dropZone = document.getElementById("dropZone");
                            var oldHtml = dropZone.innerHTML;
                            dropZone.innerHTML = "Error";
                            setTimeout(function () {
                                dropZone.innerHTML = oldHtml;
                                document.querySelector('.dropArea').classList.remove('droppableArea');
                            }, 1000)
                        }
                        opensubtitles.api.logout(token);
                    }
                ).catch(function (error) {
                    var dropZone = document.getElementById("dropZone");
                    var oldHtml = dropZone.innerHTML;
                    dropZone.innerHTML = "Error!";
                    setTimeout(function () {
                        dropZone.innerHTML = oldHtml;
                        document.querySelector('.dropArea').classList.remove('droppableArea');
                    }, 1000)
                });
            })
    };


}
