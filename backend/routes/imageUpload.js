import express from 'express';
import User from '../models/userModel.js';
import multer from 'multer';

const router=express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
const imgController=async (req,res)=>{
    const id=req.body._id
    
   try {
    await User.findOneAndUpdate({_id:id},{userImg:req.file.originalname},{new:true})
    res.send({ message: 'success',imageName: req.file.originalname,imagePath:req.file.path });
   } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error uploading image' });
   }
}
router.post('/upload',upload.single('image'),imgController)
export {router as imgUpload }