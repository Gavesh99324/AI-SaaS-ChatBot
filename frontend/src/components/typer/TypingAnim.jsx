import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const TypingAnim = () => {
    return (
    <TypeAnimation
      sequence={[
        'Chat With NeuraBot Your Own AI Assistant',
        1000, 
        'Built With Gemini API 🤖',
        2000,
        'NeuraBot is Customized AI Bot 💻',
        1500,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '3em', display: 'inline-block', color: 'white', textShadow: '1px 1px 20px #000' }}
      repeat={Infinity}
    />
  );
};


export default TypingAnim;
