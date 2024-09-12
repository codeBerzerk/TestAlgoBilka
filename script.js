let playerPosition = 'left'; // Player starts on the left side
let branches = [];
const tree = document.getElementById('tree');
const player = document.getElementById('player');

// Initialize branches
function generateBranches() {
    for (let i = 0; i < 5; i++) {
        let side = Math.random() > 0.5 ? 'left' : 'right';
        let branch = document.createElement('div');
        branch.classList.add('branch', side);
        branch.style.top = `${i * 60 + 50}px`; // 60px between each branch
        tree.appendChild(branch);
        branches.push(branch);
    }
}

// Check if player jumped on correct side
function chopTree(side) {
    const currentBranch = branches[branches.length - 1];
    const correctSide = currentBranch.classList.contains(side);

    if (correctSide) {
        movePlayer(side);
        currentBranch.remove();
        branches.pop();

        // Generate a new branch at the top
        let newSide = Math.random() > 0.5 ? 'left' : 'right';
        let newBranch = document.createElement('div');
        newBranch.classList.add('branch', newSide);
        newBranch.style.top = '50px';
        tree.appendChild(newBranch);
        branches.unshift(newBranch);

        // Move existing branches down
        branches.forEach((branch, index) => {
            branch.style.top = `${index * 60 + 50}px`;
        });
    } else {
        alert('You lost');
        resetGame();
    }
}

// Move player to left or right of the tree
function movePlayer(side) {
    if (side === 'left') {
        player.style.left = '-40px';  // Move player to the left of the tree
        player.style.right = 'auto';
    } else {
        player.style.left = 'auto';
        player.style.right = '-40px';  // Move player to the right of the tree
    }
}

// Reset game
function resetGame() {
    branches.forEach(branch => branch.remove());
    branches = [];
    generateBranches();
    player.style.left = '-40px'; // Player starts on the left again
    player.style.right = 'auto';
    playerPosition = 'left';
}

// Event listeners for buttons
document.getElementById('leftBtn').addEventListener('click', () => chopTree('left'));
document.getElementById('rightBtn').addEventListener('click', () => chopTree('right'));

// Start the game
generateBranches();