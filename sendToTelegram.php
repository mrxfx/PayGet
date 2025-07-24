<?php
// Injected with your tokens:
$botToken = "8110576123:AAGcr5oyqGUtwKij212XreiR0gzZjaaENtg";
$chatId = "7700387826";

$data = json_decode(file_get_contents('php://input'), true);
$msg = urlencode("🧾 New Payment Request\n💰 Amount: ₹{$data['amount']}\n🔗 UPI ID: {$data['upiID']}\n🆔 TXN ID: {$data['txnId']}\n🕒 Time: {$data['time']}");
file_get_contents("https://api.telegram.org/bot{$botToken}/sendMessage?chat_id={$chatId}&text={$msg}");
http_response_code(200);