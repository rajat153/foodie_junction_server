const express = require('express');
const needle = require('needle');
const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL

router.get('/', async(req, res) =>{
    try{
    // const params = new URLSearchParams({...url.parse(req.url, true).query})
    // console.log('paramsa', params)
      const apiRes = await needle('get', `${API_BASE_URL}`  )
      const data = apiRes.body
      res.status(200).json(data)
    }catch(err){
    res.status(500).json({err})
    }

})

module.exports = router