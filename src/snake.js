export class Snake {
  constructor(value) {
    this._head = {
      value,
      next: null,
      prev: null
    };
    this._tail = {
      value: null,
      next: null,
      prev: null
    };
    this._size = 1;
  }

  get head() {
    return this._head.value;
  }

  get tail() {
    return this._tail.value;
  }

  get size() {
    return this._size;
  }

  get positions() {
    let values = [this.head];
    let current = this._head;
    while (current.prev !== null) {
      values.push(current.prev.value);
      current = current.prev;
    }
    return values;
  }

  growTo(value) {
    const newHead = {
      value,
      next: null,
      prev: this._head
    };
    this._head.next = newHead;
    if (!this._tail.value) {
      this._tail = this._head;
    }
    this._head = newHead;
    this._size++;
  }

  moveTo(value) {
    const newHead = {
      value,
      next: null,
      prev: this._head
    };
    this._head.next = newHead;
    this._head = newHead;
    if (this._tail.value) {
      this._tail = this._tail.next;
    }
  }
}
