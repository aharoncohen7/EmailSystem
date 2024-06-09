// import {v2 as cloudinary} from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({
//         cloud_name: process.env.CLOUD_NAME,
//         api_key: process.env.CLOUD_KEY,
//         api_secret: process.env.CLOUD_SECRET
//     })
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes"
//     }).catch((error)=>{console.log(error)});
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();




// import { v2 as cloudinary } from 'cloudinary'


// const saveImgToCloud = async (img) => {
//     const arrayBuffer = await img.arrayBuffer()
//     const buffer = new Uint8Array(arrayBuffer)
//     const imgLink = new Promise((res) => {
//         cloudinary.uploader.upload_stream({ folder: "avatarImage" }, (err, uploadRes) => {
//             return res(uploadRes)
//         }).end(buffer)
//     }).then(uploadedImg => {
//         return uploadedImg.url
//     })
//     return imgLink
// }




// const cloudinary = require('cloudinary').v2;
// // import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//    loud_name: process.env.CLOUD_NAME,
//         api_key: process.env.CLOUD_KEY,
//         api_secret: process.env.CLOUD_SECRET
          
// });


//  const saveImgToCloud2 = async (img) => {

// const base64Data = img; // Replace with actual base64 data

// cloudinary.uploader.upload(base64Data, {
//   resource_type: 'auto'
// }, (error, result) => {
//   if (error) {
//     console.error(error);
//     return;
//   }

//   const url = result.url;
//   console.log('Image uploaded to Cloudinary:', url);
// });

// }

// module.exports = {cloudinary, saveImgToCloud, saveImgToCloud2 }


// import {v2 as cloudinary} from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({
//         cloud_name: process.env.CLOUD_NAME,
//         api_key: process.env.CLOUD_KEY,
//         api_secret: process.env.CLOUD_SECRET
//     })
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes"
//     }).catch((error)=>{console.log(error)});
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();




// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
// /loud_name: process.env.CLOUD_NAME,
//         api_key: process.env.CLOUD_KEY,
//         api_secret: process.env.CLOUD_SECRET
// })



// const saveImgToCloud = async (img) => {
//     const arrayBuffer = await img.arrayBuffer()
//     const buffer = new Uint8Array(arrayBuffer)
//     const imgLink = new Promise((res) => {
//         cloudinary.uploader.upload_stream({ folder: "avatarImage" }, (err, uploadRes) => {
//             return res(uploadRes)
//         }).end(buffer)
//     }).then(uploadedImg => {
//         return uploadedImg.url
//     })
//     return imgLink
// }

// export { saveImgToCloud }