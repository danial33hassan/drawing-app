
let canvas=document.querySelector('canvas')
let ctx=canvas.getContext('2d')
let fillColor=document.querySelector('#checkbox')
let isDrawing=false
let color='black'

/*
Working on brush tool
*/
window.addEventListener('load',()=>{
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
})

const drawing=(e)=>{
    if (!isDrawing) return;

    ctx.putImageData(snapshot, 0, 0)
    ctx.strokeStyle=color;
    ctx.fillStyle=color
    ctx.lineWidth=document.getElementById('slider').value
    if (selectedTool=='brush') {//Working on brush tool
        ctx.lineTo(e.offsetX,e.offsetY)
        ctx.stroke()
    }else if(selectedTool=='Rectangle') {
        drawRect(e)
    }else if (selectedTool=='Circle') {
        drawCircle(e)
    }else if (selectedTool=='Triangle') {
        drawTriangle(e)
    }else if(selectedTool=='Eraser'){//Working for erase tool
        ctx.strokeStyle='white'
        ctx.lineTo(e.offsetX,e.offsetY)
        ctx.stroke()
    }
}

canvas.addEventListener('mousedown',(e)=>{
    isDrawing=true;
    prevMouseX=e.offsetX;
    prevMouseY=e.offsetY
    ctx.beginPath()
    snapshot=ctx.getImageData(0, 0, canvas.width, canvas.height)
})
canvas.addEventListener('mousemove',drawing)
canvas.addEventListener('mouseup',()=>{isDrawing=false})

/*
All working on shapes
*/
let selectedTool='brush'
let prevMouseX
let prevMouseY
let snapshot
/*
Working on rectangle
*/
const drawRect=(e)=> {
    if (fillColor.checked) {
       return ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    }
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}
/*
Working on circle
*/
const drawCircle=(e)=> {
    ctx.beginPath()
    let radius=Math.sqrt(Math.pow(prevMouseX-e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2))
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
    fillColor.checked ? ctx.fill() : ctx.stroke()
}
/*
Working on triangle
*/
const drawTriangle=(e)=> {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX*2 - e.offsetX, e.offsetY)
    ctx.closePath()
    fillColor.checked ? ctx.fill() : ctx.stroke()
}
/*
All working of tool bar
*/
var slider = document.getElementById("slider");
var output = document.getElementById("size");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}
// document.getElementById('option').addEventListener('click')

// var colors=document.getElementsByName('color').forEach(element => {
//     element.addEventListener('click')
// });
function ChangeActiveClass(id){
    document.querySelector('.active').classList.remove('active')
    var shapeCursor=document.querySelector('.shapeCursor')
    var eraseCursor=document.querySelector('.eraseCursor')
    document.getElementById(id).classList.add('active')
    if (shapeCursor!=null) {
        shapeCursor.classList.remove('shapeCursor')
    }
    if (eraseCursor!=null) {
        eraseCursor.classList.remove('eraseCursor')
    }
    if (id=='Triangle' || id=='Rectangle' || id=='Circle') {
        document.querySelector('.board').classList.add('shapeCursor')
    }else if (id=='Eraser') {
        document.querySelector('.board').classList.add('eraseCursor')
    }
    selectedTool=id
}

function ChangeColor(id) {
    var e=document.querySelector('.selectedColor').classList.remove('selectedColor')
    var selectedColor=document.getElementById(id);
    selectedColor.classList.add('selectedColor')
    color=getComputedStyle(selectedColor).backgroundColor
}