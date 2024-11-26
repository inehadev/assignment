const express = require('express');
const {  OpenAI }=require("openai")
const dotenv = require('dotenv')
const axios = require ('axios')

dotenv.config();


//    const apiKey = process.env.OPENAI_APIKEY


// const openai = new OpenAI ({
//     apiKey,
// });

// const TextCompletionUsingOpenAI = async (req,res)=>{
//     const {prompt } = req.body;

//     try {
//         const response = await openai.completions.create({
//             model: 'gpt-3.5-turbo',  
//             prompt: prompt,
//             max_tokens: 2000,
//             temperature: 0.7,
//         });
//         res.status(200).json({ completion: response.data.choices[0].text })
//         console.log("all good")
        
//     } catch (error) {
//         console.log("error in text completion" ,error)
//         res.status(500).json({message:"error in text competion"})
        
//     }
// }


const TextCompletion =  async (req , res)=>{
    const {prompt } = req.body;
    try {
        const response = await axios({
            method: 'post',
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API}`,
            data: {
              contents: [{
                parts: [{
                 
                  text: `You are a Ai assistant and complete the text   ${prompt}`
                }]
              }]
            }
          });
      
          console.log("API data of  the rresponse in:", response.data);
          let generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
    
        
          generatedText = generatedText.replace(/\*/g, '');
          res.status(200).json({completion: generatedText})
    } catch (error) {
        console.log("error in text completion" ,error)
        res.status(500).json({message:"error in text competio"})
        
    }
}

module.exports = {TextCompletion}