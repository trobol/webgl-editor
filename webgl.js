let gl = {
	init(s) {
		let canvas = s;
		gl = Object.assign(canvas.getContext("webgl"), gl);
		gl.resize();
		gl.clearColor(0.1, 0.1, 0.1, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		function load(path) {

			return fetch(path)
				.then(response => { return response.text() });

		}

		dV = load('shaders/default.vert');
		dF = load('shaders/default.frag');

		return Promise.all([dV, dF]).then((v) => {

			gl.default = gl.buildProgram(v[0], v[1]);
			gl.useProgram(gl.default);
		});
	},
	resize() {

		gl.canvas.width = Math.floor(gl.canvas.clientWidth * window.devicePixelRatio);
		gl.canvas.height = Math.floor(gl.canvas.clientHeight * window.devicePixelRatio);

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	},
	buildShader(type, source) {
		let shader = gl.createShader(type);

		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (success) {
			return shader;
		}

		console.log(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
	},
	buildProgram(vertexShader, fragmentShader) {

		vertexShader = gl.buildShader(gl.VERTEX_SHADER, vertexShader);
		fragmentShader = gl.buildShader(gl.FRAGMENT_SHADER, fragmentShader);
		var program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		var success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (success) {
			return program;
		}

		console.log(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);

	},
	vertexBuffer: [],
	colorBuffer: [],
	buffers: {}
};





