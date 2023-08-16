// function hashFunc(input) {
//   let hash = "";
//   for (let i = 0; i < input.length; i++) {
//     let tempVal = "";
//     tempVal = input.charCodeAt(i);
//     hash += tempVal.toString(16);
//   }
//   return hash;
// }

// const Hashes = require("jshashes");
function hashFunc(input){
  var MD5 = new Hashes.MD5().hex(input)
  return MD5;
}

