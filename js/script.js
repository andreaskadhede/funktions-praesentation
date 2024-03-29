"use strict";

/***************************** Lav confetti ************************************/
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array der indeholder confetti
const confettiArray = [];

// Funktion der laver confetti
function Confetti() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    this.speed = Math.random() * 5 + 3;
    this.width = Math.random() * 10 + 5;
    this.height = Math.random() * 10 + 5;
    this.rotation = Math.random() * 0.2;

    this.update = function() {
        this.y += this.speed;

        if (this.y >= canvas.height) {
            this.y = Math.random() * canvas.height;
        }

        this.rotation += Math.random() * 5;
        if (this.rotation >= 360) {
            this.rotation -= 360;
        }

        this.draw();
    };

    this.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    };
}

// Funktion der laver flere confetti
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiArray.push(new Confetti());
    }
}

// Funktion der animerer confetti
function animateConfetti() {
    requestAnimationFrame(animateConfetti);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < confettiArray.length; i++) {
        confettiArray[i].update();
    }
}

/*************************** Afspil musik **********************************/ 
const playMusic = () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
};

const stopMusic = () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
};


function startParty() {
    playMusic();
    createConfetti();
    animateConfetti();

    let startButton = document.getElementById("startButton");
    startButton.style.display = "none";

    let nameInput = document.getElementById("nameInput");
    let name = nameInput.value.trim(); // Get the trimmed value of the input
    let partyText = document.getElementById("partyText");
    partyText.textContent = "Velkommen til festen, " + (name !== "" ? name + "!" : "gæst!"); // Update partyText with the name if provided, otherwise use "gæst"
    partyText.classList.remove("hidden");

    let canvas = document.getElementById("canvas");
    canvas.style.display = "block";
    let img = document.querySelector(".confetti");
    img.style.display = "block";

    let input = document.getElementById("nameInput");
    input.style.display = "none";

    console.log("Nu er festen i gang!")
}
