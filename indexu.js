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

let animacaoRodando = false;
let corpo = { x:30 , y:30, velocidade: 0.001, t: 0, raio: 20 };

let pontosBezier = [
    { x: corpo.x, y: corpo.y },
    { x: 360, y: 480 },
    { x: 960, y: 240 },
    { x: 1080, y: 720}
];

// Cubic Bézier curve
ctx.beginPath();
ctx.moveTo(corpo.x, corpo.y);
ctx.bezierCurveTo(pontosBezier[1].x, pontosBezier[1].y, pontosBezier[2].x, pontosBezier[2].y, pontosBezier[3].x, pontosBezier[3].y);
ctx.stroke();

// corpo and pontosBezier[3] points
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(corpo.x, corpo.y, 5, 0, 2 * Math.PI); // Start point
ctx.arc(pontosBezier[3].x, pontosBezier[3].y, 5, 0, 2 * Math.PI); // pontosBezier[3] point
ctx.fill();

// Control points
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(pontosBezier[1].x, pontosBezier[1].y, 5, 0, 2 * Math.PI); // Control point one
ctx.arc(pontosBezier[2].x, pontosBezier[2].y, 5, 0, 2 * Math.PI); // Control point two
ctx.fill();





function desenharCorpo() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(corpo.x, corpo.y, corpo.raio, 0, Math.PI * 2, false);
    ctx.fill();
}

function animar() {
    requestAnimationFrame(animar);

    if (!animacaoRodando) {
        desenharCorpo();
    } else {
        moverCorpo();
    }
}

function moverCorpo() {
    let [p0, p1, p2, p3] = pontosBezier;

    let cx = 3 * (p1.x - p0.x);
    let bx = 3 * (p2.x - p1.x) - cx;
    let ax = p3.x - p0.x - cx - bx;

    let cy = 3 * (p1.y - p0.y);
    let by = 3 * (p2.y - p1.y) - cy;
    let ay = p3.y - p0.y - cy - by;

    let tauCorpo = corpo.t;
    corpo.t += corpo.velocidade;

    let xt = ax * (tauCorpo ** 3) + bx * (tauCorpo ** 2) + cx * tauCorpo + p0.x;
    let yt = ay * (tauCorpo ** 3) + by * (tauCorpo ** 2) + cy * tauCorpo + p0.y;

    if (corpo.t > 1) {
        corpo.t = 1;
        animacaoRodando = false;
    }

    corpo.x = xt;
    corpo.y = yt;

    desenharCorpo();
};

animar();

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

canvas.addEventListener("click", function (event) {
    animacaoRodando = true;
});