import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = new GridFsStorage({
  url: 'MONGODB_URI',
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: file.originalname,
    };
  },
});

const upload = multer({ storage });

export default upload.single('image');
