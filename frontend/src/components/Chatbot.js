import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css"; 

const Chatbot = () => {
    const [messages, setMessages] = useState([{ text: "Hi! How can I assist you?", sender: "bot" }]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [...newMessages.map(msg => ({
                        role: msg.sender === "user" ? "user" : "assistant",
                        content: msg.text
                    })), { role: "user", content: input }],
                },
                {
                    headers: {
                        "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const botResponse = response.data.choices[0].message.content;
            setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot">
                    <div className="chat-header">
                        <span>Conversation with Urban Vista AI</span>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask something..."
                        />
                        <button onClick={sendMessage}>➤</button>
                    </div>
                </div>
            )}
            <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>💬</button>
        </div>
    );
};

export default Chatbot;
