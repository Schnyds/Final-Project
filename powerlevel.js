let powerLevel = 100; 

function updatePowerLevel() {
    const powerLevelElement = document.getElementById("power-level");
    powerLevelElement.style.width = powerLevel + "%";

    if (powerLevel <= 20) {
        powerLevelElement.style.backgroundColor = "red"; 
    } else if (powerLevel <= 50) {
        powerLevelElement.style.backgroundColor = "yellow"; 
    } else {
        powerLevelElement.style.backgroundColor = "green"; 
    }
}

function decreasePowerLevel(amount) {
    powerLevel -= amount;
    if (powerLevel < 0) powerLevel = 0;
    updatePowerLevel();
    checkGameOver();
}

function increasePowerLevel(amount) {
    powerLevel += amount;
    if (powerLevel > 100) powerLevel = 100;
    updatePowerLevel();
}

function checkGameOver() {
    if (powerLevel <= 0) {
        document.getElementById("question").textContent = "Game Over! Your power supply is depleted.";
        document.getElementById("choices").innerHTML = "";
        document.getElementById("next").style.display = "none";
    }
}

updatePowerLevel();