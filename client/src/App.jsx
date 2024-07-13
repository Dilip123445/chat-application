import React, { useEffect, useState, useMemo } from "react";

import { io } from "socket.io-client";

import {Button, Container, TextField, Typography,Stack} from "@mui/material"


const App = () => {

  const socket = useMemo(() => io("http://localhost:3000"), [])  
  //,{withCredentials:true} paas krna hai upper mai array se phle

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  console.log(messages);


  const handleSubmit = (e) => {

    e.preventDefault();

    socket.emit("message", {message,room});

    setMessage("");
    
  }

  const Roomhandler = (e) => {
    e.preventDefault();
    socket.emit("joineed-room", roomName);
    setRoomName("");
  };

  useEffect(() => {

    socket.on("connect", () => {
      setSocketId(socket.id)
      console.log("connected",socket.id);
    })

    // socket.emit("welcome","welcome my socket connection")

    //name same on chahiye jo index page mai ho

    socket.on("receive-message", (data) => {

      console.log(data)

      setMessages((messages)=>[...messages,data])
      
    });



    socket.on("welcome", (msg) => {
      console.log(`msg ${socket.id}`,msg);
    })
    return () => {

      socket.disconnect()
      
   }

 },[])


  return (
    <Container maxWidth="sm">
      <Typography variant="h3" component="div" gutterBottom>
        MyChat
      </Typography>
      <Typography variant="h6" component="div" gutterBottom>
        {socket.id}

        <form onSubmit={Roomhandler}>
          <h5>Join Room</h5>
          <TextField
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            id="outlined-basic"
            label="Room Name"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Join
          </Button>
        </form>
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />

        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
   
  
};

export default App;

