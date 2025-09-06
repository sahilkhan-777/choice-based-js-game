let textArea = document.querySelector('.first-line');
const container = document.querySelector('.container');
const buttonContainer = document.querySelector('.btn-container');
const healthStatus = document.querySelector('#health-value');
const inventoryStatus = document.querySelector('#inventory-items');
const staminaStatus = document.querySelector('#stamina-value');
const liveScoreUpdate = document.querySelector('.live-score-update');

let health = 100;
let stamina = 100;
let inventory = ['Water bottle'];


healthStatus.textContent = health;
staminaStatus.textContent = stamina;
inventoryStatus.textContent = inventory.join(', ');

let score = document.createElement('h3');


const introText = "You wake up in a dense jungle, the sound of birds echoing through the trees. You have no memory of how you got here. In your pocket, you find a strange map leading to 'The Treasure of Eldoria.'";
const firstScenario = "You look around and see two possible paths. Which path do you take?";


const speedOfText = 50;
let charIndex = 0;

function typeWriter(textElement, text, callback) {
    if (charIndex < text.length) {
        textElement.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(() => typeWriter(textElement, text, callback), speedOfText);
    } else {
        charIndex = 0; // Reset for next line
        if (callback) callback();
    }
}


let firstChoiceButton = document.createElement('button');
firstChoiceButton.textContent = "Take the narrow path";
firstChoiceButton.classList.add('btn');

let secondChoiceButton = document.createElement('button');
secondChoiceButton.textContent = "Take the wide path";
secondChoiceButton.classList.add('btn');

firstChoiceButton.onclick = narrowPath;
secondChoiceButton.onclick = widePath;


typeWriter(textArea, introText, () => {
    setTimeout(() => {
        textArea.textContent = "";
        typeWriter(textArea, firstScenario, () => {
            setTimeout(() => {
                buttonContainer.appendChild(firstChoiceButton);
                buttonContainer.appendChild(secondChoiceButton);
            }, 1000);
        });
    }, 1000);
});

const scenarioNarrow = "You push aside the vines and find an old wooden bridge over a raging river. The boards look unstable. The bridge creaks under your weight. Do you:";

function narrowPath() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioNarrow, () => {
        setTimeout(() => {

            firstChoiceButton.textContent = 'Cross carefully';
            secondChoiceButton.textContent = 'Look for another way';

            firstChoiceButton.onclick = crossTheBridge;
            secondChoiceButton.onclick = findAnotherWay;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}


const scenarioWide = "You walk for an hour and reach a clearing with an abandoned campsite. A backpack lies near the burnt firepit.";

function widePath() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioWide, () => {
        setTimeout(() => {

            firstChoiceButton.textContent = 'Open and Check for Supplies';
            secondChoiceButton.textContent = 'Ignore it and move forward';

            firstChoiceButton.onclick = checkSupplies;
            secondChoiceButton.onclick = moveForward;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioCross = "Halfway across, a board snaps! You cling to the rope and barely make it to the other side. You lose your water bottle.";
const scenarioRiverBank = "You reach the opposite bank. You find a narrow cliff path leading upward.";
const scenarioCliffPath = "You carefully navigate the narrow cliff path, the wind howling around you. You reached the cave entrance. It's dark and foreboding.";

function crossTheBridge() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioCross, () => {
        setTimeout(() => {
            stamina -= 20;
            // debugger;
            staminaStatus.textContent = stamina;
            score.textContent = "-20  Stamina";
            inventory.pop();
            inventoryStatus.textContent = inventory.length > 0 ? inventory.join(', ') : 'None';
            liveScoreUpdate.appendChild(score);
            const scoreTwo = document.createElement('h3');
            scoreTwo.textContent = "-1  Water bottle";
            liveScoreUpdate.appendChild(scoreTwo);

            textArea.textContent = "";
            typeWriter(textArea, scenarioRiverBank, () => {
                setTimeout(() => {
                    textArea.textContent = "";
                    typeWriter(textArea, scenarioCliffPath, () => {
                        setTimeout(() => {
                            stamina -= 10;
                            staminaStatus.textContent = stamina;
                            const scoreThree = document.createElement('h3');
                            scoreThree.textContent = "-10 Stamina";
                            liveScoreUpdate.appendChild(scoreThree);


                            firstChoiceButton.textContent = 'Enter the cave';
                            secondChoiceButton.textContent = 'Rest and recover';

                            firstChoiceButton.onclick = enterCave;
                            secondChoiceButton.onclick = restAndRecover;

                            firstChoiceButton.style.display = 'inline-block';
                            secondChoiceButton.style.display = 'inline-block';
                        }, 1000);
                    });
                }, 1000);
            });

        }, 1000);
    });
}

const scenarioAnotherWay = "You follow the riverbank and discover a hidden cave entrance. Inside, it's pitch dark, but you hear faint dripping sounds.";

function findAnotherWay() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    // debugger;
    typeWriter(textArea, scenarioAnotherWay, () => {
        setTimeout(() => {

            firstChoiceButton.textContent = 'Enter the cave';
            secondChoiceButton.textContent = 'Go back and take the narrow path';

            firstChoiceButton.onclick = enterCave;
            secondChoiceButton.onclick = narrowPath;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}


const scenarioBackpack = "You kneel by the dusty pack. Inside, relics of another traveler — a flashlight, some water, and a note, stained and trembling with warning: 'Beware the guardian.'";

function checkSupplies() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioBackpack, () => {
        setTimeout(() => {

            firstChoiceButton.textContent = 'Cross carefully';
            secondChoiceButton.textContent = 'Look for another way';

            // firstChoiceButton.onclick = ;

            // secondChoiceButton.onclick = ;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioIgnore = "The forest grows quiet. Too quiet. The bushes rustle without wind, and unseen eyes follow your every step.";

function moveForward() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioIgnore, () => {
        setTimeout(() => {

            firstChoiceButton.textContent = 'Cross carefully';
            secondChoiceButton.textContent = 'Look for another way';

            // firstChoiceButton.onclick = ;

            // secondChoiceButton.onclick = ;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}


const scenarioCave = "You find a large stone door with carvings of strange creatures. A golden keyhole glints in the sunlight. Do you:";

function enterCave() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioCave, () => {
        setTimeout(() => {

            firstChoiceButton.textContent = 'Push the door';
            secondChoiceButton.textContent = 'Search for a key';

            firstChoiceButton.onclick = pushDoor;
            secondChoiceButton.onclick = searchKey;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioRest = "You find a sheltered spot and rest. The sounds of the jungle lull you into a light sleep. You wake up feeling slightly better but still weary.";

function restAndRecover() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    // debugger;
    typeWriter(textArea, scenarioRest, () => {
        setTimeout(() => {
            stamina += 15;
            let scoreFour = document.createElement('h3');
            scoreFour.textContent = "+15 Stamina";
            liveScoreUpdate.appendChild(scoreFour);
            if (stamina > 100) {
                stamina = 100;
                staminaStatus.textContent = stamina;
            }
            else {
                staminaStatus.textContent = stamina;
            }
            firstChoiceButton.textContent = 'Enter the cave';

            firstChoiceButton.onclick = enterCave;

            firstChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioPushDoor = "The door doesn't move. Suddenly, the carvings glow, and the Guardian of Eldoria awakens: a massive stone serpent with glowing eyes.";

function pushDoor() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioPushDoor, () => {
        setTimeout(() => {
            firstChoiceButton.textContent = 'Fight the Guardian';
            secondChoiceButton.textContent = 'Flee back to the river';

            firstChoiceButton.onclick = fightGuardian;
            secondChoiceButton.onclick = runAway;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioSearchKey = "You find the key buried in the sand near a broken statue and also take the metal sword from the statue. The door slowly creaks open, revealing the treasure chamber. But a Giant Snake is Guarding it!!!";
function searchKey() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioSearchKey, () => {
        setTimeout(() => {
            inventory.push('Golden Key');
            inventory.push('Metal Sword');
            inventoryStatus.textContent = inventory.join(', ');

            let scoreOne = document.createElement('h3');
            scoreOne.textContent = "+1  Metal sword";
            liveScoreUpdate.appendChild(scoreOne);

            let ScoreNine = document.createElement('h3');
            ScoreNine.textContent = "+1  Golden key";
            liveScoreUpdate.appendChild(ScoreNine);

            firstChoiceButton.textContent = 'Fight the Guardian';
            secondChoiceButton.textContent = 'Flee back to the river';

            firstChoiceButton.onclick = fightGuardian;
            secondChoiceButton.onclick = runAway;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioFightGuardianLose = "You bravely face the Guardian. But you don't have any weapons. The snake overpowers you. You have been defeated.";
const scenarioFightGuardianWin = "With the metal sword in hand, you confront the Guardian. After a fierce battle, you slay the beast. The treasure of Eldoria is yours!";

const scenarioTreasure = "The guardian's body turns to dust, revealing a gold shining chamber. Inside, golden light reflects off jewels piled high. A large chest sits in the center surrounded by floor plates. Do you:";

function fightGuardian() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';

    if (inventory.includes('Metal sword')) {
        typeWriter(textArea, scenarioFightGuardianWin, () => {
            setTimeout(() => {
                stamina -= 30;
                staminaStatus.textContent = stamina;
                const scoreX = document.createElement('h3');
                scoreX.textContent = "-30  Stamina";
                liveScoreUpdate.appendChild(scoreX);
                
                textArea.textContent = "";
                typeWriter(textArea, scenarioTreasure, () => {
                    setTimeout(() => {
                        firstChoiceButton.textContent = 'Rush Towards the treasure';
                        secondChoiceButton.textContent = 'Look for hidden traps';

                        firstChoiceButton.onclick = rushTowardsTreasure;
                        secondChoiceButton.onclick = lookForTraps;

                        firstChoiceButton.style.display = 'inline-block';
                        secondChoiceButton.style.display = 'inline-block';
                    })
                })
            }, 1000);
        });
    }
    else {
        health -= 100;
        healthStatus.textContent = health;

        const scoreFive = document.createElement('h3');
        scoreFive.textContent = "-100  Health";
        liveScoreUpdate.appendChild(scoreFive);

        gameOver();
    }
}

const scenarioRunAway = "You sprint back to the river, the Guardian's hiss echoing behind you. You are safe for now, but the treasure remains out of reach.";

function runAway() {
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioRunAway, () => {
        setTimeout(() => {
            firstChoiceButton.textContent = 'Take the narrow path';
            secondChoiceButton.textContent = 'Take the wide path';

            firstChoiceButton.onclick = narrowPath;
            secondChoiceButton.onclick = widePath;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioRushTowardsTreasure = "You rushed towards the treasure stepping on the plates. Suddenly, multiple poison arrows shoot out from the walls. You have been hit multiple times.";

function rushTowardsTreasure() {
    textArea.textContent = "";
    typeWriter(textArea, scenarioRushTowardsTreasure, () => {
        setTimeout(() => {
            health -= 100;
            healthStatus.textContent = health;

            const scoreEight = document.createElement('h3');
            scoreEight.textContent = "-100 Health";
            liveScoreUpdate.appendChild(scoreEight);

            typeWriter(textArea, "You lost all your health. You died.", () => {
                setTimeout(() => {
                    gameOver();
                }, 1000);
            });
        }, 1000);
    });
}

const scenarioLookForTraps = "You carefully examine the floor plates, noticing a slot for a sword. You insert your metal sword, disabling the traps.";

function lookForTraps() {
    textArea.textContent = "";
    typeWriter(textArea, scenarioLookForTraps, () => {
        setTimeout(() => {
            textArea.textContent = "";
            typeWriter(textArea, "The chest opens, revealing gold, jewels, and a map to another hidden treasure.", () => {
                setTimeout(() => {
                    textArea.textContent = "";
                    typeWriter(textArea, "Congratulations! You have found the Treasure of Eldoria and completed your adventure!", () => {
                        setTimeout(() => {
                            firstChoiceButton.style.display = 'none';
                            secondChoiceButton.style.display = 'none';

                            firstChoiceButton.textContent = "Restart Adventure";
                            secondChoiceButton.textContent = "Quit";

                            firstChoiceButton.onclick = () => {
                                window.location.href = 'adventure.html';
                            }
                            secondChoiceButton.onclick = () => {
                                window.close();
                            };

                        }, 1000);
                    });
                }, 1000);
            });
        }, 1000);
    });
}


function gameOver() {
    textArea.textContent = "GAME OVER";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    stamina = 0;
    staminaStatus.textContent = stamina;

    let scoreSix = document.createElement('h3');
    scoreSix.textContent = "0 Stamina";
    liveScoreUpdate.appendChild(scoreSix);

    let restartButton = document.createElement('button');
    restartButton.textContent = "Restart Adventure";
    restartButton.classList.add('btn');

    let quitButton = document.createElement('button');
    quitButton.textContent = "Quit";
    quitButton.classList.add('btn');

    quitButton.onclick = () => {
        window.close();
    };

    container.appendChild(restartButton);
    restartButton.addEventListener('click', () => {
        window.location.href = 'adventure.html';
    });
}