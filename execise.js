const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("bgColor");
const range = document.querySelector("#jsRange");
const modeChange = document.querySelector("#paintBtn");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle ="black";
ctx.lineWidth =2.5;

let painting = false;
let filling = false;

function stopPainting () {
    painting=false;
}
function startPainting () {
    painting=true;
}

function onMouseMove (event) {
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

function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

function handleRange (event) {
    const rangeControl =event.target.value;
    ctx.lineWidth = rangeControl;
}

function handleModeChange () {
    if(filling === true) {
        filling = false;
        modeChange.innerText = "PAINT";
    }else {
        filling = true;
        modeChange.innerText = "FILL";
    }
}

function handleCanvasClick () {
    if(filling) {
        ctx.fillRect (0, 0, canvas.width, canvas.height);
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRange);
}

if(modeChange) {
    modeChange.addEventListener("click", handleModeChange);
}
