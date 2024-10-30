import { Component } from '@angular/core';

@Component({
  selector: 'app-route',
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.css"
})

export class ChatComponent {
  userMessage: string = '';
  chatHistory: { user: string, bot: string, intent: string, emotion: string }[] = [];


  async sendMessage() {
    if (!this.userMessage.trim()) {
      return; // Skip if the input is empty
    }

    // Add the user's message to the chat history
    this.chatHistory.push({ user: this.userMessage, bot: '', intent: '', emotion: '' });

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: this.userMessage })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Update the chat history with the bot's response
      this.chatHistory[this.chatHistory.length - 1] = {
        user: this.userMessage,
        bot: data.response,
        intent: data.intent,
        emotion: data.emotion
      };

      // Clear the user input after sending the message
      this.userMessage = '';

    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}
