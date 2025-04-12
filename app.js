
const express = require("express");
const cors = require("cors"); // ✅ import CORS
const app = express();
const PORT = 3001;

app.use(cors());

app.get("/", (req,res) => {
  res.send("<h1>Welcome to the foodie junction</h1>")
})

const TMDB_API_CONSTANT = "9a98d46d40f53d7a02a68e1c04832bc2";

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
// TMDB APIs Proxy Server

app.get("/api/tmdbnowplaying", async (req, res) => {
  const url = `https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_CONSTANT}&page=1`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    res.status(500).json({ error: "Failed to fetch now playing movies" });
  }
});

app.get("/api/tmdbpopularmovies", async (req, res) => {
  const url = `https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_CONSTANT}&page=1`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/api/tmdbtopratedmovies", async (req, res) => {
  const url = `https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_CONSTANT}&language=en-US&page=1`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/api/tmdbupcomingmovies", async (req, res) => {
  const url = `https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_CONSTANT}&language=en-US&page=1`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});


app.post("/api/tmdbsearchmovies", async (req, res) => {
  const {movie} = req.query;
  const url = `https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_CONSTANT}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching search movies:", error);
    res.status(500).json({ error: "Failed to fetch search movies" });
  }
});

app.post("/api/tmdbvideotrailer", async (req, res) => {
  const {movieId} = req.query;
  console.log("ss", movieId)
  const url = `https://thingproxy.freeboard.io/fetch/https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_CONSTANT}`;
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching video trailer:", error);
    res.status(500).json({ error: "Failed to fetch video trailer" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

