import express from "express";
import  bodyParser from 'body-parser';

const app=express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/new",(req,res)=>{
    res.render("new.ejs");
});

let article=[];

app.post("/submit",(req,res)=>{
    article.push(req.body["title"]);
    res.render("index.ejs",{
        article1:article
    })
});

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

