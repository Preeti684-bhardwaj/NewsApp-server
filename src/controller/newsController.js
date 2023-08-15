const newsModel = require('../model/newsModel')
const axios = require('axios');
const dotenv=require('dotenv').config()
const {API_KEY } = process.env;

const fetchNewsAndStore = async (category) => {
  try {
    const newData = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${API_KEY}`);
    const newsData = newData.data.articles;
    const news = newsData.map((val) => ({
      title: val.title,
      description: val.description,
      image: val.urlToImage,
      time: val.publishedAt,
      source: val.source.name,
      url: val.url,
      category: category
    }));

    await newsModel.create(news);
    console.log(news)
  } catch (err) {
    console.error(err);
  }
};

const createNews = async (req, res) => {
  try {
    // Fetch data from CoinCap API
    const data = req.query; 
    const {category,country}=data// Category received from the query parameter
    await fetchNewsAndStore(category);

    return res.status(200).send({ message: 'News data fetched and stored successfully.' ,data:category });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

const getNews = async (req, res) => {
    try {
      const category = req.query.category
        const newsdata= await newsModel.find({category:category}).sort({ time: -1 }).select({__v:0});
         res.status(200).json(newsdata);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
}
const getAllNews = async (req, res) => {
    try {
        const newsdata= await newsModel.find().sort({ time: -1 }).select({__v:0});
         res.status(200).json(newsdata);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }

}
const getNewsById = async (req, res) => {
    try {
        const id = req.params.id;
        let newsData = await newsModel.findOne({
          _id:id,
        });
        if (!newsData) {
          return res.status(404).send({ status: false, message: "News article not found" });
        }
    
        res.status(200).json( newsData );
      } catch (err) {
        return res.status(500).send({ satus: false, err: err.message });
      }

}

module.exports = { createNews,getNews, getNewsById,getAllNews }
