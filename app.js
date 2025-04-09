
const express = require("express");
const cors = require("cors"); // ✅ import CORS
const app = express();
const PORT = 3000;

app.use(cors());

app.get("/api/swiggy/restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng are required" });
  }

  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching from Swiggy:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/api/swiggy/menu", async (req, res) => {
  const { lat, lng, restaurantId } = req.query;

  if (!lat || !lng || !restaurantId) {
    return res
      .status(400)
      .json({ error: "lat, lng, and restaurantId are required" });
  }

  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

