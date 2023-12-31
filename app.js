const express = require('express');
const bodyparser= require('body-parser');
const nodemailer = require('nodemailer');

const app = express();


app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
});

app.post("/",function(req,res){
    var name = req.body.name;   
    var city = req.body.city;
    var district = req.body.district;
    var state = req.body.state;
    var phone = req.body.Mnumber;
    var eMail = req.body.email;
    var course = req.body.course;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "kumargupta24102000@gmail.com",
            pass: "utndkmycbceowgfc"

        }
    });

    const mailOptions ={ 
        from:"Kumargupta24102000@gmail.com",
        to: eMail,
        subject: "resigtration successful",
        text:"New Registration\n\n" +
        "Name: " + name + "\n" +
        "Course: " + course + "\n" +
        "City: " + city + "\n" +
        "District: " + district + "\n" +
        "State: " + state + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + eMail + "."
    };

    transporter.sendMail(mailOptions, function(error,info){
        if(error){
            console.log(error);
        }else{
                console.log("Email sent:"+ info.response);
                res.sendFile(__dirname + "/success.html");
        }
    });
});

app.post("/failure",function(req,res){
    res.redirect("/");
});


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})