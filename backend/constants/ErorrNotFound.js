/* eslint linebreak-style: ["error", "windows"] */
class ErorrNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = ErorrNotFound;
