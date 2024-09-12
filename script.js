let score = 0;
let playerPosition = 'left';
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");
let branches = [];
let branchSides = [];

player.style.top = "400px";
player.style.left = "80px";

document.getElementById("leftBtn").addEventListener("click", () => jumpToBranch("left"));
document.getElementById("rightBtn").addEventListener("click", () => jumpToBranch("right"));

// Ініціалізуємо гру і фарбуємо першу доступну гілку
function initializeGame() {
    generateInitialBranches();
    console.log("Ініціалізуємо гру");
    console.log("Гілки після ініціалізації:", branches);
    console.log("Сторони гілок після ініціалізації:", branchSides);
}

function jumpToBranch(direction) {
    const playerTop = parseInt(player.style.top);

    console.log(`Гравець натиснув: ${direction}`);
    console.log(`Поточна позиція гравця (top): ${playerTop}px`);

    // Отримуємо індекс найближчої гілки
    const nextBranchIndex = branches.findIndex(branch => {
        const branchTop = parseInt(branch.style.top);
        return branchTop <= playerTop && branchTop >= playerTop - 80;
    });

    if (nextBranchIndex !== -1) {
        const branchClassList = branches[nextBranchIndex].classList;
        const branchTop = parseInt(branches[nextBranchIndex].style.top);

        console.log(`Гравець стрибає на гілку з класом: ${Array.from(branchClassList)} на висоті ${branchTop}px`);

        // Перевірка, чи натиснув гравець правильну стрілку
        if ((branchClassList.contains('right') && direction === 'right') ||
            (branchClassList.contains('left') && direction === 'left')) {
            console.log(`Стрибок успішний! Гравець стрибає на гілку на висоті ${branchTop}px`);

            // Чітке переміщення на гілку
            player.style.top = branchTop + "px";  // Точне позиціонування на гілку
            player.style.left = direction === 'left' ? "80px" : "160px";
            playerPosition = direction;

            score++;
            scoreDisplay.textContent = score;

            // Рухаємо гілки вниз
            moveBranchesDown();
        } else {
            console.log("Неправильна сторона. Гра закінчена.");
            alert("Game Over! Wrong side.");
            resetGame();
        }
    } else {
        console.log("Гілки для стрибка немає. Гра закінчена.");
        alert("Game Over! No branches above.");
        resetGame();
    }
}



function generateBranch() {
    const newBranch = document.createElement('div');
    newBranch.classList.add('branch');

    // Випадково вибираємо сторону (left або right)
    const branchSide = Math.random() > 0.5 ? 'left' : 'right';
    newBranch.classList.add(branchSide);
    branchSides.push(branchSide); // Зберігаємо сторону в масиві branchSides
    console.log("Згенерована нова гілка на стороні:", branchSide);

    newBranch.style.top = "0px";
    document.getElementById('tree').prepend(newBranch);
    branches.push(newBranch);
}


function moveBranchesDown() {
    branches.forEach((branch, index) => {
        const currentTop = parseInt(branch.style.top) || 0;
        const newTop = currentTop + 80; // Додамо плавний рух
        branch.style.top = newTop + "px";

        if (newTop >= 500) {
            branch.remove();
            branches.splice(index, 1);
            branchSides.splice(index, 1);
        }
    });

    generateBranch(); // Додаємо нову гілку
}


function generateInitialBranches() {
    for (let i = 0; i < 5; i++) {
        const branch = document.createElement('div');
        branch.classList.add('branch');
        const branchSide = Math.random() > 0.5 ? 'left' : 'right';
        branch.classList.add(branchSide);
        branchSides.push(branchSide);

        branch.style.top = (i * 120) + "px";  // Збільшили відстань між гілками
        document.getElementById('tree').appendChild(branch);
        branches.push(branch);
    }
}


// Скидання гри
function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    player.style.top = "400px";
    player.style.left = "80px";
    branches.forEach(branch => branch.remove());
    branches = [];
    branchSides = [];
    console.log("Гра скинута.");
    initializeGame(); // Починаємо заново
}

// Ініціалізація гри при завантаженні сторінки
initializeGame();
