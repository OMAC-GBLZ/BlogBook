import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs")
  });
  
  var postsCollection = [];
    
  app.post("/submit", (req, res)=> {
    var post = new BlogPost(req.body["name"],req.body["title"],req.body["content"],postsCollection.length + 1, new Date())
    postsCollection.push(post);
    res.render("index.ejs", {
        createdPosts: postsCollection,
    });
  });

  app.post("/delete", (req, res)=> {
    console.log(req.body["postId"] + ": deleted");
    let index = Number(Number(req.body["postId"]) - 1);
    console.log(index);
    postsCollection.splice(index, 1);
    res.render("index.ejs", {
        createdPosts: postsCollection,
    });
  });

  app.post("/update", (req, res)=>{
    let index = Number(Number(req.body["postId"]) - 1);
    postsCollection[index].title = req.body["title"];
    postsCollection[index].body = req.body["content"];
    console.log(postsCollection[index].user);
    res.render("index.ejs", {
        createdPosts: postsCollection,
    });
  });


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  function BlogPost(user, title, body, id, time){
    this.user = user;
    this.title = title;
    this.body = body;
    this.id = id;
    this.time = time;
  }

