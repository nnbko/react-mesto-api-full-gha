/* eslint linebreak-style: ["error", "windows"] */
class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
module.exports = ErrorForbidden;
