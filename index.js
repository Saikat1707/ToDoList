const express=require('express')
const app=express()
const path=require('path')
const fs=require('fs')



app.set('view engine',"ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'public')))

app.get('/',function(req,res){
    fs.readdir('./files',function(err,files){
        res.render("index",{files:files})
    })
    
})
app.get('/files/:FileName',function(req,res){
    fs.readFile(`./files/${req.params.FileName}`,'utf-8',function(err,FileData){
        res.render("show",{FileData:FileData,FileName:req.params.FileName})
    })
    
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${(req.body.TaskTitle).split(" ").join("_")}.txt`,req.body.TaskDescription,function(err){
        res.redirect('/')
    })
    
})
app.listen(3000)