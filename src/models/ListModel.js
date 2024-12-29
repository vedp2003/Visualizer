import { v4 as uuidv4 } from "uuid";

export default class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add a node to the end of the list
  push(value, color) {
    if (value === undefined || color === undefined) {
      throw new Error("Both value and color are required.");
    }

    const newNode = new Node(value, color);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  // Add a node to the beginning of the list
  unshift(value, color) {
    if (value === undefined || color === undefined) {
      throw new Error("Both value and color are required.");
    }

    const newNode = new Node(value, color);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return newNode;
  }

  // Remove a node from the end of the list
  pop() {
    if (!this.head) return null; // If the list is empty

    let removedNode;

    if (this.head === this.tail) {
      removedNode = this.head;
      this.head = this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next;
      }
      removedNode = this.tail;
      current.next = null;
      this.tail = current;
    }

    this.length--;
    return removedNode;
  }

  // Remove a node from the beginning of the list
  shift() {
    if (!this.head) return null; // If the list is empty

    const removedNode = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;

    this.length--;
    return removedNode;
  }

  // Update the value and color of a node at a specific index
  set(value, color, index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds.");
    }

    const node = this.get(index);
    if (node) {
      node.value = value;
      node.color = color;
      return true;
    }

    return false;
  }

  // Insert a new node at a specific index
  insert(value, color, index) {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of bounds.");
    }

    if (index === 0) return this.unshift(value, color);
    if (index === this.length) return this.push(value, color);

    const newNode = new Node(value, color);
    const previous = this.get(index - 1);
    if (!previous) throw new Error("Unable to find the previous node.");

    newNode.next = previous.next;
    previous.next = newNode;
    this.length++;
    return newNode;
  }

  // Remove a node at a specific index
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds.");
    }

    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const previous = this.get(index - 1);
    const removedNode = previous.next;
    previous.next = removedNode.next;

    if (removedNode === this.tail) {
      this.tail = previous;
    }

    this.length--;
    return removedNode;
  }

  // Get a node at a specific index
  get(index) {
    if (index < 0 || index >= this.length) {
      return null; // Out of bounds
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  // Reverse the entire list
  reverse() {
    if (this.length <= 1) return this;

    let prev = null;
    let current = this.head;
    this.tail = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
    return this;
  }

  // Clear the entire list
  clear() {
    this.head = this.tail = null;
    this.length = 0;
  }

  // Convert the list to an array for easier visualization/debugging
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push({ value: current.value, color: current.color });
      current = current.next;
    }
    return result;
  }
}

class Node {
  constructor(value, color) {
    if (value === undefined || color === undefined) {
      throw new Error("Both value and color are required.");
    }

    this.value = value;
    this.color = color;
    this.next = null;
    this.key = uuidv4(); // Unique identifier for React keys or other uses
  }
}
