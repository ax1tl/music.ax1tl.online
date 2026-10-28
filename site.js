/* ===== shared by music.html and album.html ===== */

// Animated noise overlay (moved out of the page so it isn't duplicated)
(function () {
    const canvas = document.getElementById('noise_texture');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const scale = 1;

    function resizeCanvas() {
        canvas.width = window.innerWidth / scale;
        canvas.height = window.innerHeight / scale;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function generateNoise() {
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i]     = Math.floor(Math.random() * 255);
            data[i + 1] = Math.floor(Math.random() * 255);
            data[i + 2] = Math.floor(Math.random() * 255);
            data[i + 3] = 100;
        }
        ctx.putImageData(imgData, 0, 0);
        setTimeout(() => requestAnimationFrame(generateNoise), 10);
    }
    generateNoise();
})();

// Load the album list from albums.json
async function loadAlbums() {
    const res = await fetch('albums.json');
    if (!res.ok) throw new Error('Could not load albums.json (' + res.status + ')');
    const data = await res.json();
    return data.albums || [];
}
