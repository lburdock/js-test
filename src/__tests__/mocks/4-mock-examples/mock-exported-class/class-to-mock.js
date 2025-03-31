const oneHrInMs = 60 * 60 * 1000;

export default class DefaultClassToMock {
  constructor() {
    this.now = new Date();
  }

  isLiveNow(date) {
    console.log("isLiveNow actual");
    const diff = this.now - new Date(date);
    return diff >= 0 && diff < oneHrInMs;
  }
}

export class NamedClassToMock {
  constructor() {
    this.now = new Date();
  }

  isBeforeNow(date) {
    console.log("isBeforeNow actual");
    return new Date(date) - this.now < 0;
  }
}
