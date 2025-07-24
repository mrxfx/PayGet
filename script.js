const upiID = "rahulhaldar15@fam";
const botURL = "/sendToTelegram.php";
let countdown;

function formatTimeLeft(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function generateQR(amount) {
  const txnId = "TXN" + Date.now();
  const upiLink = `upi://pay?pa=${upiID}&pn=IG+LIKE+HUB&am=${amount}&cu=INR&tn=${txnId}`;
  const qr = new QRious({
    element: document.getElementById("qrcode"),
    value: upiLink,
    size: 250,
  });

  document.getElementById("txnId").innerText = "Transaction ID: " + txnId;
  document.getElementById("status").innerText = "Waiting for payment...";
  startCountdown(300); // 5 minutes

  // Send Telegram alert
  fetch(botURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      txnId,
      upiID,
      time: new Date().toLocaleString()
    }),
  });
}

function startCountdown(seconds) {
  clearInterval(countdown);

  countdown = setInterval(() => {
    document.getElementById("timer").innerText = "⏱ " + formatTimeLeft(seconds);

    if (seconds <= 0) {
      clearInterval(countdown);
      document.getElementById("timer").innerText = "❌ Expired";
      document.getElementById("status").innerText = "⛔ Payment window expired";
    }

    seconds--;
  }, 1000);
}

function openUpiApp() {
  const txnIdText = document.getElementById("txnId").innerText;
  const amount = document.querySelector(".amount-selector button.active")?.innerText?.replace("₹", "") || "10";
  const txnId = txnIdText.replace("Transaction ID: ", "").trim();
  const upiLink = `upi://pay?pa=${upiID}&pn=IG+LIKE+HUB&am=${amount}&cu=INR&tn=${txnId}`;
  window.location.href = upiLink;
}
