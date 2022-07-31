if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true} )

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.use('/articles',articleRouter)

app.get('/' , async (req,res) => {
   const articles = await Article.find().sort({
    createdAt: 'desc'
   }       
)
   res.render('articles/index', {articles: articles})
})

app.listen(5000)
