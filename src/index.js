const express=require('express')
const {mongooseconn}=require('./mongo/db');
const app=express();
const dotenv=require('dotenv').config()
const { PORT,MONGOOSE_URI} = process.env;
const newsRoutes=require('./route/newsRoutes')
const cors=require('cors')
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongooseconn(MONGOOSE_URI);
app.use(cors())
app.use('/news', newsRoutes);



app.listen(PORT, () => {
    console.log(`connecting to port ${PORT}`)
})
