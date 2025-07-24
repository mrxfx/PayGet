const generateBtn = document.getElementById("generate");
const payBtn = document.getElementById("payBtn");
const qrCode = document.getElementById("qr-code");
const timerText = document.getElementById("timer");
const statusText = document.getElementById("status");
const paymentInfo = document.getElementById("payment-info");

let countdown;

generateBtn.addEventListener("click", () => {
  const amount = document.getElementById("amount").value;
  const upiId = "rahulhaldar15@fam";
  const payeeName = "Rahul";
  const transactionNote = "Payment Confirm";

  const upiLink = `upi://pay?pa=${upiId}&pn=${payeeName}&tn=${transactionNote}&am=${amount}&cu=INR`;

  // Generate QR code using Google Chart API
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${encodeURIComponent(upiLink)}`;
  qrCode.src = qrUrl;

  paymentInfo.classList.remove("hidden");
  payBtn.disabled = false;
  statusText.textContent = "✅ Waiting for Payment";

  startCountdown(5 * 60); // 5 minutes
});

payBtn.addEventListener("click", () => {
  const amount = document.getElementById("amount").value;
  const upiLink = `upi://pay?pa=rahulhaldar15@fam&pn=Rahul&tn=Payment Confirm&am=${amount}&cu=INR`;
  window.location.href = upiLink;
});

function startCountdown(seconds) {
  clearInterval(countdown);

  countdown = setInterval(() => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    timerText.textContent = `⏱ ${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;

    if (seconds <= 0) {
      clearInterval(countdown);
      timerText.textContent = "❌ Expired";
      statusText.textContent = "❌ Payment window expired";
      payBtn.disabled = true;
    }

    seconds--;
  }, 1000);
}
