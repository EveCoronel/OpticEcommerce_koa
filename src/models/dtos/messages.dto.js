class MessageDTO {
    constructor(username, text) {
      this.username = username;
      this.text = text;
      this.date = new Date().toISOString();
    }

    
  }
  
  module.exports = MessageDTO;
  