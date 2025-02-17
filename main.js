//랜덤번호 지정
//유저가 번호를 입력한다. 그리고 go 라는 버튼을 누름
//만약 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down!!
// 랜덤번호가 > 유저번호 Up!!
//Reset 버튼을 누르면 게임이 리셋된다
//3번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
// 유저가 1~100범위 밖의 숫자를 입력하면 알려준다. 기회를 깎지 않는다
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깎지 않는다

let computerNumber = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.querySelector(".button-reset");
let userInput = document.querySelector("#user-input");
let resultAreaImg = document.querySelector(".main-img");
let resultText = document.querySelector(".result-text");
let chanceArea = document.getElementById("chance-area");
let gameOver = false;
let chances = 3; // 남은 기회
let userValueList = [];

chanceArea.innerHTML = `남은 기회: ${chances}`;
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", focusInput);

function pickRandomNumber() {
  computerNumber = Math.floor(Math.random() * 100) + 1;
  console.log(`정답: ${computerNumber}`);
}

function play() {
  const userValue = Number(userInput.value); // 숫자로 변환

  if (userValue < 1 || userValue > 100) {
    resultText.textContent = "1 이상, 100 이하의 숫자를 입력해주세요.";
    return;
  }

  if (userValueList.includes(userValue)) {
    resultText.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
    return;
  }

  chances--;
  chanceArea.innerHTML = `남은 기회: ${chances}`;
  userValueList.push(userValue);

  if (userValue < computerNumber) {
    resultText.textContent = "Up!";
  } else if (userValue > computerNumber) {
    resultText.textContent = "Down!";
  } else {
    resultText.textContent = "정답!";
    gameOver = true;
  }

  if (chances === 0) {
    gameOver = true;
    resultText.textContent = `게임 오버! 정답은 ${computerNumber}입니다.`;
  }

  if (gameOver) {
    playButton.disabled = true;
    return;
  }
}

function focusInput() {
  userInput.value = "";
}

function reset() {
  pickRandomNumber();
  userInput.value = "";
  gameOver = false;
  playButton.disabled = false;
  chances = 5;
  chanceArea.innerHTML = `남은 기회: ${chances}`;
  userValueList = [];
  resultText.textContent = ""; // 결과 메시지 초기화
}

pickRandomNumber();
