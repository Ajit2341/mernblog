const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt")
const User = require('./models/User')
const Post = require('./models/Posts')
//JWT and cookies
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const secret = 'adffkw45idfgsfdfsdfdsf'
const cookieParser = require("cookie-parser")

const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.json())

app.use(cookieParser())

app.use('/uploads', express.static(__dirname + '/uploads'))


mongoose.connect('mongodb://localhost:27017/mernblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDb connection error: ${err}`);
})

app.post('/register', async (req, res) => {
    const { userName, userPassword } = req.body

    try {
        const userDoc = await User.create
            ({
                username: userName,
                password: bcrypt.hashSync(userPassword, salt)
            })
        res.json(userDoc)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }



})

app.post('/login', async (req, res) => {
    const { userName, userPassword } = req.body

    const userDoc = await User.findOne({ username: userName })
    const passOk = bcrypt.compareSync(userPassword, userDoc.password)
    if (passOk) {
        jwt.sign({ userName, id: userDoc._id }, secret, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                userName,
            })
        })
    } else {
        res.status(400).json('invalid credentials');
    }
})

// get request to check user iformantion
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];

    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,

        });

        res.json(postDoc);
       
    })


})


app.get('/post', async (req, res) => {
    const posts = await Post.find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)

    res.json(posts)

})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const postDoc = await Post.findById(id).populate('author', ['username']);

        res.json(postDoc)
    } catch (error) {
        res.status(500).json({ error: 'Infernal error' })
    }
 

})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });

    
        res.json(postDoc);
    });
});


app.listen(4000)