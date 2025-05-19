class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    // Check if the message contains certain keywords and trigger custom responses
    if (message.includes("hotel")) {
      this.actionProvider.handleHotels();
    } else if (message.includes("restaurant")) {
      this.actionProvider.handleRestaurants();
    } else {
      // Use the custom AI response function
      this.actionProvider.handleAIResponse(message);
    }
  }
}

export default MessageParser;
