let selectedInput = null;
let disable = true

function getRandomSolution() {
    const keys = Object.keys(solutions);  
    const randomKey = keys[Math.floor(Math.random() * keys.length)]; 
    return solutions[randomKey]; 
}

let inputCreation = () => {
    $('.box').each(function () {
        for (let i = 0; i < 9; i++) {
            $(this).append('<input type="text">');
        }

        $("input").prop("readonly", true);
    });
};

let pickBox = () => {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('click', function () {
            selectedInput = this;
            clearHighlights();
            this.style.border = "5px solid aqua";
        });
    });
};

let inputNumbers = () => {
    document.querySelectorAll('.num').forEach(function (button) {
        button.addEventListener('click', function () {
            selectedInput.value = this.textContent;
            validateBoard();
        });
    });
};

let clearInputed = () => {
    let button = document.querySelector('.clear');
    button.addEventListener('click', function () {
        selectedInput.value = "";
        validateBoard();
    });
};

let clearHighlights = () => {
    document.querySelectorAll('input').forEach(input => {
        input.style.border = "";
        input.style.backgroundColor = "";
    });
};

let num1to9Checker = () => {
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function (e) {
            let value = e.target.value;
            if (!/^[1-9]$/.test(value)) {
                e.target.value = '';
            }
            validateBoard();
        });
    });
};

let puzzle = [...getRandomSolution()];

const generatePuzzle = (numClues) => {

    let puzzle = [...getRandomSolution()];
    const emptyCells = 81 - numClues;
    const indices = Array.from(Array(81).keys());


    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }


    for (let i = 0; i < emptyCells; i++) {
        puzzle[indices[i]] = '';
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.value = puzzle[index];
        if (puzzle[index] !== '') {
            input.setAttribute('disabled', true);
            input.style.backgroundColor = "#d3d3d3";
        } else {
            input.removeAttribute('disabled');
            input.style.backgroundColor = "";
        }
    });
};

let InvalidAlert = () => {
    $('.alert').slideDown()
    setTimeout(() => {
        $('.alert').slideUp()
    }, 2000)
}
// Validate the Sudoku board
let validateBoard = () => {
    let inputs = document.querySelectorAll('input');
    let grid = [];

    inputs.forEach((input, index) => {
        grid[index] = input.value === '' ? null : parseInt(input.value);
    });

    clearHighlights();  // Reset highlights before validation

    // Check for duplicates and highlight if invalid
    let invalidInputs = findInvalidInputs(grid);

    if (invalidInputs.length > 0) {

        if (selectedInput) {
            InvalidAlert()
            selectedInput.style.backgroundColor = "red";
        } else {
            selectedInput.style.backgroundColor = "";
        }

    }
};

const findInvalidInputs = (grid) => {
    let invalidIndices = [];
    let seen = new Set();

    for (let row = 0; row < 9; row++) {
        seen.clear();
        for (let col = 0; col < 9; col++) {
            let num = grid[row * 9 + col];
            if (num && seen.has(num)) {
                invalidIndices.push(row * 9 + col);
                invalidIndices.push(grid[row * 9 + seen[num]]);
            } else {
                seen.add(num);
            }
        }
    }

    for (let col = 0; col < 9; col++) {
        seen.clear();
        for (let row = 0; row < 9; row++) {
            let num = grid[row * 9 + col];
            if (num && seen.has(num)) {
                invalidIndices.push(row * 9 + col);
                invalidIndices.push(grid[seen[num] * 9 + col]);
            } else {
                seen.add(num);
            }
        }
    }


    for (let gridRow = 0; gridRow < 3; gridRow++) {
        for (let gridCol = 0; gridCol < 3; gridCol++) {
            seen.clear();
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    let num = grid[(gridRow * 3 + row) * 9 + (gridCol * 3 + col)];
                    if (num && seen.has(num)) {
                        invalidIndices.push((gridRow * 3 + row) * 9 + (gridCol * 3 + col));
                        invalidIndices.push(seen[num]);
                    } else {
                        seen.add(num);
                    }
                }
            }
        }
    }

    return [...new Set(invalidIndices)]; // Return unique indices
};



let solvePuzzle = () => {
    const inputs = document.querySelectorAll('input');
    const solution = getRandomSolution();
    inputs.forEach((input, index) => {
        const correctValue = solution[index];


        input.value = correctValue;

        if (input.hasAttribute('disabled')) {
            input.style.backgroundColor = "#d3d3d3";
        } else {
            input.style.backgroundColor = "#f0f8ff";
        }
        input.setAttribute('disabled', true);
    });
};




let disabled = () => {
    const buttons = document.querySelectorAll('.numbtn button');
    buttons.forEach((button) => {
        if (disable) {
            button.setAttribute('disabled', true);
        } else {
            button.removeAttribute('disabled');
        }
    });
    disable = !disable;
}
let userAnswer = () => {
    let inputs = document.querySelectorAll('input');
    let userAnswers = []
    let isCorrect = true;

    inputs.forEach((input, index) => {
        const userValue = input.value;

        userAnswers.push(userValue);

        let foundCorrect = false;

        for (const key in solutions) {
            const correctValue = solutions[key][index]; 

            if (parseInt(userValue) === correctValue) {
                foundCorrect = true; 
                input.style.backgroundColor = "#b3ecd8"; 
                break; 
            }
        }

        
        if (!foundCorrect) {
            input.style.backgroundColor = "#ffcccb"; 
            isCorrect = false;
        }
    });


    if (isCorrect) {
        $(".word").text("Congratulations, all answers are correct!");
    } else {
        $(".word").text("Some answers are wrong.");
    }

    return userAnswers.toString();
};
