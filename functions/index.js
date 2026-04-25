const { onCall, HttpsError } = require("firebase-functions/v2/https");
const axios = require("axios");

exports.getVideoAuth = onCall(async (request) => {
    if (!request.auth) {
        throw new HttpsError('unauthenticated', 'Moraš biti ulogovan.');
    }

    const videoId = request.data.videoId;
    const userEmail = request.auth.token.email;

    try {
        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            {
                "ttl": 3600,
                "annotate": JSON.stringify([
                    {
                        "type": "rtext", // Random tekst koji se pomera
                        "text": userEmail,
                        "alpha": 0.7,
                        "color": "0xFF0000", // Jarko crvena boja
                        "size": 25,
                        "interval": 5000 // Menja poziciju na svakih 5 sekundi
                    }
                ])
            },
            {
                headers: {
                    'Authorization': `Apisecret uSVhYApIkFZO68cxx1s6YJ3ISqp5pKpDMNXKpKfRbtIyoRZgQXdf7HFnEHCu89L6`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            otp: response.data.otp,
            playbackInfo: response.data.playbackInfo
        };
    } catch (error) {
        console.error("VdoCipher Error:", error.response ? error.response.data : error.message);
        throw new HttpsError('internal', 'Greška pri autorizaciji videa.');
    }
});