module.exports = class ErrorResponse {
  constructor(name, message, errors = []) {
    this.name = name;

    this.message = message;

    this.errors = errors;
  }
};
