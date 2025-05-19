class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHotels = () => {
    const message = this.createChatBotMessage("Here are the top hotels in Mumbai.");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleRestaurants = () => {
    const message = this.createChatBotMessage("Here are the best restaurants nearby.");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  // AI-like response based on user input
  handleAIResponse = (userMessage) => {
    let aiResponse = "I'm not sure about that. Could you ask something else?";
    
    // Custom AI response logic (this can be extended or replaced by an API call)
    if (userMessage.includes("weather")) {
      aiResponse = "I can help you with weather updates! Please tell me the city.";
    } else if (userMessage.includes("best places") || userMessage.includes("tourist")) {
      aiResponse = "I can suggest the best tourist spots for you! Which city are you interested in?";
    }
    
    const message = this.createChatBotMessage(aiResponse);
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage("I'm not sure about that. Can you ask something else?");
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;
