document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("star-container");
    const canvas = document.getElementById("linesCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    const stars = [
        {x: 100, y: 100}, {x: 200, y: 50}, {x: 300, y: 100},
        {x: 400, y: 50}, {x: 250, y: 200}, {x: 150, y: 300},
        {x: 350, y: 300}, {x: 250, y: 400}
    ];

    const connections = [
        [0, 1], [1, 2], [2, 3], [1, 5], [2, 4],
        [4, 5], [5, 7], [6, 7]
    ];

    function drawStars() {
        stars.forEach(star => {
            let starEl = document.createElement("div");
            starEl.classList.add("star");
            starEl.style.left = `${star.x}px`;
            starEl.style.top = `${star.y}px`;
            container.appendChild(starEl);
        });
    }

    function drawLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        
        connections.forEach(([i, j]) => {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
        });
    }

    drawStars();
    drawLines();
});