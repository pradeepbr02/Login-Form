// const express=require("express");
// const app=express();
// const bodyParser=require("body-parser");
// const request=require("request");
// const path=require("path");
// const { response } = require("express");
// const { json } = require("body-parser");
// const https=require("https");
// const { options } = require("nodemon/lib/config");

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));

// app.get("/",function(request,resp){
//     resp.sendFile(__dirname + "/Login.html");
// });

// app.post("/",function(req,res){
//     var firstName=req.body.Fname;
//     var lastName=req.body.lname;
//     var mail=req.body.email;

//     var data={
//         members:[
//             {
//                 email_address:mail,
//                 status:"subscribed",
//                 merge_fields:{
//                     FNAME:firstName,
//                     LNAME:lastName
//                 }

//             }
//         ]
//     };

//     const jasonData=JSON.stringify(data);
//     const url= "https://us20.api.mailchimp.com/3.0/lists/814076c40d";

//     const options={
//         method:"POST",
//         auth : "pradeep:15885117e0d25260a2400a9a5d2923c2-us20"
        
//     }

//     const request=https.request(url,options,function(respond){
//         respond.on("data",function(data){
//             console.log(JSON.parse(data));
//         });

//     });
//     request.write(jasonData);
//     request.end();
// });
    

    




// app.listen(3000,function(){
//     console.log("Server is running ");
// });

const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/Login.html");
  });

  app.post("/",function(req,res){
      var firstName=req.body.Fname;
      var lastName=req.body.lname;
      var email=req.body.email;

      var data={
          members:[
              {
              email_address:email,
              status:"subscribed",
              merge_fields:{
                  FNAME:firstName,
                  LNAME:lastName
              }
              
              }
          ]
      };

      var jsonData=JSON.stringify(data);
      const url="https://us20.api.mailchimp.com/3.0/lists/814076c40d";
      const options={
          method:"POST",
          auth:"pradeep:15885117e0d25260a2400a9a5d2923c2-us20"
      }

      const request=https.request(url,options,function(response){
          if(response.statusCode==200){
              res.sendFile(__dirname + "/success.html");
          }
          else{
              res.sendFile(__dirname + "/fail.html");
          }
          response.on("data",function(){
              console.log(JSON.parse(jsonData))
          })
      });
      request.write(jsonData);
      request.end();
    });

    app.post("/success",function(req,res){
        res.redirect("/")
    });

    const PORT=process.env.PORT||3000;
app.listen(PORT,function(){
    console.log("server is running in port 3000");
});


//api key
//15885117e0d25260a2400a9a5d2923c2-us20

//list id
//814076c40d