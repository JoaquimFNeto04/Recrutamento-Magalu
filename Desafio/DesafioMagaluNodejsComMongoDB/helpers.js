class Helpers {
    ConvertBasic(username, password) {
      return btoa(username + ':' + password)
    }
  }
  
  module.exports = Helpers
  