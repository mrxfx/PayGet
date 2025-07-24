const upiID = "rahulhaldar15@fam";
const botURL = "/sendToTelegram.php";

function formatAMPM(date) { /* time formatting */ }

function generateQR(amount) {
  const txnId = "TXN" + Date.now();
  const upiLink = `upi://pay?pa=${upiID}&pn=IG+LIKE+HUB&am=${amount}&cu=INR&tn=${txnId}`;
  new QRious({ element: document.getElementById("qrcode"), value: upiLink, size: 250 });
  document.getElementById("txnId").innerText = "Transaction ID: " + txnId;
  document.getElementById("qrSection").classList.add("visible");

  fetch(botURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, txnId, upiID, time: formatAMPM(new Date()) })
  });
}