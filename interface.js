const bgContainer = document.getElementById('bg-container');
const contentContainer = document.getElementById('content-container');
const boxes = document.getElementsByClassName('box');

let offset = 0;
let isDragging = false;
let offsetX = 0, offsetY = 0;

function onMouseDown(e) {
    // offset += 2;
    // bgContainer.style.backgroundPosition = `${offset}px ${offset}px`;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;    

    cstartX = e.clientX;
    cstartY = e.clientY; 

    bginitialLeft = bgContainer.offsetLeft;    
    bginitialTop = bgContainer.offsetTop;
    cinitialLeft = contentContainer.offsetLeft;    
    cinitialTop = contentContainer.offsetTop;

    bgContainer.style.cursor = 'grabbing';
    // console.log(`${initialTop}, ${initialLeft}`);
}

bgContainer.addEventListener('mousedown', onMouseDown);
contentContainer.addEventListener('mousedown', onMouseDown);

document.addEventListener('mouseup', () => {
    isDragging = false;
    bgContainer.style.cursor = 'grab';
});

// Mouse clicking and dragging
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    let dx = e.clientX - startX;
    let dy = e.clientY - startY;

    offsetX += dx;
    offsetY += dy;    

    startX = e.clientX;
    startY = e.clientY;
    
    // Update positions
    bgContainer.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
    contentContainer.style.left = `${cinitialLeft + e.clientX - cstartX}px`;
    contentContainer.style.top = `${cinitialTop + e.clientY - cstartY}px`;        
});

// Zooming in and out
document.addEventListener("wheel", (e) => {
    const wheelOffset = Math.sign(e.deltaY);  // -1 when scrolling up, 1 when scrolling down
    
    const MULTIPLIER = 10;
    Array.from(boxes).forEach((box) => {
        box.style.width = `${Math.max(0, box.getBoundingClientRect().width - wheelOffset*MULTIPLIER)}px`;
    });    
});
