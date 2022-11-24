const multer = require("multer");
const fs = require("fs");

// Upload an image
const uploadImage = async (id,request,response) => {
    
    // variables for image name and path
    const imageName = "";

    // set up multer
    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
            // temporary served with local files. @ TODO: implement cloud storage
            const folderName = `.src/images/`
            fs.mkdirSync(folderName, { recursive: true })
            return cb(null, folderName);
        },
        filename: (request, file, cb) => {
            const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
            imageName = `${id}.${ext}`;
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
        .json({ url: `${process.env.BACKEND_URL}:${process.env.PORT}/images/${imageName}`});
    }
    });
};


module.exports = { uploadImage };