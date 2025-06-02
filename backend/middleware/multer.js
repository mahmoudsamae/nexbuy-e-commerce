import multer from "multer";

const storage = multer.diskStorage({
  filename: function(req,file, callback){
    callback(null, file.originalname)
  }
});

const update = multer({storage});
export default update;