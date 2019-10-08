
let textBox, lineNumbers, viewCompiled;
window.onload = function () {

	textBox = document.getElementById('textBox');
	lineNumbers = document.getElementById('linenums');
	viewCompiled = document.getElementById('language');
	document.getElementById('run').addEventListener('click', () => { run(); });
	textBox.innerText = localStorage.getItem('text');
	updateLineNumbers();
	mwConsole.element = document.getElementById('console');
	viewCompiled.addEventListener('click', (e) => {

		document.body.dataset.language = document.body.dataset.language === 'js' ? 'matwab' : 'js';
	});
	textBox.addEventListener('cut', updateLineNumbers);
	textBox.addEventListener('paste', updateLineNumbers);
	textBox.addEventListener('keydown', updateLineNumbers);
	textBox.addEventListener('cut', updateLineNumbers);
	textBox.addEventListener('paste', (e) => {
		document.execCommand('insertText', e.clipboardData.getData('text'));
		v.preventDefault();
		return true;
	});

}
document.onkeydown = function (e) {
	let key = String.fromCharCode(e.keyCode);
	if (e.ctrlKey && (key === 'S' || key === 'R' || key === '\n')) {
		run();
		e.preventDefault();
	}

}
window.onbeforeunload = function (e) {
	localStorage.setItem('text', textBox.innerText);
}
let mwConsole = {
	log(o) {
		if (!this.element) console.error('Not ready for logging yet');
		if (!o) return;
		let p = document.createElement('p');
		p.innerHTML = new String(o);
		this.element.append(p);
		return p;
	},
	error(e) {
		this.log(e).style.color = 'red';
	}
}

let d, i, s;
function appendCode(c) {
	var f = function () {
		s = document.createElement('script');
		s.innerHTML = c;
		d.body.appendChild(s);
		s.remove();
	}
	f();

}
function newContext(f) {
	if (!i) i = document.getElementById('frame');
	i.contentWindow.location.reload()
	i.onload = function () {
		declareScope(i.contentWindow, mwConsole);
		f();
	};

}
function run() {
	for (let e of document.getElementsByClassName('error')) {
		e.classList.remove('error');
	}
	newContext(function () {
		d = (i.contentWindow || i.contentDocument);
		d.onerror = ErrorLog;
		if (d.document) d = d.document;
		parse();
	});

}
function ErrorLog(msg, url, line, c) {
	textBox.childNodes[line - 1].classList.add('error');
	mwConsole.error(msg);
	return true;
}

function getText() {
	return textBox.innerText;
}
function parse() {
	appendCode(getText());
}
function compile() {
	let input = getText(),
		current = '',
		declared = {},
		handlers = {
			default(i) {
				return 1;
			},
			matrix(start, end) {
				let stringIn = input.slice(start, end + 1),
					stringOut = '[',
					last = 1;
				for (var a = 1; a <= end - start; a++) {
					switch (stringIn[a]) {
						case '\n':
							stringOut += '[' + stringIn.slice(last + 1, a) + ']\n';
							last = a;
							break;
						case ']':
							stringOut += ']';
							break;
						case ';':
							stringOut += '[' + stringIn.slice(last + 1, a) + '],';
							last = a;
							break;
					}
				}
				console.log(stringOut);
			},
			variable(i) {

			},
			eol(i) {

			}
		},
		hander = handlers.default;
	for (var i = 0; i < input.length; i++) {

		switch (input[i]) {
			//find a matrix (will not work on arrays of matrices)
			case '[':
				let end = input.indexOf(']', i);
				if (end < 0) continue;//invalid code
				if (input.split(i, end).indexOf('[', i + 1) > -1) continue;//valid array
				//for sure a matrix
				handlers.matrix(i, end);
				i = end;
				break;
		}
	}
	console.log(input);
}
let currentLines;




window.onload = () => {
	const lineNumber = document.querySelector('.line-numbers');
	const editor = document.querySelector('.editor');
	const editorContent = document.querySelector('.editor-content');

	textBox.addEventListener('keydown', updateLineNumbers);

	function updateLineNumbers() {
		const lines = editorContent.childNodes.length;
		const nums = lineNumber.childNodes.length;

	}

}