class QueueNode {
    constructor(value, color) {
      this.value = value;
      this.color = color;
      this.next = null;
    }
  }
  
  export default class QueueModel {
    constructor() {
      this.front = null;
      this.rear = null;
      this.length = 0;
    }
  
    // Add a value to the end of the queue
    enqueue(value, color) {
      const newNode = new QueueNode(value, color);
      if (this.rear) {
        this.rear.next = newNode;
      } else {
        this.front = newNode;
      }
      this.rear = newNode;
      this.length++;
      return newNode;
    }
  
    // Remove a value from the front of the queue
    dequeue() {
      if (!this.front) return null;
      const dequeuedNode = this.front;
      this.front = this.front.next;
      if (!this.front) {
        this.rear = null; // If the queue becomes empty, reset rear
      }
      this.length--;
      return dequeuedNode;
    }
  
    // Clear the queue
    clear() {
      this.front = null;
      this.rear = null;
      this.length = 0;
    }
  
    // Check if the queue is empty
    isEmpty() {
      return this.length === 0;
    }
  }
  