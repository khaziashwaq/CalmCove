export default async function handler(req, res) {
  const { query } = req.query;
  const API_KEY = "9272a5b25a964c8eb310e68bd207f759";
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
}
