// api/get_otp.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiSecret = 'uSVhYApIkFZO68cxx1s6YJ3ISqp5pKpDMNXKpKfRbtIyoRZgQXdf7HFnEHCu89L6'; // stavi svoj Secret Key
  const videoId = req.query.videoId;

  if (!videoId) {
    return res.status(400).json({ error: 'Nije prosleđen videoId' });
  }

  try {
    const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
      headers: {
        'Authorization': `Apisecret ${apiSecret}`
      }
    });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*'); // dozvoljava frontend sa bilo kog domena
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Greška pri kontaktu sa VdoCipher API' });
  }
}
