import express from "express";
import  bodyParser from 'body-parser';

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        article1:article
    });
});

app.get("/new",(req,res)=>{
    res.render("new.ejs");
});

let article=[];

app.post("/submit",(req,res)=>{
    const posts={
        title: req.body["title"],
        content: req.body["content"]
    }
    article.push(posts);
    res.render("index.ejs",{
        article1:article
    })
});

app.get("/posts/:title", (req, res) => {
    const requestedTitle = req.params.title;

    for (let i = 0; i < article.length; i++) {
        if (article[i].title === requestedTitle) {
            res.render("post.ejs", {
                title: article[i].title,
                content: article[i].content
            });
            break;
        }
    }
});

app.post('/delete/:title', (req, res) => {
  const requestedTitle= req.params.title; 

  for(var i=0;i<article.length;i++){
    if(article[i].title === requestedTitle){
        article = article.filter((item) => item.title !== requestedTitle);
    }
  }
  res.redirect("/");
});

app.get("/edit/:title",(req,res)=>{
    const requestedTitle=req.params.title;

    for(var i=0;i<article.length;i++){
        if(article[i].title === requestedTitle){
            res.render("edit.ejs",{
                title: article[i].title,
                content: article[i].content
            });
        }
    }
});

app.post('/edit/:title', (req, res) => {
    const requestedTitle = req.params.title;
    const title1= req.body["title"];
    const content1= req.body["content"];

    for(var i=0;i<article.length;i++){
        if(article[i].title === requestedTitle){
            article[i].title=title1;
            article[i].content=content1;
            break;
        }
    }
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

