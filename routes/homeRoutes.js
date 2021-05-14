const express = require('express')
const router = express.Router();
const path = require("path");

router.get('/', (req,res) => {
    res.sendFile(path.resolve(__dirname, "../public/index.html"));
})

router.get("/exercise", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/exercise.html"));
});

router.get('/stats', (req,res) => {
    res.sendFile(path.resolve(__dirname, "../public/stats.html"));
})

module.exports = router;
