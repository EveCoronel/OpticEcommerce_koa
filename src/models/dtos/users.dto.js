class UserDTO {
  constructor(userItem) {
    Object.assign(this, userItem);
    this.updatedAt = new Date();
  }
}

module.exports = UserDTO;
