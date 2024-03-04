// ფუნქცია ეკრანზე სიმბოლოების დასამატებლად
function symbol(value) {
  document.getElementById('display').value += value;
}

// შედეგის გამოსათვლელი ფუნქცია
function Equality() {
  try {
    // გამოთვლა
      const result = eval(document.getElementById('display').value);
      //ჩვენება
      document.getElementById('display').value = result;

  } catch (error) {
      document.getElementById('display').value = 'Error';
  }
}
//გასუფთავება
function clearDisplay() {
  document.getElementById('display').value = '';
}


// რენდომ ციფრი 1-10
const randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 10;
//ფუნქცია გამოცნობის შესამოწმებლად
function checkGuess() {

    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);

    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');

    //შემოწმება სისწორის
    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'გთხოვთ შეიყვანეთ ვალიდური ციფრი 1-10';
    } else {
      //მცდელობების შემცირება
        attempts--;
        //სისწორის დადგენა 
        if (guess === randomNumber) {
            message.textContent = `გილოცავ სწორია ${randomNumber} `;
            guessInput.disabled = true;
        } else {
            if (guess < randomNumber) {
                message.textContent = 'მცირეა.';
            } else {
                message.textContent = 'დიდია';
            }
            // შემოწმება ამოიწურა თუ არა მცდელობები

            if (attempts === 0) {
                message.textContent = `თამაში დასრულდა სწორი ციფრია: ${randomNumber}.3`;
                guessInput.disabled = true;
            }
        }
        //განახლება ცდის
        attemptsDisplay.textContent = attempts.toString();
    }
}



// (X ან O)
let player = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
// მოგების კომბინაციები
const Combinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


// ფუნქცია, რომელიც იღებს ინდექსს და შეამოწმებს ჩაწერილი უჯრის სტატუსს და თუ შესაბამისი უჯრი ცარიელია, შეცვლის სტატუსს
function cellClicked(index) {
    if (!cells[index]) {
        cells[index] = player;
        document.getElementsByClassName('cell')[index].innerText = player;
        if (checkWinner()) {
            document.getElementById('message-game').innerText = `${player} გაიმარჯვა!`;
            disableCells();
        } else if (checkDraw()) {
            document.getElementById('message-game').innerText = `ნიჩია!`;
            disableCells();
        } else {
          // მოთამაშეების გადართვა
            player = player === 'X' ? 'O' : 'X';
        }
    }
}



// არის თუ არა მოთამაშე მოგებული შემოწმება
function checkWinner() {
    return Combinations.some(combination => {
        return combination.every(index => {
            return cells[index] === player;
        });
    });
}

//  არის თუ არა თამაში დასრულებული
function checkDraw() {
    return cells.every(cell => cell);
}

// გამოაქვს თამაშში სასრული რეჟიმი
function disableCells() {
    Array.from(document.getElementsByClassName('cell')).forEach(cell => {
        cell.onclick = null;
    });
}
