var modeCharHM = ":";
var modeCharMS = ":";
var modeCharSS = "";

// http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript
function toLocalIsoString(date) {
	function pad(n) { return n < 10 ? '0' + n : n }
	var localIsoString = date.getFullYear() + '-'
		+ pad(date.getMonth() + 1) + '-'
		+ pad(date.getDate()) + ' '
		+ pad(date.getHours()) + modeCharHM
		+ pad(date.getMinutes()) + modeCharMS
		+ pad(date.getSeconds()) + modeCharSS;
	if(date.getTimezoneOffset() == 0) localIsoString += 'Z';
	return localIsoString;
};

// http://stackoverflow.com/questions/2099661/enter-key-in-textarea
function formatTextArea(textArea) {
	textArea.value = textArea.value + "[" + toLocalIsoString(new Date())  + "] ";
}

// http://www.infinite-x.net/2007/04/29/creating-a-legal-filename-in-javascript/
function generateValidFilename(stringInput) {
	var replaceChar = "_";
	var regEx = new RegExp('[,/\:*?""<> |]', 'g');
	var filename = stringInput.replace(regEx, replaceChar);
	
	return filename;
}

function refreshTextbox() {
	document.getElementById("stampyIO").value = "";
	formatTextArea(document.getElementById("stampyIO"));
	document.getElementById("stampyIO").focus();
}

function sepOnClick() {
	var sepRadioButtonCol = document.getElementById("col");
	var sepRadioButtonUsc = document.getElementById("usc");
	var sepRadioButtonMil = document.getElementById("mil");
	
	if (sepRadioButtonCol.checked) {
		modeCharHM = ":";
		modeCharMS = ":";
		modeCharSS = "";
	} else if (sepRadioButtonUsc.checked) {
		modeCharHM = "_";
		modeCharMS = "_";
		modeCharSS = "";
	} else if (sepRadioButtonMil.checked) {
		modeCharHM = "";
		modeCharMS = "h";
		modeCharSS = "s";
	}
	
	document.getElementById("stampyIO").focus();
}

function updateTitle() {
	if (document.getElementById("stampyTitle").value == "") {
		document.getElementById("stampyTitle").value = "stampy document";
	}
	document.getElementById("stampyTitle").value = document.getElementById("stampyTitle").value.toLowerCase();
	document.title = document.getElementById("stampyTitle").value + " - Stampy";
}

function downloadMyFile() {
	text = document.getElementById("stampyIO").value;
	// http://stackoverflow.com/questions/16165215/javascript-replace-n-with-r-n
	text = text.replace(/\r?\n/g, "\r\n");
	var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
	var filename = generateValidFilename(document.getElementById("stampyTitle").value) + ".txt";
	saveAs(blob, filename);
}

window.onload = function() {
	updateTitle();
	refreshTextbox();
	resized();
	
	var textArea = document.getElementById("stampyIO");
	textArea.onkeyup = function(evt) {
		evt = evt || window.event;

		if (evt.keyCode == 13) {
			formatTextArea(this);
		}
	};
	
};

function resized(){
	scrollTo(0,0);
	var y = window.innerHeight ? window.innerHeight :
	document.body.clientHeight;
	// for better window height, see
	// <URL: http://jibbering.com/faq/#FAQ4_9 >
	var t = document.getElementById("stampyIO"); // the textarea
	t.style.height=Math.max(1,y-txt.offsetTop-1);
}