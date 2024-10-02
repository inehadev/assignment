const express=require('express');

const {TextCompletion }=require('../controller/openaiController');

const router = express.Router();

router.post('/textcompletion' , TextCompletion);

module.exports=router;