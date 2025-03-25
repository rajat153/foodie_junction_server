const express = require('express');
const {createProxyMiddleware} = require("http-proxy-middleware")
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(express.json());
// app.use(cors());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();
// });

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Referer']
}));
  
// app.use('/api', require('./routes'))

app.use('/api/proxy/swiggy/dapi', createProxyMiddleware({
  target: 'https://www.swiggy.com',
  changeOrigin: true,
  pathRewrite: { '^/api/proxy/swiggy/dapi': '/dapi' },
  headers: {
    'Host': 'www.swiggy.com',
    'Origin': 'https://www.swiggy.com',
    'Referer': 'https://www.swiggy.com/',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36'
  },
  onProxyReq: (proxyReq) => {
    // Ensure these headers are always set
    proxyReq.setHeader('Accept', '*/*');
    proxyReq.setHeader('Accept-Language', 'en-US,en;q=0.9');
    proxyReq.setHeader('Sec-Fetch-Mode', 'cors');
  },
  onProxyRes: (proxyRes) => {
    // Force override CORS headers
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
  }
}));

// app.use(
//     "/api/proxy/swiggy/dapi",
//     createProxyMiddleware({
//       target: "https://www.swiggy.com",
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api/proxy/swiggy/dapi': '/dapi',
//       },

      // onProxyReq: (proxyReq, req, res) => {
      //   // Add all required headers
      //   proxyReq.setHeader('Origin', 'https://www.swiggy.com');
      //   proxyReq.setHeader('Referer', 'https://www.swiggy.com/');
      //   proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36');
        
      //   // If you need to pass through the original origin
      //   if (req.headers.origin) {
      //     proxyReq.setHeader('Origin', req.headers.origin);
      //   }
      // },
      // onProxyRes: (proxyRes, req, res) => {
      //   // Modify response headers to match working example
      //   proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin || '*';
      //   proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
      //   proxyRes.headers['Vary'] = 'Origin';
        
      //   // Remove strict security headers that might block your frontend
      //   delete proxyRes.headers['x-frame-options'];
      //   delete proxyRes.headers['x-content-type-options'];
      // }

      // onProxyReq: (proxyReq, req, res) => {
      //   // Add necessary headers that Swiggy might expect
      //   proxyReq.setHeader('Origin', 'https://www.swiggy.com');
      //   proxyReq.setHeader('Referer', 'https://www.swiggy.com/');
      // },
      // onProxyRes: (proxyRes, req, res) => {
      //   // Ensure CORS headers are set properly
      //   proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      //   proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
      //   proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
      // }
      // onProxyRes: (proxyRes, req, res) => {
      //   // ✅ Modify CORS headers in response
      //   proxyRes.headers["Access-Control-Allow-Origin"] = "*"; 
      // },
//     })
// );

// app.use('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.8343283&lng=77.6622526&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING', async(req, res)=>{

//   const result = await res.json();
//   console.log("res", result)

// })

app.get("/", (req,res) => {
  res.send("<h1>Welcome to the foodie junction</h1>")
})


app.get('/home' , (req, res)=>{
    try{
      res.send("<h1>Welcone HIII</h1>")
    }catch(err){
        res.status(402).res.send("WRONG")
    }
})

app.listen(PORT, ()=>{
    console.log("Server is runnning 3000")
})
