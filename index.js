const firstIntro = document.querySelector('.first');
const secondIntro = document.querySelector('.second');
const thirdIntro = document.querySelector('.third');
const fourthIntro = document.querySelector('.fourth');

const firstLine = "Long ago, hidden beyond rivers and jungles, there lay the kingdom of Eldoria. A realm of great wealth and mystical knowledge, its people carved towering temples, raised golden monuments, and guarded secrets said to hold the power of gods themselves.";
const secondLine = "But pride led to ruin. The Eldorians vanished, their cities swallowed by the jungle. Only whispers remain — of treasure buried in forgotten chambers, guarded by traps and ancient beasts that answer to no mortal hand.";
const thirdLine = "For centuries, adventurers have sought Eldoria. Few ever returned, their tales half-mad with fear — speaking of colossal serpents, living shadows, and walls that seemed to breathe with curses. Yet one thing is always certain: somewhere in the jungle lies the Treasure of Eldoria, waiting for the one daring — or foolish — enough to claim it.";
const fourthLine = "And now, fate has brought you here. Alone, with nothing but a tattered map in your pocket, you awaken in the heart of this forgotten land…";

const speedOfText = 50;
let charIndex = 0;

const typingSound = new Audio('sounds/typing.wav');
function typeWriter(textElement, text, callback) {
    if (charIndex < text.length) {
        textElement.textContent += text.charAt(charIndex);
        // Play typing sound for each character
        if (!typingSound.paused) {
            typingSound.currentTime = 0; // rewind if still playing
        }
        typingSound.play().catch(() => {
            // This error happens if user hasn't interacted yet
            // You can ignore or wait until a click
        });
        charIndex++;
        setTimeout(() => typeWriter(textElement, text, callback), speedOfText);
    } else {
        charIndex = 0; // Reset for next line
        if (callback) callback();
    }
}

typeWriter(firstIntro, firstLine, () => {
    setTimeout(() => {
        typeWriter(secondIntro, secondLine, () => {
            setTimeout(() => {
                typeWriter(thirdIntro, thirdLine, () => {
                    setTimeout(() => {
                        typeWriter(fourthIntro, fourthLine, () => {
                            setTimeout(() => {
                                let startButton = document.createElement('button');
                                startButton.textContent = "Start Your Adventure";
                                startButton.classList.add('btn');
                                document.querySelector('.container').appendChild(startButton);
                                startButton.addEventListener('click', () => {
                                    window.location.href = 'adventure.html';
                                });
                            }, 1000);
                        });
                    }, 1000);
                });
            }, 1000);
        });
    }, 1000);
});
