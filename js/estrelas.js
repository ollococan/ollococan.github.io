document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("star-container");
    const canvas = document.getElementById("linesCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const stars = [
        { x: 100, y: 100 }, { x: 200, y: 50 }, { x: 300, y: 100 },
        { x: 400, y: 50 }
    ];

    const constellationCenter = {
        x: stars.reduce((acc, star) => acc + star.x, 0) / stars.length,
        y: stars.reduce((acc, star) => acc + star.y, 0) / stars.length
    };

    const windowCenter = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    const offsetX = windowCenter.x - constellationCenter.x;
    const offsetY = windowCenter.y - constellationCenter.y;

    const adjustedStars = stars.map(star => ({
        x: star.x + offsetX,
        y: star.y + offsetY
    }));

    const connections = [
        [0, 1], [1, 2], [2, 3], [1, 5], [2, 4],
        [4, 5], [5, 7], [6, 7]
    ];

    let currentStar = 0;
    let linesDrawn = 0;

    for (let i = 0; i < 400; i++) {
        let star = document.createElement("div");
        star.classList.add("distant-star");
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        const twinkleDuration = Math.random() * 2 + 1;
        star.style.animation = `twinkle ${twinkleDuration}s infinite alternate`;
        container.appendChild(star);
    }

    function drawStars() {
        if (currentStar < adjustedStars.length) {
            let starEl = document.createElement("div");
            starEl.classList.add("star");
            starEl.style.left = `${adjustedStars[currentStar].x}px`;
            starEl.style.top = `${adjustedStars[currentStar].y}px`;
            starEl.setAttribute("data-index", currentStar);

            const twinkleDuration = Math.random() * 1.5 + 1;
            starEl.style.animation = `twinkle ${twinkleDuration}s infinite alternate`;

            container.appendChild(starEl);

            if (currentStar === 0) {
                starEl.classList.add("active-star");
            }

            starEl.addEventListener("click", handleStarClick);
        }
    }

    function setActiveStar(starEl) {
        const allStars = document.querySelectorAll('.star');
        allStars.forEach(star => star.classList.remove('active-star'));
        starEl.classList.add('active-star');
    }

    function drawLine(start, end) {
        const x1 = adjustedStars[start].x;
        const y1 = adjustedStars[start].y;
        const x2 = adjustedStars[end].x;
        const y2 = adjustedStars[end].y;

        let progress = 0;
        const lineDrawInterval = setInterval(() => {
            progress += Math.random() * 0.02 + 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + (x2 - x1) * progress, y1 + (y2 - y1) * progress);
            ctx.stroke();

            if (progress >= 1) {
                clearInterval(lineDrawInterval);
                linesDrawn++;
            }
        }, 20);
    }

    function handleStarClick(event) {
        const starClicked = event.target;
        const starIndex = parseInt(starClicked.getAttribute("data-index"));

        if (starIndex === currentStar) {
            setActiveStar(starClicked);

            if (linesDrawn < connections.length) {
                const [startIndex, endIndex] = connections[linesDrawn];
                drawLine(startIndex, endIndex);
            }

            currentStar++;

            if (currentStar < adjustedStars.length) {
                drawStars();
            }
        }
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .star.active-star {
            background-color: #a7c7f5; /* Blanco/azulado */
            box-shadow: 0 0 15px rgba(167, 199, 245, 0.8);
        }
    `;
    document.head.appendChild(style);

    drawStars();
});

document.body.addEventListener('click', function() {
    const music = document.getElementById('background-music');
    music.play().catch(error => {
        console.error('Error al intentar reproducir la música:', error);
    });
});
