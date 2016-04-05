"use strict";
var lang = "eng";
var buttons = {};
var buttonFre = document.getElementById("fre");
buttonFre.addEventListener('click', function () {
        clearOthers();
        buttonFre.style.border = "4px solid green";
        lang = "fre";
    }
);
buttons['fre'] = buttonFre;
var buttonIta = document.getElementById("ita");
buttonIta.addEventListener('click', function () {
        clearOthers();
        buttonIta.style.border = "4px solid green";
        lang = "ita";
    }
);
buttons['ita'] = buttonIta;

var buttonEng = document.getElementById("eng");
buttonEng.addEventListener('click', function () {
        clearOthers();
        buttonEng.style.border = "4px solid green";
        lang = "eng";
    }
);
buttons['eng'] = buttonEng;
var buttonSpa = document.getElementById("spa");
buttonSpa.addEventListener('click', function () {
        clearOthers();
        buttonSpa.style.border = "4px solid green";
        lang = "spa";
    }
);
buttons['spa'] = buttonSpa;

var clearOthers = function () {
    for (var index in buttons) {
        buttons[index].style.border = "none";
    }
};
