const express=require('express')
const router=express.Router()
const {createNews,getNews,getNewsById,getAllNews}=require('../controller/newsController')

router.post('/createnews',createNews)

router.get('/getnews',getNews)

router.get('/getallnews',getAllNews)

router.get('/getnews/:id',getNewsById)

module.exports=router
