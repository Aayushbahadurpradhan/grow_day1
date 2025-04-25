export class ChainArray {
    constructor(array) {
      this._array = array;
    }
  
    map(callback) {
      this._array = this._array.map(callback);
      return this;
    }
  
    filter(callback) {
      this._array = this._array.filter(callback);
      return this;
    }
  
    reduce(callback, initialValue) {
      return this._array.reduce(callback, initialValue);
    }
  
    value() {
      return this._array;
    }
  }
  