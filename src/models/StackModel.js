class StackNode {
    constructor(value, color) {
      this.value = value;
      this.color = color;
      this.next = null;
    }
  }
  
  export default class StackModel {
    constructor() {
      this.top = null;
      this.length = 0;
    }
  
    // Add a value to the top of the stack
    push(value, color) {
      const newNode = new StackNode(value, color);
      newNode.next = this.top;
      this.top = newNode;
      this.length++;
      return newNode;
    }
  
    // Remove and return the value from the top of the stack
    pop() {
      if (!this.top) return null;
      const poppedNode = this.top;
      this.top = this.top.next;
      this.length--;
      return poppedNode;
    }
  
    // Clear the entire stack
    clear() {
      this.top = null;
      this.length = 0;
    }
  
    // Check if the stack is empty
    isEmpty() {
      return this.length === 0;
    }
  }
  