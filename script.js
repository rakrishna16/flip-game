const start = document.getElementById("start");
const cardb = document.getElementById("card-display");
const message = document.getElementById("card-message");
const restart = document.getElementById("restart");

let clickedValues = [];
//let options = ["","","","","","","","","","","",""];
let checids = [];
//let currentClick = "1";
//let active = 0;
let running = false;

startGame();

function shuffleArray(arr) {
  arr.sort(() => Math.random() - 0.5);
}
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
shuffleArray(arr);

function startG() {
  document.getElementById("start").style.display = "none";
  for (let g = 0; g < arr.length; g++) {
    // Step 1: Append the card element to the div
    const divc = document.createElement("div");
    divc.className = "card";
    divc.cardindex = "0";
    divc.setAttribute("data-revealed", "false");
    divc.id = `img-${g}`;
    divc.setAttribute("cardIndex", arr[g]);
    cardb.appendChild(divc);

    // Step 2: Append the img element to the div
    const img = document.createElement("img");
    img.src = `assets/${arr[g]}.jpg`; // Replace with your image URL
    img.alt = "Butterfly";
    const div = document.getElementById(`img-${g}`);
    div.appendChild(img);

    // Step 3: Append the overlay element to the div
    const popover_t = document.createElement("div");
    popover_t.className = "overlay";
    popover_t.id = `mypopover`;
    divc.appendChild(popover_t);
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((ele) => ele.addEventListener("click", clickingCard));
  running = true;
}

function startGame() {
  start.addEventListener("click", startG);
}

function indexDuplicates(clickedValues) {
  return [...new Set(clickedValues)];
}

function clickingCard() {
  const cardId = this.id;
  const cjildrem = document.getElementById(cardId).children;
  // const cardIndex = this.getAttribute("cardIndex");
  // const revealed = this.getAttribute("data-revealed");
  cjildrem[1].style.opacity = "0";
  running = true;
  checids.push(cardId);
  checkWin();
}

function checkWin() {
  let win = false;

  if (checids.length == 2) {
    const kir = document.getElementById(checids[0]).getAttribute("cardIndex");
    const kir_two = document
      .getElementById(checids[1])
      .getAttribute("cardIndex");

    const cjildrem_u = document.getElementById(checids[0]).children;
    const cjildrem_uu = document.getElementById(checids[1]).children;
    if (kir === kir_two) {
      clickedValues.push(kir);
      cjildrem_u[1].style.opacity = "0";
      cjildrem_uu[1].style.opacity = "0";
      while (checids.length) {
        checids.pop();
      }
      if (clickedValues.length == 6) {
        alert(`your Win 😍!`);
        win = true;
      }
    } else {
      while (checids.length) {
        checids.pop();
      }
      setTimeout(() => {
        cjildrem_u[1].style.opacity = "1";
        cjildrem_uu[1].style.opacity = "1";
        return;
      }, 500);
    }
  }
  if (win) {
    message.textContent = `Your Win 😍!`;
    setTimeout(() => {
      location.reload();
      return;
    }, 2000);
    running = false;
  }
}
