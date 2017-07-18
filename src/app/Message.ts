export class Message {

  timestamp: number;
  sender: String;
  message: String;
  constructor(timestamp: number, sender: String, message: String) {
    this.timestamp = timestamp;
    this.sender = sender;
    this.message = message;
  }
}
