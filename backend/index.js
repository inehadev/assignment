const express =require('express')
const app = express();
const openai = require('./routes/openaiRoute')
const cors=require('cors')

const PORT  = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.use('/api/openai' , openai)

app.listen(PORT , (req, res)=>{
    console.log(`server is running at ${PORT}`);
})