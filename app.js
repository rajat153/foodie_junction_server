const express = require('express');
const {createProxyMiddleware} = require("http-proxy-middleware")
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3400;
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
  
// app.use('/api', require('./routes'))
app.get("/", (req,res) => {
    res.send("<h1>Welcome to the Food Delivery App</h1>")
})

app.use(
    "/api/proxy/swiggy/dapi",
    createProxyMiddleware({
      target: "https://www.swiggy.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api/proxy/swiggy/dapi": "/dapi",
      },
      onProxyRes: (proxyRes, req, res) => {
        // ✅ Modify CORS headers in response
        proxyRes.headers["Access-Control-Allow-Origin"] = "*"; 
      },
    })
);



app.get('/home' , (req, res)=>{
    try{
      res.send("<h1>Welcone HIII</h1>")
    }catch(err){
        res.status(402).res.send("WRONG")
    }
})








app.listen(PORT, ()=>{
    console.log("Server is runnning")
})
