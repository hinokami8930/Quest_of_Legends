// Get elements
const startBtn = document.getElementById('start-btn');
const instructionsBtn = document.getElementById('instructions-btn');
const startPage = document.getElementById('start-page');
const gameContainer = document.getElementById('game-container');
const characterCreation = document.getElementById('character-creation');
const gameScreen = document.getElementById('game-screen');
const createCharacterBtn = document.getElementById('create-character-btn');
const playerNameInput = document.getElementById('player-name');
const errorMsg = document.getElementById('error-msg');
const classOptions = document.querySelectorAll('.class-option');

const battleArea = document.getElementById('battle-area');
const explorationArea = document.getElementById('exploration-area');
const gameOverScreen = document.getElementById('game-over-screen');
const exploreBtn = document.getElementById('explore-btn');
const restBtn = document.getElementById('rest-btn');
const attackBtn = document.getElementById('attack-btn');
const defendBtn = document.getElementById('defend-btn');
const runBtn = document.getElementById('run-btn');
const restartBtn = document.getElementById('restart-btn');
const battleMessage = document.getElementById('battle-message');
const saveBtn = document.getElementById('save-btn');
const loadBtn = document.getElementById('load-btn');

// Player object
let player = {
    name: '',
    class: '',
    hp: 0,
    maxHp: 0,
    attack: 0,
    defense: 0,
    gold: 0,
    level: 1
};

let selectedClass = '';

// Enemy object
let enemy = {
    name: '',
    hp: 0,
    maxHp: 0,
    attack: 0,
    goldReward: 0,
    expReward: 0
};

let playerDefending = false;
let playerExp = 0;
let expToLevel = 100;

// Enemy types
const enemyTypes = [
    { name: 'Gloomfang', hp: 50, attack: 8, gold: 15, exp: 20 },
    { name: 'Emberclaw', hp: 75, attack: 12, gold: 25, exp: 35 },
    { name: 'Frostwhisper', hp: 60, attack: 10, gold: 20, exp: 28 },
    { name: 'Thornshade', hp: 40, attack: 6, gold: 10, exp: 15 },
    { name: 'Voidcrawler', hp: 90, attack: 15, gold: 40, exp: 50 },
    { name: 'Sparkwing', hp: 45, attack: 7, gold: 12, exp: 18 },
    { name: 'Mudgrumble', hp: 80, attack: 13, gold: 30, exp: 40 },
    { name: 'Crystalspine', hp: 65, attack: 11, gold: 22, exp: 30 },
    { name: 'Shadowpounce', hp: 55, attack: 9, gold: 18, exp: 25 },
    { name: 'Stormhowler', hp: 100, attack: 18, gold: 50, exp: 60 },
    { name: 'Gloomfang Lvl 2', hp: 150, attack: 25, gold: 15, exp: 20 },
    { name: 'Emberclaw Lvl 2', hp: 175, attack: 38, gold: 25, exp: 80 },
    { name: 'Frostwhisper Lvl 2', hp: 160, attack: 30, gold: 20, exp: 120 },
    { name: 'Thornshade Lvl 2', hp: 140, attack: 20, gold: 10, exp: 95 },
    { name: 'Voidcrawler Lvl 2', hp: 190, attack: 50, gold: 40, exp: 65 },
    { name: 'Sparkwing Lvl 2', hp: 145, attack: 22, gold: 12, exp: 180 },
    { name: 'Mudgrumble Lvl 2', hp: 180, attack: 42, gold: 30, exp: 70 },
    { name: 'Crystalspine Lvl 2', hp: 165, attack: 35, gold: 22, exp: 140 },
    { name: 'Shadowpounce Lvl 2', hp: 155, attack: 28, gold: 18, exp: 85 },
    { name: 'Stormhowler', hp: 200, attack: 155, gold: 55, exp: 200 },
    { name: 'Terrasque', hp: 676, attack: 92, gold: 155000, exp: 155000 }
];

// Start button click
startBtn.addEventListener('click', function() {
    startPage.style.display = 'none';
    gameContainer.style.display = 'block';
});

// Instructions button click
instructionsBtn.addEventListener('click', function() {
    alert('The point of this game is to battle monsters, earn gold, and level up.');
});

// Class selection
classOptions.forEach(option => {
    option.addEventListener('click', function() {
        classOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        selectedClass = this.getAttribute('data-class');
        checkIfReady();
    });
});

// Check name input
playerNameInput.addEventListener('input', function() {
    checkIfReady();
});

// Check if ready to create character
function checkIfReady() {
    if (playerNameInput.value.trim() !== '' && selectedClass !== '') {
        createCharacterBtn.disabled = false;
        errorMsg.textContent = '';
    } else {
        createCharacterBtn.disabled = true;
    }
}

// Create character button
createCharacterBtn.addEventListener('click', function() {
    const name = playerNameInput.value.trim();
    
    if (name === '') {
        errorMsg.textContent = 'Please enter a name!';
        return;
    }
    
    if (selectedClass === '') {
        errorMsg.textContent = 'Please select a class!';
        return;
    }
    
    player.name = name;
    player.class = selectedClass;
    
    if (selectedClass === 'warrior') {
        player.maxHp = 200;
        player.hp = 200;
        player.attack = 20;
        player.defense = 15;
    } else if (selectedClass === 'mage') {
        player.maxHp = 80;
        player.hp = 80;
        player.attack = 20;
        player.defense = 5;
    } else if (selectedClass === 'archer') {
        player.maxHp = 100;
        player.hp = 100;
        player.attack = 18;
        player.defense = 7;
    } else if (selectedClass === 'overlord') {
        player.maxHp = 300;
        player.hp = 300;
        player.attack = 50;
        player.defense = 20;
    } else if (selectedClass === 'grandmaster') {
        player.maxHp = 250;
        player.hp = 250;
        player.attack = 500;
        player.defense = 500;
    }
    
    startGame();
});

// Function to start the game
function startGame() {
    characterCreation.style.display = 'none';
    gameScreen.style.display = 'block';
    
    player.gold = 0;
    player.level = 1;
    
    updateHUD();
    
    const welcomeMsg = document.getElementById('welcome-msg');
    welcomeMsg.textContent = `Welcome, ${player.class.charAt(0).toUpperCase() + player.class.slice(1)} ${player.name}!`;
    
    console.log('Character created:', player);
}

// Function to update HUD
function updateHUD() {
    document.getElementById('character-info').textContent = 
        `${player.name} - ${player.class.charAt(0).toUpperCase() + player.class.slice(1)}`;
    
    const healthPercent = (player.hp / player.maxHp) * 100;
    const healthBar = document.getElementById('health-bar');
    healthBar.style.width = healthPercent + '%';
    
    if (healthPercent > 50) {
        healthBar.style.backgroundColor = '#2ecc71';
    } else if (healthPercent > 25) {
        healthBar.style.backgroundColor = '#f39c12';
    } else {
        healthBar.style.backgroundColor = '#e74c3c';
    }
    
    document.getElementById('hp-text').textContent = `${player.hp}/${player.maxHp}`;
    
    document.getElementById('attack-stat').textContent = player.attack;
    document.getElementById('defense-stat').textContent = player.defense;
    document.getElementById('gold-stat').textContent = player.gold;
    document.getElementById('level-stat').textContent = player.level;
}

// Explore button
exploreBtn.addEventListener('click', function() {
    startBattle();
});

// Rest button
restBtn.addEventListener('click', function() {
    if (player.hp === player.maxHp) {
        showMessage('You are already at full health!');
    } else {
        const healAmount = Math.floor(player.maxHp * 0.5);
        player.hp = Math.min(player.hp + healAmount, player.maxHp);
        updateHUD();
        showMessage(`You rest and recover ${healAmount} HP!`);
    }
});

// Save button
saveBtn.addEventListener('click', function() {
    saveGame();
});

// Load button
loadBtn.addEventListener('click', function() {
    loadGame();
});

// Attack button
attackBtn.addEventListener('click', function() {
    if (!this.disabled) {
        disableBattleButtons();
        playerAttack();
    }
});

// Defend button
defendBtn.addEventListener('click', function() {
    if (!this.disabled) {
        disableBattleButtons();
        playerDefending = true;
        showMessage('You brace yourself for the enemy attack!');
        setTimeout(enemyTurn, 1500);
    }
});

// Run button
runBtn.addEventListener('click', function() {
    if (!this.disabled) {
        disableBattleButtons();
        const runChance = Math.random();
        if (runChance > 50) {
            showMessage('You successfully escaped!');
            setTimeout(endBattle, 1500);
        } else {
            showMessage('You failed to escape!');
            setTimeout(enemyTurn, 1500);
        }
    }
});

// Restart button
restartBtn.addEventListener('click', function() {
    location.reload();
});

// Start battle
function startBattle() {
    const randomEnemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    
    enemy.name = randomEnemy.name;
    enemy.maxHp = randomEnemy.hp;
    enemy.hp = randomEnemy.hp;
    enemy.attack = randomEnemy.attack;
    enemy.goldReward = randomEnemy.gold;
    enemy.expReward = randomEnemy.exp;
    
    document.getElementById('enemy-name').textContent = enemy.name;
    updateEnemyHealth();
    
    explorationArea.style.display = 'none';
    battleArea.style.display = 'block';
    
    showMessage(`A wild ${enemy.name} appears!`);
    enableBattleButtons();
}

// Player attack
function playerAttack() {
    const damage = player.attack + Math.floor(Math.random() * 5);
    enemy.hp -= damage;
    enemy.hp = Math.max(0, enemy.hp);
    
    updateEnemyHealth();
    showMessage(`You attack for ${damage} damage!`);
    
    if (enemy.hp <= 0) {
        setTimeout(winBattle, 1500);
    } else {
        setTimeout(enemyTurn, 1500);
    }
}

// Enemy turn
function enemyTurn() {
    let damage = enemy.attack + Math.floor(Math.random() * 3);
    
    if (playerDefending) {
        damage = Math.floor(damage - player.defense);
        showMessage(`${enemy.name} attacks! You block and take ${damage} damage!`);
        playerDefending = false;
    } else {
        showMessage(`${enemy.name} attacks for ${damage} damage!`);
    }
    
    player.hp -= damage;
    player.hp = Math.max(0, player.hp);
    updateHUD();
    
    if (player.hp <= 0) {
        setTimeout(gameOver, 1500);
    } else {
        enableBattleButtons();
    }
}

// Win battle
function winBattle() {
    player.gold += enemy.goldReward;
    playerExp += enemy.expReward;
    
    showMessage(`You defeated the ${enemy.name}! Gained ${enemy.goldReward} gold and ${enemy.expReward} EXP!`);
    
    if (playerExp >= expToLevel) {
        levelUp();
    }
    
    updateHUD();
    setTimeout(endBattle, 2500);
}

// Level up
function levelUp() {
    player.level++;
    playerExp -= expToLevel;
    expToLevel = Math.floor(expToLevel += 10);
    
    player.maxHp += 100;
    player.hp = player.maxHp;
    player.attack += 10;
    player.defense += 10;
    
    showMessage(`🌟 LEVEL UP! You are now level ${player.level}!`);
    updateHUD();

    if (playerExp >= expToLevel) {
        levelUp();
    }
}

// End battle
function endBattle() {
    battleArea.style.display = 'none';
    explorationArea.style.display = 'block';
}

// Game over
function gameOver() {
    battleArea.style.display = 'none';
    explorationArea.style.display = 'none';
    gameOverScreen.style.display = 'block';
    
    document.getElementById('game-over-message').textContent = 
        `You were defeated at level ${player.level} with ${player.gold} gold.`;
}

// Update enemy health
function updateEnemyHealth() {
    const healthPercent = (enemy.hp / enemy.maxHp) * 100;
    document.getElementById('enemy-health-bar').style.width = healthPercent + '%';
    document.getElementById('enemy-hp-text').textContent = `${enemy.hp}/${enemy.maxHp}`;
}

// Show message
function showMessage(message) {
    battleMessage.textContent = message;
}

// Disable battle buttons
function disableBattleButtons() {
    attackBtn.disabled = true;
    defendBtn.disabled = true;
    runBtn.disabled = true;
}

// Enable battle buttons
function enableBattleButtons() {
    attackBtn.disabled = false;
    defendBtn.disabled = false;
    runBtn.disabled = false;
}

// Save game
function saveGame() {
    const saveData = {
        player: player,
        playerExp: playerExp,
        expToLevel: expToLevel
    };
    
    localStorage.setItem('rpgSaveData', JSON.stringify(saveData));
    alert('Game saved successfully!');
}

// Load game
function loadGame() {
    const savedData = localStorage.getItem('rpgSaveData');
    
    if (savedData) {
        const loadedData = JSON.parse(savedData);
        
        player = loadedData.player;
        playerExp = loadedData.playerExp;
        expToLevel = loadedData.expToLevel;
        
        updateHUD();
        alert('Game loaded successfully!');
    } else {
        alert('No saved game found!');
    }
}
