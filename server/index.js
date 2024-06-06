import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import MongoDB from './db/index.js';
import User from './model/user.model.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'))





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
});

app.post('/upload',upload.single('file'), (req, res) => {
    const {name, price} = req.body;
   User.create({name, price, image: req.file.filename})
   .then((result) => {res.json({result})})
    .catch((err) => {console.log(err) })
});

app.get('/getProducts', (req, res) => {
    User.find()
   .then((result) => {
    res.json({result})
    console.log(result);
    })
   .catch((err) => {
    console.log(err);
    })
});

app.put('/update/:id', upload.single('file'), (req, res) => {
    const { name, price } = req.body;
    const updateData = { name, price };
    if (req.file) {
      updateData.image = req.file.filename;
    }
    User.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .then(result => res.json({ result }))
      .catch(err => console.log(err));
  });
  
  app.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(result => res.json({ result }))
      .catch(err => console.log(err));
  });


MongoDB().then(() => {
    app.listen(4001, () => {
        console.log(`Server is running at port : 4001`);
    })
})




