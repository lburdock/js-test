/* eslint-disable no-console */
export class ClassToMock {
  constructor() {
    this.now = new Date();
  }

  isBeforeNow(date) {
    console.log("isBeforeNow actual");
    return new Date(date) - this.now < 0;
  }
}
