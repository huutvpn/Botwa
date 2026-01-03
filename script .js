let balance = 1000;
const bet = 100;

const symbols = ["🍒", "🍋", "🍊", "⭐", "💎"];

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
  if (balance < bet) {
    document.getElementById("result").innerText = "Saldo habis!";
    return;
  }

  balance -= bet;

  let s1 = randomSymbol();
  let s2 = randomSymbol();
  let s3 = randomSymbol();

  document.getElementById("slot1").innerText = s1;
  document.getElementById("slot2").innerText = s2;
  document.getElementById("slot3").innerText = s3;

  if (s1 === s2 && s2 === s3) {
    balance += 500;
    document.getElementById("result").innerText = "🎉 MENANG BESAR!";
  } else {
    document.getElementById("result").innerText = "😢 Kalah, coba lagi!";
  }

  document.getElementById("balance").innerText = balance;
}