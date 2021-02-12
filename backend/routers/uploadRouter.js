import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

// Api that saves file in upload folder and names it timestamp.jpg

const uploadRouter = express.Router();

const storage = multer.diskStorage({  // folder in this project for images
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });  // upload middleware

uploadRouter.post('/', isAuth, upload.single('image'), (req, res) => {  
  res.send(`/${req.file.path}`);
});

export default uploadRouter;