const express = require('express')

const router = express.Router()

router.get('/getfooddata', (req, res)=>{
    console.log("yes")
    try {
        res.send([global.food_data, global.category_data])
    } catch (error) {
        console.error(error)
        res.status(400).send("Fetching Data error")
    }
})






module.exports = router