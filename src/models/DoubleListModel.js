import { v4 as uuidv4 } from "uuid";

class Node {
  constructor(value, color) {
    this.value = value;
    this.color = color;
    this.next = null;
    this.prev = null; // Add prev
    this.key = uuidv4();
  }
}

export default class DoubleListModel {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value, color) {
    const newNode = new Node(value, color);
    if (!this.tail) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail; // Link prev
      this.tail = newNode;
    }
    this.length++;
    return newNode;
  }

  unshift(value, color) {
    const newNode = new Node(value, color);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode; // Link prev
      this.head = newNode;
    }
    this.length++;
    return newNode;
  }

  pop() {
    if (!this.tail) return null;

    const removedNode = this.tail;
    if (this.tail === this.head) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.length--;
    return removedNode;
  }

  shift() {
    if (!this.head) return null;

    const removedNode = this.head;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this.length--;
    return removedNode;
  }

  set(value, color, index) {
    const node = this.get(index);
    if (!node) return false;

    node.value = value;
    node.color = color;
    return true;
  }

  insert(value, color, index) {
    if (index < 0 || index > this.length) return null;

    if (index === 0) return this.unshift(value, color);
    if (index === this.length) return this.push(value, color);

    const newNode = new Node(value, color);
    const prevNode = this.get(index - 1);
    const nextNode = prevNode.next;

    prevNode.next = newNode;
    newNode.prev = prevNode;

    newNode.next = nextNode;
    if (nextNode) nextNode.prev = newNode;

    this.length++;
    return newNode;
  }

  remove(index) {
    if (index < 0 || index >= this.length) return null;

    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const node = this.get(index);
    const prevNode = node.prev;
    const nextNode = node.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    this.length--;
    return node;
  }

  get(index) {
    if (index < 0 || index >= this.length) return null;

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  reverse() {
    let current = this.head;
    this.tail = this.head;

    while (current) {
      const prev = current.prev;
      current.prev = current.next;
      current.next = prev;

      if (!current.prev) {
        this.head = current;
      }

      current = current.prev;
    }
    return this;
  }
}
