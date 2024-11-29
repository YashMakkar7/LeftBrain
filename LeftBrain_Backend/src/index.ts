import express from 'express';
import jwt from 'jsonwebtoken';
import { ContentModel, LinkModel, UserModel } from './db';
import { JWT_PASSWORD } from './config';
import { UserMiddleware } from './middleware';
import { random } from './utils';
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors())


app.post("/api/v1/signup",async (req,res)=>{
    //todos zod validation , hash the password , status codes 
    const username = req.body.username;
    const password = req.body.password;

    try{
        await UserModel.create({
            username:username,
            password:password
        })
    
        res.json({
            msg:"User signed up"
        })

    }catch(e){
        res.status(400).json({
            msg:"User already exists"
        })
    }
    
})
app.post("/api/v1/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,password
    })
    if(existingUser){
        const token = jwt.sign({
           id : existingUser._id
        },JWT_PASSWORD)
        
        res.json({
            token
        })
    }
})

app.post("/api/v1/content",UserMiddleware,async(req,res)=>{
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    const description = req.body.description;
    try{
        await ContentModel.create({
            link,
            title,
            description,
            //@ts-ignore
            userId:req.userId,
            tags:[],
            type,
        })
        res.json({
            msg:"Content added"
        })
    }catch(e){
        res.json({
            msg:"Content not added "
        })
    }

})

app.get("/api/v1/content",UserMiddleware,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId
    const content = await ContentModel.find({
        userId
    })
    // .populate("userId","username") no need 
    res.json({
        content
    })
})

app.get("/api/v1/content/document",UserMiddleware,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId
    const type = "document"
    const content = await ContentModel.find({
        userId,type
    }).populate("userId","username")

    res.json({
        content
    })
})
app.get("/api/v1/content/youtube",UserMiddleware,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId;
    const type = "youtube";
    const content = await ContentModel.find({
        userId,type
    }).populate("userId","username")

    res.json({
        content
    })
})
app.get("/api/v1/content/twitter",UserMiddleware,async(req,res)=>{
    // @ts-ignore
    const userId = req.userId
    const type = "twitter"
    const content = await ContentModel.find({
        userId,type 
    }).populate("userId","username")

    res.json({
        content
    })
})
app.delete("/api/v1/content",UserMiddleware,async(req,res)=>{
    const contentId = req.headers.contentId;
    await ContentModel.deleteOne({
        // @ts-ignore
        userId : req.userId,
        contentId
    })
    res.json({
        msg:"Content deleted"
    })
})


app.post("/api/v1/brain/share",UserMiddleware,async(req,res) => {
    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId:req.userId
        })
        if(existingLink){
            res.json({
                hash:existingLink?.hash
            })   
            return;         
        }

        const hash = random(10);
        await LinkModel.create({
            hash:hash,
            //@ts-ignore
            userId : req.userId
        })
        res.json({
            hash
        })

    }else{
        await LinkModel.deleteOne({
            //@ts-ignore 
            userId:req.userId
        })
        res.json({
            msg:"Removed shareable link"
        })
    }
})
app.get("/api/v1/brain/:shareLink", async (req,res)=>{
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    })
    if(!link){
        res.status(411).json({
            msg:"Incorrect Link"
        })
        return;
    }
    //userId
    const content = await ContentModel.find({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id:link.userId
    })

    res.json({
        content,
        username:user?.username
    })
})

app.listen(3000,()=>{
    console.log("Server is Running");
})