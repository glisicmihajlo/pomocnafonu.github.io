const { onCall, HttpsError } = require("firebase-functions/v2/https");
const axios = require("axios");

exports.getVideoAuth = onCall(async (request) => {
    // 1. Provera autentifikacije
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
                // Koristimo annotate jer on bolje radi na mobilnim uređajima
                "annotate": JSON.stringify([
                    {
                        "type": "rtext",
                        "text": userEmail,
                        "alpha": 0.6,
                        "color": "0xFF0000", // Crvena boja za test
                        "size": 20,
                        "interval": 5000,
                        "skip_on_hls": false // Ključno za Safari/iOS
                    }
                ]),
                "request": {
                    "useStaticFilters": true
                }
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
        throw new HttpsError('internal', 'Greška pri generisanju ključa.');
    }
});