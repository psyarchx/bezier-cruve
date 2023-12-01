/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("canvas");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const TAU = 6.28318530;

// configura a resolução (no momento fixo 1200 x 800)
canvas.width  = 1200;
canvas.height = 800;

desenhaRepresentacaoDoSistemaDeCoordenadas();


// desenhaPontoEm(240, 240);


const p0 = { x: 360, y: 480 };
const p1 = { x: 960, y: 240 };

// desenhaPontoEm(p0.x, p0.y);
// desenhaPontoEm(p1.x, p1.y);

// desenhaLinhaEntre(p0.x, p0.y, p1.x, p1.y);

// let randomX = randomRange(100, canvas.width  - 100);
// let randomY = randomRange(100, canvas.height - 100);


// Define the points as {x, y}
let start = { x: 320, y: 480 };
let cp1 = { x: 360, y: 480 };
let cp2 = { x: 960, y: 240 };
let end = { x: 1080, y: 720};

// Cubic Bézier curve
ctx.beginPath();
ctx.moveTo(start.x, start.y);
ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
ctx.stroke();

// Start and end points
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI); // Start point
ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI); // End point
ctx.fill();

// Control points
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(cp1.x, cp1.y, 5, 0, 2 * Math.PI); // Control point one
ctx.arc(cp2.x, cp2.y, 5, 0, 2 * Math.PI); // Control point two
ctx.fill();


function desenhaPontoEm(x, y) {
	ctx.lineWidth = 7;
	ctx.beginPath();
	ctx.arc(x, y, 7, 0, TAU);
	ctx.fill();
}

function desenhaLinhaEntre(x0, y0, x1, y1) {
	ctx.lineWidth = 5;
	linhaQualquerEntre(x0, y0, x1, y1);
}


function configuraGrossuraEEstiloDaLinha(width, strokeStyle) {
	ctx.lineWidth   = width;
	ctx.strokeStyle = strokeStyle;
}

function lerp(a, b, t) {
	return (1 - t) * a + t * b;
}

function randomRange(min, max) {
	return lerp(min, max, Math.random());
}

function linhaQualquerEntre(x0, y0, x1, y1) {
	ctx.beginPath();
	ctx.moveTo(x0, y0);
	ctx.lineTo(x1, y1);
	ctx.stroke();
}

function desenhaRepresentacaoDoSistemaDeCoordenadas() {
	// pinta o background
	ctx.fillStyle = "beige"
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// configura fonte
	ctx.fillStyle = "black"
	const fontSize = Math.min(canvas.width, canvas.height) / 25;
	ctx.font = `${fontSize}px serif`;

	// texto "0"
	ctx.fillText("0", 0, fontSize * 0.85)
 
	// textos "0..9"
	const markerLen = 10;
	for (let i = 1; i < 10; ++i) {
		const t = i / 10;

		const w = t * canvas.width;  // ou lerp(0, canvas.width, t)
		const wString = `${Math.round(w)}`
		const wStringMetrics = ctx.measureText(wString);
 
		// desenha linhas verticais (colunas)
		configuraGrossuraEEstiloDaLinha(0.25, "gray");
		linhaQualquerEntre(w, 0, w, canvas.height);

		// marcadores verticais
		configuraGrossuraEEstiloDaLinha(2.00, "black");
		linhaQualquerEntre(w, 0, w, markerLen);

		// textos das "colunas"
		ctx.fillText(wString, w - wStringMetrics.width - ctx.lineWidth, fontSize * 0.85);

		const h = t * canvas.height; // ou lerp(0, canvas.height, t)
		const hString = `${Math.round(h)}`
 
		// desenha linhas horizontais
		configuraGrossuraEEstiloDaLinha(0.25, "gray");
		linhaQualquerEntre(canvas.width, h, markerLen, h);

		// marcadores horizontais
		configuraGrossuraEEstiloDaLinha(2.00, "black");
		linhaQualquerEntre(0, h, markerLen, h);

		// textos das linhas
		ctx.fillText(hString, 0, h - ctx.lineWidth);
	}

	// texto "10"
	const textWidth = ctx.measureText(canvas.width).width;
	ctx.fillText(canvas.width, canvas.width - textWidth, fontSize * 0.85);
	ctx.fillText(canvas.height, 0, canvas.height);
}