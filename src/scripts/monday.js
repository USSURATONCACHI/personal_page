
const monday = document.getElementById('monday');

function updatePic() {
    const prob = Math.random();

    if (prob < 0.002) {
        monday.src = '/images/monday.gif';
    } else if (prob < 0.01) {
        monday.src = '/images/monday.webp';
    } else {
        monday.src = '/images/silly_cat.webp'
    }
}

document
    .getElementById('monday-trigger')
    .addEventListener("mouseenter", updatePic);