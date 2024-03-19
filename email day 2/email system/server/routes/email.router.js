const express = require("express")//ייבוא ספריה שמסוגלת לייצר 
const emailRouter = express.Router()



emailRouter.post("/", async(req, res)=>{



})

// Add new post

emailRouter.post("/", async (req, res) => { 
    try {
        console.log(req.body);
        const newPost = await db.addPost(req.body.from, req.body.to, req.body.subject, req.body.content);
        // if (newPost) {
        //     if (req.body.tags) {
        //         const tags = await addTagsToPost(newPost.id, req.body.tags);
        //         if (tags) {
        //             console.log("פוסט נוצר בהצלחה תגיות נוספו");
        //             newPost.tags = tags.join(",");
        //         }
        //         else {
        //             console.log("פוסט נוצר בהצלחה אך תגיות לא נוספו");
        //         }
        //     }
        //     else {
        //         console.log("פוסט נוצר בהצלח");
        //     }
        //     res.status(201).json(newPost);
        //     return;
        // }
    
        // res.status(400).send();
        
    } catch (error) {
        res.status(500).send(error.message);
    }
});

emailRouter.get("/:emailId", async(req, res)=>{


})

module.exports = {emailRouter}