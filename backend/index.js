const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
    next();
});

const fs = require("fs");

const dataPath = "./data/data.json";
// function wire to file
const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
};
// get all post
app.get('/api/posts', cors(), (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        res.send(JSON.parse(data).posts);
    });
});
// create new post with body { 'body': 'data' }
app.post('/api/post', cors(), (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        const newData = req.body;
        console.log((req.body));
        const file = JSON.parse(data).posts;
        if (newData) {
            file.push({
                id: file.length + 1,
                body: newData.body
            });
        }
        writeFile(JSON.stringify({posts: file}, null, 2), () => {
            res.status(200).json("added");
        });
    });
});

// delete post with id
app.delete('/api/post/:id', cors(), (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        const postId = req.params["id"];
        console.log(postId);
        const file = JSON.parse(data).posts;
        const newFile = file.filter( (ele) => {
            return ele.id != postId;
        });
        writeFile(JSON.stringify({posts: newFile}, null, 2), () => {
            res.status(200).json(("deleted"));
        });
    });
});
// update post with id and body { 'body': 'data' }
app.put('/api/post/:id', cors(), (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        const postId = req.params["id"];
        const newData = req.body;
        const file = JSON.parse(data).posts;

        itemIndex = 0;
        file.map( (ele, index) => {
            if (ele.id == postId) {
                itemIndex = index;
            }
        });
        console.log(itemIndex);
        file.splice(itemIndex, 1, {id: itemIndex + 1, body: newData.body});
        writeFile(JSON.stringify({posts: file}, null, 2), () => {
            res.status(200).json("updated");
        });
    });
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});