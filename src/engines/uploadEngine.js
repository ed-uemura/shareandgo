const multer = require("multer");
const fs = require("fs");

// Upload an image
const uploadImage = async (request,response) => {
    
    // variables for image name and path
    const imageName = "";
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; 
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const seconds = dateObj.getSeconds();
    const minutes = dateObj.getMinutes();
    const hour = dateObj.getHours();
    const id = parseInt(Math.random()*100000)

    // set up multer
    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
            const folderName = `.src/images/${year}/${month}`
            fs.mkdirSync(folderName, { recursive: true })
            return cb(null, folderName);
        },
        filename: (request, file, cb) => {
            const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            imageName = `${year}/${month}/${year}_${month}_${day}_${id}_${hour}_${minutes}_${seconds}_${id}.${ext}`;
            return cb(null, imageName);
        }
    });

    // upload function and settings
    const upload = multer({
        storage: storage,
        limits: { fileSize: 3000000 },
    }).single("myImage");

    // upload call
    upload(request, response, (error) => {
    if (error) {
        throw new Error(error);
    } else {
        return response.status(201)
        .json({ url: `${process.env.BACKEND_URL}:${process.env.PORT}/images/${year}/${month}/${imageName}`});
    }
    });
};

module.exports = { uploadImage };