const timer = document.getElementById("timer");
const lines = timer.querySelector("#lines");
const nums = timer.querySelector("#num-container");
const fins = timer.querySelector("#fins");

// 눈금 만들기
for (let i = 0; i < 30; i++) {
  const line = document.createElement("div");
  line.classList.add("line");
  line.style.transform = `rotate(${i * 6}deg)`;

  if (i % 5 == 0) {
    line.classList.add("thick");
  }

  lines.append(line);
}

let left = 0;
let right = 30;

// 숫자 만들기
for (let i = 0; i < 6; i++) {
  const numBox = document.createElement("div");
  numBox.classList.add("num-box");

  const rotation = (i + 3) * 30;
  numBox.style.transform = `rotate(${rotation}deg)`;

  const spanLeft = document.createElement("span");
  const spanRight = document.createElement("span");

  const leftText = left + 5 * i;
  spanLeft.textContent = leftText < 0 ? 60 + leftText : leftText;
  spanRight.textContent = right + 5 * i;

  spanLeft.style.transform = `rotate(${-rotation}deg)`;
  spanRight.style.transform = `rotate(${-rotation}deg)`;

  numBox.append(spanLeft, spanRight);
  nums.append(numBox);
}

// 클릭한 버튼에 따라 endTime 값을 변경하도록 수정
let endTime = 0; // 기본 값

const updateEndTime = (minutes) => {
  endTime = minutes;
  updateRemainingTime(); // 설정 변경 시 남은시간 업데이트
};

// 남은시간 영역 업데이트 함수
const updateRemainingTime = () => {
  fins.innerHTML = "";

  for (let min = 0; min < endTime; min++) {
    for (let sec = 0; sec < 60; sec++) {
      const remainFin = document.createElement("div");
      remainFin.classList.add("fin");

      const deg = min * 6 + sec * 0.1;
      remainFin.style.transform = `rotate(${deg}deg)`;

      fins.append(remainFin);
    }
  }
};

const setActiveButton = (minutes) => {
  const activeButton = document.querySelector(".btn.active");
  if (activeButton) {
    activeButton.classList.remove("active");
  }

  const clickedButton = document.querySelector(
    `.btn[data-minutes="${minutes}"]`
  );
  if (clickedButton) {
    clickedButton.classList.add("active");
  }
};

const startTimer = () => {
  const activeButton = document.querySelector(".btn.active");
  if (activeButton) {
    const minutes = parseInt(activeButton.getAttribute("data-minutes"));
    updateEndTime(minutes);
    setActiveButton(minutes);

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      tickSec();

      const startButtonIcon = document.querySelector(
        ".control-btn #start-btn i"
      );
      if (startButtonIcon) {
        startButtonIcon.classList.add("active");
      }
    }, 1000);
  }
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

// 함수를 통해 재사용 가능한 코드 작성
const createButtons = () => {
  const buttonContainer = document.querySelector(".btn-container");
  const buttonMinutes = [10, 30, 50, 60];

  buttonMinutes.forEach((minutes) => {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = `${minutes}분`;
    button.setAttribute("data-minutes", minutes);

    button.onclick = () => {
      updateEndTime(minutes);
      setActiveButton(minutes);
    };

    buttonContainer.appendChild(button);
  });
};

createButtons();

const startButton = document.querySelector(".control-btn #start-btn");
const stopButton = document.querySelector(".control-btn #pause-btn");

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);

let timerInterval;

let lastFin;
const tickSec = () => {
  if (lastFin) {
    lastFin.remove();
  }

  lastFin = fins.lastChild.cloneNode(true);
  fins.removeChild(fins.lastChild);
};
