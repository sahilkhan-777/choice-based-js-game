let textArea = document.querySelector('.first-line');
const container = document.querySelector('.container');
const buttonContainer = document.querySelector('.btn-container');
const healthStatus = document.querySelector('#health-value');
const inventoryStatus = document.querySelector('#inventory-items');
const staminaStatus = document.querySelector('#stamina-value');
const liveScoreUpdate = document.querySelector('.live-score-update');
let scoreList = document.querySelector('.score-list');
let flashLightIcon = document.querySelector('#no-flashlight');
let fearIcon = document.querySelector('#fear');
let noWaterIcon = document.querySelector('#no-water');

let health = 100;
let stamina = 100;
let inventory = ['Water bottle'];
let fear = false;
let movementSlowed = false;

healthStatus.textContent = health;
staminaStatus.textContent = stamina;
inventoryStatus.textContent = inventory.join(', ');


function checkForWaterBottle() {
    if (!inventory.includes('Water bottle') && stamina > 0) {
        stamina -= 15;
        staminaStatus.textContent = stamina;
    }
}

function noFlashLight() {
    flashLightIcon.style.fill = "green";
    let listItem = document.createElement('li');
    listItem.textContent = "Penalty: No flashlight";
    scoreList.appendChild(listItem);
}


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

function checkStamina() {
    if (stamina <= 0) {
        textArea.textContent = "";
        firstChoiceButton.style.display = 'none';
        secondChoiceButton.style.display = 'none';
        staminaStatus.textContent = 0;
        typeWriter(textArea, "Your stamina went down to zero, you are exhausted. You cannot continue anymore!!", () => {
            setTimeout(()=>{
                gameOver();
            }, 1000);
        });
        return true;
    }
    return false;
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
    checkForWaterBottle();
    if(checkStamina()) return;
    noFlashLight();
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    // debugger;
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
    if(checkStamina()) return;
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
    if(checkStamina()) return;
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioCross, () => {
        setTimeout(() => {
            stamina -= 15;
            // debugger;
            staminaStatus.textContent = stamina;
            const listItem1 = document.createElement('li');
            listItem1.textContent = "Penalty: No water bottle";
            scoreList.appendChild(listItem1);
            noWaterIcon.style.fill = "green";
            inventory.pop();
            inventoryStatus.textContent = inventory.length > 0 ? inventory.join(', ') : 'None';
            const listItem2 = document.createElement('li');
            listItem2.textContent = "-1  Water bottle";
            scoreList.appendChild(listItem2);

            textArea.textContent = "";
            typeWriter(textArea, scenarioRiverBank, () => {
                setTimeout(() => {
                    textArea.textContent = "";
                    typeWriter(textArea, scenarioCliffPath, () => {
                        setTimeout(() => {
                            stamina -= 10;
                            staminaStatus.textContent = stamina;
                            const listItem3 = document.createElement('li');
                            listItem3.textContent = "-10 Stamina";
                            scoreList.appendChild(listItem3);


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
    if(checkStamina()) return;
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


const scenarioBackpack = "You kneel by the dusty pack. Inside, relics of another traveler — a flashlight, and a note, stained and trembling that says: 'Follow the tracks....beware the door.'";

function checkSupplies() {
    if(checkStamina()) return;
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioBackpack, () => {

        setTimeout(() => {
            inventory.push('Flashlight');
            inventory.push('Note');
            inventoryStatus.textContent = inventory.join(', ');

            let listItem1 = document.createElement('li');
            listItem1.textContent = "+1 Flashlight";
            scoreList.appendChild(listItem1);

            let listItem2 = document.createElement('li');
            listItem2.textContent = "+1 Note";
            scoreList.appendChild(listItem2);

            firstChoiceButton.textContent = "Follow tracks";
            firstChoiceButton.onclick = followTracks;

            firstChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}
const scenarioFollowTracks = "You follow the faint tracks leading away from the campsite, you arrive at a cave entrance. It's dark and foreboding.";
function followTracks() {
    if(checkStamina()) return;
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    textArea.textContent = "";
    typeWriter(textArea, scenarioFollowTracks, () => {
        setTimeout(() => {
            if(!inventory.includes('Flashlight')){
                typeWriter(textArea, "You encountered a pit trap. You got injured.");
                health -= 20;
                healthStatus.textContent = health;

                let listItem = document.createElement('li');
                listItem.textContent = "-20  Health";
                scoreList.appendChild(listItem);
            }
            firstChoiceButton.textContent = 'Enter the cave';
            secondChoiceButton.textContent = 'Rest and recover';

            firstChoiceButton.onclick = enterCave;
            secondChoiceButton.onclick = restAndRecover;

            firstChoiceButton.style.display = 'inline-block';
            secondChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioConfrontWatcher = "You step forward, towards the rustling bushes. A pair of glowing eyes stare back at you. You stumble backward, heart racing, before bolting blindly.";
const scenarioConfrontWatcherEscape = "Branches scrape your arms until you break free...straight at the cave's shadow.";
function confrontWatcher() {
    if(checkStamina()) return;
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioConfrontWatcher, () => {
        setTimeout(() => {
            textArea.textContent = "";
            typeWriter(textArea, scenarioConfrontWatcherEscape, () => {
                fear = true;
                if (fear === true) {
                    movementSlowed = true;
                }
                let listItem1 = document.createElement('li');
                listItem1.textContent = "Penalty: Fear";
                scoreList.appendChild(listItem1);
                fearIcon.style.fill = "green";

                health -= 10;
                healthStatus.textContent = health;

                let listItem2 = document.createElement('li');
                listItem2.textContent = "-10  health";
                scoreList.appendChild(listItem2);


                setTimeout(() => {
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
}

const scenarioIgnore = "You leave it behind. Soon after, you hear rustling in the bushes. Something is watching you.";
function moveForward() {
    noFlashLight();
    if(checkStamina()) return;
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioIgnore, () => {
        setTimeout(() => {

            firstChoiceButton.textContent = "Confront what's watching you";

            firstChoiceButton.onclick = confrontWatcher;

            firstChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}


const scenarioCave = "You find a large stone door with carvings of strange creatures. A golden keyhole glints in the sunlight. Do you:";

function enterCave() {
    checkForWaterBottle();
    if(checkStamina()) return;
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
    if(checkStamina()) return;
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    // debugger;
    typeWriter(textArea, scenarioRest, () => {
        setTimeout(() => {
            fear = false;
            let listItem = document.createElement('li');
            listItem.textContent = "Fear removed";
            scoreList.appendChild(listItem);
            fearIcon.style.fill = "#181818";

            stamina += 15;
            let listItem2 = document.createElement('li');
            listItem2.textContent = "+15 Stamina";
            scoreList.appendChild(listItem2);

            if (stamina > 100) {
                stamina = 100;
                staminaStatus.textContent = stamina;
            }
            else {
                staminaStatus.textContent = stamina;
            }
            
            health += 20;
            let listItem3 = document.createElement('li');
            listItem3.textContent = "+20 Health";
            scoreList.appendChild(listItem3);

            if(health > 100){
                health = 100;
                healthStatus.textContent = health;
            }
            else{
                healthStatus.textContent = health;
            }


            firstChoiceButton.textContent = 'Enter the cave';

            firstChoiceButton.onclick = enterCave;

            firstChoiceButton.style.display = 'inline-block';
        }, 1000);
    });
}

const scenarioPushDoor = "The door doesn't move. Suddenly, the carvings glow, and the Guardian of Eldoria awakens: a massive stone serpent with glowing eyes.";

function pushDoor() {
    checkForWaterBottle();
    if(checkStamina()) return;
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
    checkForWaterBottle();
    if(checkStamina()) return;
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioSearchKey, () => {
        setTimeout(() => {
            inventory.push('Golden Key');
            inventory.push('Metal Sword');
            inventoryStatus.textContent = inventory.join(', ');

            let listItem5 = document.createElement('li');
            listItem5.textContent = "+1  Metal sword";
            scoreList.appendChild(listItem5);

            let listItem6 = document.createElement('li');
            listItem6.textContent = "+1  Golden key";
            scoreList.appendChild(listItem6);

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
const scenarioFightGuardianWin = "With the metal sword in hand, you confront the Guardian. After a fierce battle, you slay the beast.";

const scenarioTreasure = "The guardian's body turns to dust, revealing a gold shining chamber. Inside, golden light reflects off jewels piled high. A large chest sits in the center surrounded by floor plates. Do you:";

function fightGuardian() {
    checkForWaterBottle();
    if(checkStamina()) return;
    textArea.textContent = "";
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';

    // debugger;
    if (inventory.includes('Metal Sword') && stamina >= 30 && health >= 60) {
        typeWriter(textArea, scenarioFightGuardianWin, () => {
            setTimeout(() => {
                const listItem1 = document.createElement('li');
                const listItem2 = document.createElement('li');
                if (movementSlowed === true) {
                    stamina -= 50;
                    health -= 50;
                    listItem1.textContent = "-50 Stamina";
                    listItem2.textContent = "-50 Health";
                }
                else {
                    stamina -= 25;
                    health -= 25;
                    listItem1.textContent = "-25 Stamina";
                    listItem2.textContent = "-25 Health";
                }
                staminaStatus.textContent = stamina;
                healthStatus.textContent = health;
                
                scoreList.appendChild(listItem1);
                scoreList.appendChild(listItem2);

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
        typeWriter(textArea, scenarioFightGuardianLose, () => {
            setTimeout(() => {
                textArea.textContent = "";
                health -= 100;
                healthStatus.textContent = health;

                const listItem7 = document.createElement('li');
                listItem7.textContent = "-100  Health";
                scoreList.appendChild(listItem7);
                gameOver();
            }, 1000);
        });
    }
}

const scenarioRunAway = "You sprint back to the river, the Guardian's hiss echoing behind you. You are safe for now, but the treasure remains out of reach.";

function runAway() {
    checkForWaterBottle();
    if(checkStamina()) return;
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
    checkForWaterBottle();
    if(checkStamina()) return;
    textArea.textContent = "";
    typeWriter(textArea, scenarioRushTowardsTreasure, () => {
        setTimeout(() => {
            health -= 100;
            healthStatus.textContent = health;

            const listItem8 = document.createElement('li');
            listItem8.textContent = "-100 Health";
            scoreList.appendChild(listItem8);

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
    checkForWaterBottle();
    textArea.textContent = "";
    if(checkStamina()) return;
    firstChoiceButton.style.display = 'none';
    secondChoiceButton.style.display = 'none';
    typeWriter(textArea, scenarioLookForTraps, () => {
        setTimeout(() => {
            textArea.textContent = "";
            typeWriter(textArea, "The chest opens, revealing gold, jewels, and a map to another hidden treasure.", () => {
                setTimeout(() => {
                    textArea.textContent = "";
                    typeWriter(textArea, "Congratulations! You have found the Treasure of Eldoria and completed your adventure!", () => {
                        setTimeout(() => {
                            firstChoiceButton.textContent = "Restart Adventure";
                            secondChoiceButton.textContent = "Quit";

                            firstChoiceButton.onclick = restartGame;
                            secondChoiceButton.onclick = quitGame;

                            firstChoiceButton.style.display = 'inline-block';
                            secondChoiceButton.style.display = 'inline-block';

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

    let listItem9 = document.createElement('li');
    listItem9.textContent = "0 Stamina";
    scoreList.appendChild(listItem9);

    firstChoiceButton.textContent = "Restart Adventure";
    secondChoiceButton.textContent = "Quit";

    firstChoiceButton.onclick = restartGame;
    secondChoiceButton.onclick = quitGame;

    firstChoiceButton.style.display = 'inline-block';
    secondChoiceButton.style.display = 'inline-block';
}

function restartGame() {
    window.location.href = './adventure.html';
}
function quitGame() {
    window.location.href = './index.html';
}



