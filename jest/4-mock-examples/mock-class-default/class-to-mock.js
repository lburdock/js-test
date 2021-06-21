/* eslint-disable no-console */
export default class ClassToMock {
  constructor() {
    this.now = new Date();
  }

  isBeforeNow(date) {
    console.log("isBeforeNow actual");
    return new Date(date) - this.now < 0;
  }
}
