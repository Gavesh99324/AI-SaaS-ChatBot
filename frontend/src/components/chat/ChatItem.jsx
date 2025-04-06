
import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../assets/Logo.png';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';


import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return [];
}

function isCodeBlock(str) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//") ||
    str.includes("%")
  );
}

function ChatItem({ content, role }) {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "rgba(255, 255, 255, 0.1)", my: 2, gap: 2 }}>
      <Avatar sx={{ ml: "0" }}>
        <img src={Logo} alt="neurabot" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks.length ? (
          <Typography sx={{ fontSize: "12px" }}>{content}</Typography>
        ) : (
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter key={index} style={dracula} language="javascript" wrapLongLines={true}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography key={index} sx={{ fontSize: "12px" }}>
                {block}
              </Typography>
            )
          )
        )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "rgba(0, 77, 86, 0.1)", my: 2, gap: 2, borderRadius: "10px" }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0] || "?"}
        {auth?.user?.name.split(" ")[1][0]}
      </Avatar>
      <Box>
        <Typography fontSize={"12px"}>{content}</Typography>
      </Box>
    </Box>
  );
}

export default ChatItem;

