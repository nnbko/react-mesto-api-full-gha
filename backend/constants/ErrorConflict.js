/* eslint linebreak-style: ["error", "windows"] */
class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = ErrorConflict;
