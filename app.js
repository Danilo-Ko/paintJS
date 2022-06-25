const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("bgColor");
const range = document.querySelector("#jsRange");
const modeChange = document.querySelector("#paintBtn");
const save = document.querySelector("#saveBtn");


canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}
function startPainting() {
    painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick (event) {
  const color =event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange (event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick () {
  if(filling === true) {
    filling = false;
    modeChange.innerText = "FILL";
  }else {
    filling = true;
    modeChange.innerText = "PAINT";
  }
}

function handleCanvasClick () {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function handleCM (event) {
  event.preventDefault();
}

function handleSaveClick () {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[❤]";
  link.click();
}
if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (modeChange) {
  modeChange.addEventListener("click", handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}