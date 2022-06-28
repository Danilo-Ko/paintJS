const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("bgColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("paintBtn");
const save = document.getElementById("saveBtn");

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting () {
    painting=true;
}
function stopPainting () {
    painting=false;
}

function paintOnCanvas (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function controlRange (event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function modeChange () {
    if(filling === true) {
        filling =false;
        mode.innerText = "PAINT";
    }else {
        filling =true;
        mode.innerText = "FILL";
    }
}

function fillCanvans () {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function canvasCM (e) {
    e.preventDefault ();
}

function saveCavas (event) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL("image/jpeg");
    link.download ="PaintJS";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", paintOnCanvas);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", fillCanvans);
    canvas.addEventListener("contextmenu", canvasCM);
}

Array.from(colors).forEach ((color) => color.addEventListener("click", changeColor));

if(range) {
    range.addEventListener("input", controlRange);
}
if(mode) {
    mode.addEventListener("click", modeChange);
}

if(save) {
    save.addEventListener("click", saveCavas);
}