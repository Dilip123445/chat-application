import express from "express"

import { Server } from "socket.io";

import { createServer } from "http";

import cors from "cors";

//import jwt from "jsonwebtoken";

//import cookieParser from "cookie-parser";


const port = process.env.port || 3000

//const secretKeyJwt = "hsvjdhgvjhgfjasdgugdjvgvjhbchjjhvcjbjcvbjdhb";


const app = express()

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials:true
    }
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
    res.send("hello dilip")
    
})

// app.get("/login", (req, res) => {

//   const token = jwt.sign(
//     { _id: "nbcjhbjhgjgscsdhjhcjhchjdcgjhjbjhjh" },
//     secretKeyJwt
//   );
  
//   res.cookie("token",token,{httpOnly:true, secure:true, sameSite:"none"}).json({message:"Login Success"})
 
// });

const user = true;

io.use((socket, next) => {

  // cookieParser()(socket.request, socket.request.res, (err) => {

  //   if(err) return next(err)
    
  //   const token = socket.request.cookies.token;

  //   if (!token) return next(new Error("Authentication Error"));

  //   // const decoded = jwt.verify(token, secretKeyJwt);

  //   const decoded = jwt.verify(token, secretKeyJwt);


  //   next()


  // })
  if(user)next()
})



io.on("connection", (socket) => {

    console.log("user Connected", socket.id);

  
  //msg name same hona chahiye fontend m
  
  //socket.emit("welcome", `welcome my socket Account ${socket.id}`);

  //broadcast ka mtlb apna chor durse ko msg dena

  // socket.broadcast.emit("welcome",`welcome broadcast msg ${socket.id}`)
  

  // part1
  

  // socket.on("message", (data) => {

  //   console.log(data);

  //   //io.emit("receive-message", data)

  //   //apn ko chor bhaki sbko
  //   socket.broadcast.emit("receive-message",data);
    
  // })

  //for personal chat 1 part2
  
  socket.on("message", ({ message, room }) => {

    console.log(message, room);
    
    //io.to(room).emit("receive-message", message); //sbko msg krna ho toh isse uncomment kare
    
    socket.to(room).emit("receive-message", message);
    
  })


  //join room 2 part 3

  socket.on("joineed-room", (room) => {
    socket.join(room);
    console.log(`User Joinned room ${room}`);
  });


  socket.on("disconnect", () => {

    console.log("User Disconnected", socket.id)
    
  })
    
})

server.listen(port,()=>console.log(`Server running on port:${port}`))
