
export default async function handler(req, res) {
  try {
    const { videoId } = req.query;

    if (!videoId) {
      return res.status(400).json({ error: "videoId je obavezan" });
    }

    const apiSecret = "uSVhYApIkFZO68cxx1s6YJ3ISqp5pKpDMNXKpKfRbtIyoRZgQXdf7HFnEHCu89L6";

    const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
      method: "GET",
      headers: {
        "Authorization": `Apisecret ${apiSecret}`
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error("Greška u serverless funkciji:", err);
    return res.status(500).json({ error: "Greška pri pozivanju VdoCipher API-ja" });
  }
}
