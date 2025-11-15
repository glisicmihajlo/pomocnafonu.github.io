<?php
header("Access-Control-Allow-Origin: *"); // Ovo dozvoljava poziv sa bilo kog domena
header('Content-Type: application/json');

// Unesi svoj VdoCipher API Secret Key
$apiSecret = "uSVhYApIkFZO68cxx1s6YJ3ISqp5pKpDMNXKpKfRbtIyoRZgQXdf7HFnEHCu89L6";

// Uzmi video ID iz URL-a
$videoId = $_GET['videoId'];

// Pripremi zahtev ka VdoCipher API-ju
$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => "https://dev.vdocipher.com/api/videos/$videoId/otp",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Authorization: Apisecret $apiSecret"
  ],
]);

$response = curl_exec($curl);
curl_close($curl);

// Vrati OTP i playbackInfo klijentu
header('Content-Type: application/json');
echo $response;
?>
