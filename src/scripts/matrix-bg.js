
const canvas = document.getElementById('stack-background');
const ctx = canvas.getContext("2d");
const container = document.getElementById('stack-container');
const chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

let columns = [];

function drawStuff() {
    const drawAreaWidth = container.clientWidth;
    const drawAreaHeight = container.clientHeight;

    if (canvas.width != drawAreaWidth)
    canvas.width = drawAreaWidth;
    if (canvas.height != drawAreaHeight)
    canvas.height = drawAreaHeight;

    if (!isInViewport(canvas))
        return;

    const fontWidth = 20;
    const fontHeight = 24;

    const ctx = canvas.getContext("2d");
    //ctx.clearRect(drawAreaWidth, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, drawAreaHeight, canvas.width, canvas.height);
    ctx.fillStyle = '#04040830';
    ctx.fillRect(0, 0, drawAreaWidth, drawAreaHeight);
    ctx.font = '24px Fira Code'

    let colsCount = Math.floor(drawAreaWidth / fontWidth);
    let rowsCount = Math.round(drawAreaHeight / fontHeight);

    let centerCol = colsCount / 2;
    let centerRow = rowsCount / 2;

    for (let i = columns.length; i < colsCount; i++)
        columns.push(randInt(rowsCount));

    for (let i = 0; i < colsCount; i++) {
        let dist2 = Math.pow(i - centerCol, 2) + Math.pow(Math.pow(columns[i] - centerRow, 2), 1.2);
        let opacity = 255 / dist2;

        let letter = chars[randInt(chars.length)];
        ctx.fillStyle = `rgba(96,160,255,${opacity})`;
        ctx.fillText(letter, fontWidth * i, columns[i] * fontHeight);
        columns[i] += 1;
        columns[i] = columns[i] % rowsCount;
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 ||
        rect.left >= 0 ||
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) ||
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function randInt(max) {
    return Math.floor(Math.random() * max);
}

setInterval(drawStuff, 1000 / 10);