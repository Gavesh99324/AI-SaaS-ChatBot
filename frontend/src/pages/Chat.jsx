
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Avatar, Box, Button, IconButton, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red, orange } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '../animation/Spinner.css';

import { motion } from "framer-motion";

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [provider, setProvider] = useState("deepseek");


  useEffect(() => {
    const savedChats = localStorage.getItem("chatMessages");
    if (savedChats) {
      setChatMessages(JSON.parse(savedChats));
    }
  }, []);


  const handleSubmit = async () => {
    const content = inputRef.current?.value.trim();
    if (!content) return;
  
    inputRef.current.value = "";
    const message = content;  //
  
    const newMessage = { role: "user", content };
    setChatMessages((prev) => {
      const updatedChats = [...prev, newMessage];
      localStorage.setItem("chatMessages", JSON.stringify(updatedChats)); 
      return updatedChats;
    });
  
    setLoading(true);
  
    try {
      const chatData = await sendChatRequest(message, model); // dynamic!

  
      if (chatData.response) {
        const botMessage = { role: "assistant", content: chatData.response };
        setChatMessages((prev) => {
          const updatedChats = [...prev, botMessage];
          localStorage.setItem("chatMessages", JSON.stringify(updatedChats));
          return updatedChats;
        });
      }
    } catch (error) {
      console.error("Chat API error:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      localStorage.removeItem("chatMessages");
      toast.success("Successfully deleted chats", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "localhost" });

      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          localStorage.setItem("chatMessages", JSON.stringify(data.chats)); 
          toast.success("Successfully loaded chats", { id: "localhost" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "localhost" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box sx={{ 
      display: "flex", 
      flex: 1, 
      width: "100%", 
      height: "100%", 
      mt: 3, 
      gap: 3, 
      paddingBottom: "60px", 
      maxWidth: "100vw", 
      overflowX: "hidden" 
    }}>
      {/* Sidebar */}
      <Box sx={{ display: { md: "flex", sm: "none", xs: "none" }, flex: 0.2, flexDirection: "column" }}>
        <Box sx={{ 
          display: "flex", 
          width: "100%", 
          height: "100vh", 
          bgcolor: "rgb(17, 29, 39)", 
          borderRadius: 5, 
          flexDirection: "column", 
          mx: 3 
        }}>
          <Avatar sx={{ mx: "auto", my: 2, bgcolor: "white", color: "black", fontWeight: 700 }}>
            {auth?.user?.name?.charAt(0) || "?"}{auth?.user?.name?.split(" ")[1]?.charAt(0) || ""}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work-sans, sans-serif" }}>You are talking to NeuraBot</Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work-sans, sans-serif", my: 4, p: 3 }}>
            Ask about knowledge, business, education, etc., but avoid sharing personal information.
          </Typography>
          <Button
            sx={{ 
              width: "200px", 
              my: "auto", 
              color: "white", 
              fontWeight: "700", 
              borderRadius: 3, 
              mx: "auto", 
              bgcolor: orange[300], 
              ":hover": { bgcolor: red.A400 } 
            }}
            onClick={() => {
              setChatMessages([]);
              localStorage.removeItem("chatMessages");
            }}
          > 
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* Chat Section */}
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1 }, flexDirection: "column", px: 3 }}>
        <Typography sx={{ fontSize: "40px", color: "white", mb: 2, mx: "auto", fontWeight: "600" }}>
          How Can I Help You?
        </Typography>

        <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            style={{
               backgroundColor: "#11272f",
               color: "white",
               marginBottom: "10px",
               borderRadius: "8px",
               padding: "6px",
               width: "100px"
            }}
          >
          <option value="deepseek">DeepSeek</option>
          <option value="gemini">Gemini</option>
        </select>

        {/* Chat messages */}
        <Box sx={{ 
          width: "90%", 
          maxWidth: "100%", 
          borderRadius: 3, 
          mx: "auto", 
          display: "flex", 
          flexDirection: "column", 
          overflowY: "auto", 
          overflowX: "hidden", 
          wordBreak: "break-word"
        }}>
          {chatMessages.map((chat, index) => (
            <ChatItem key={index} content={chat.content} role={chat.role} />
          ))}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
              <CircularProgress sx={{ color: "white" }} /> 
            </Box>
          )}
        </Box>

        {/* Input section */}
        <div style={{
          width: "90%",
          marginBottom: "20px",
          marginTop: "auto",
          padding: "10px",
          borderRadius: 16,
          backgroundColor: "rgb(17, 27, 39)",
          display: "flex",
          alignItems: "center",
          maxWidth: "100%",
        }}>
          <input
            ref={inputRef}
            type="text"
            style={{
              flex: 1,
              height: "30px",
              backgroundColor: "transparent",
              padding: "5px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "15px",
              overflowWrap: "break-word"
            }}
            placeholder="Type a message..."
          />
          <IconButton onClick={handleSubmit} sx={{ color: "white" }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
