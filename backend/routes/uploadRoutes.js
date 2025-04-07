const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

require("dotenv").config();

const router = express.Router();

// cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({message: "No file Uploaded"});
        }

        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) =>{
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if(result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                // Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Call the streamUpload function
        const result = await streamUpload(req.file.buffer);

        // Respond with uploaded image URL
        res.json({imageUrl: result.secure_url});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }

    // const uploadPromises = req.files.map(file => streamUpload(file.buffer));
    //     const results = await Promise.all(uploadPromises);

    //     const uploadedImages = results.map(result => ({
    //         url: result.secure_url,
    //         altText: result.original_filename
    //     }));

    //     res.json({ images: uploadedImages });
    // } catch (error) {
    //     console.error("Upload error:", error);
    //     res.status(500).json({ message: "Image upload failed" });
    // }
});

module.exports = router;


// const express = require("express");
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");
// const { protect, admin } = require("../middleware/authMiddleware");

// require("dotenv").config();

// const router = express.Router();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Helper function to upload to Cloudinary using a stream
// const streamUpload = (fileBuffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { folder: "products" },
//       (error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       }
//     );
//     streamifier.createReadStream(fileBuffer).pipe(stream);
//   });
// };

// // @route POST /api/admin/upload-images
// // @desc Upload multiple images
// // @access Private/Admin
// router.post(
//   "/",
//   protect,
//   admin,
//   upload.array("images", 3), // Limit to 3 images
//   async (req, res) => {
//     try {
//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ message: "No files uploaded" });
//       }

//       const uploadedImages = await Promise.all(
//         req.files.map(async (file) => {
//           const result = await streamUpload(file.buffer);
//           return {
//             url: result.secure_url,
//             altText: file.originalname,
//           };
//         })
//       );

//       res.json({ images: uploadedImages });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Image upload failed" });
//     }
//   }
// );

// module.exports = router;
