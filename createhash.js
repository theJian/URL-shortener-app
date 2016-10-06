function randomChar() {
  let n = Math.floor(Math.random() * 62);
  if(n < 10) return n;
  if(n < 36) return String.fromCharCode(n + 55);
  return String.fromCharCode(n + 61);
}

function createHash(len) {
  let str = '';
  while(str.length < len) str += randomChar();
  return str;
}

module.exports = createHash;
