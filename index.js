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

let left = 15;
let right = 45;

// 숫자 만들기
for (let i = 0; i < 6; i++) {
  const numBox = document.createElement("div");
  numBox.classList.add("num-box");
  numBox.style.transform = `rotate(${i * 30}deg)`;

  const spanLeft = document.createElement("span");
  const spanRight = document.createElement("span");

  const leftText = left - 5 * i;
  spanLeft.textContent = leftText < 0 ? 60 + leftText : leftText;
  spanRight.textContent = right - 5 * i;

  spanLeft.style.transform = `rotate(${-30 * i}deg)`;
  spanRight.style.transform = `rotate(${-30 * i}deg)`;

  numBox.append(spanLeft, spanRight);
  nums.append(numBox);
}

// 남은시간 영역
const endTime = 40;

for (let min = 0; min < endTime; min++) {
  for (let sec = 0; sec < 60; sec++) {
    const remainFin = document.createElement("div");
    remainFin.classList.add("fin");

    const deg = min * 6 + sec * 0.1;
    remainFin.style.transform = `rotate(${-deg}deg)`;

    fins.append(remainFin);
  }
}
