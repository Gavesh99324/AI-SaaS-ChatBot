import { React, useRef } from 'react';
import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { red, orange } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';

const chatMessages = [
  { role: "user", content: "Hello!" },
  { role: "assistant", content: "Hi there! How can I assist you today?" },
  { role: "user", content: "Tell me a joke." },
  { role: "assistant", content: "Sure! Why don’t skeletons fight each other? Because they don’t have the guts!" },
  { role: "user", content: "That was funny! Can you recommend a book?" },
  { role: "assistant", content: "Of course! 'Atomic Habits' by James Clear is a great book on building good habits and breaking bad ones." }
];


const Chat = () => {

  const inputRef = useRef(null);


  const auth = useAuth();
  const handleSubmit = async () => {
    console.log(inputRef.current?.value)
  }

  return (
    <Box sx={{ display: "flex", flex: 1, width: "100%", height: "100%", mt: 3, gap: 3, paddingBottom: "60px" }}>
      <Box sx={{ display: { md: "flex", sm: "none", xs: "none"}, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{ display: "flex", width: "100%", height: "100vh", bgcolor: "rgb(17, 29, 39)", borderRadius: 5, flexDirection: "column", mx: 3}}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700}}>
            { auth?.user?.name[0] || "?" }
            { auth?.user?.name.split(" ")[1][0] }
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: "work-sans, sans-serif"}}>
            You are talking to a NeuraBot
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: "work-sans, sans-serif", my: 4, p: 3}}>
            You can ask some questions related to knowledge, Business, Advices, Education, etc. But avoid sharing personal information.
          </Typography>
          <Button sx={{ width: "200px", my: 'auto', color: 'white', fontWeight: "700", borderRadius: 3, mx: "auto", bgcolor: orange[300], ":hover": {bgcolor: red.A400}}}>
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 },flexDirection: 'column', px: 3 }}>
        <Typography sx={{ fontSize: "40px", color: "white", mb: 2, mx: "auto", fontWeight: "600" }}>
          How Can I Help You?
        </Typography>
        <Box sx={{ width: "90%", borderRadius: 3, mx: "auto", display: 'flex', flexDirection: "column", overflowX: "hidden", overflowY: "auto", scrollBehavior: "smooth" }}>
          {chatMessages.map((chat, index) => (
              <ChatItem content={chat.content} role={chat.role} key={index}/> 
            ))}
        </Box>
        <div style={{ width: "90%", marginBottom: "60px", marginTop: "auto", padding: "10px", borderRadius: 16, backgroundColor: "rgb(17, 29, 39)", display: "flex", margin: "auto", flexDirection: "column"}}
        > 
          {" "}
          <input ref={inputRef} type='text' style={{ width: "90%", height: "10px", backgroundColor: "transparent", marginBottom: "20px", padding: "5px", border: "none", outline: "none", color: "white", fontSize: "15px" }} />
          <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
