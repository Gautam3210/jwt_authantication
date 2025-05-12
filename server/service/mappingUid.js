const jwt = require("jsonwebtoken");
const secretKey = 'gautam@3210'


function mappingSet(user) {
  const token = jwt.sign({
    name: user.name,
    email: user.email
  },secretKey)
  return token
}

function mappingGet(token) {
  const user = jwt.verify(token, secretKey)
  return user;
}

module.exports = {
  mappingSet,
  mappingGet,
};
