var aes256 = require("aes256");

var secret_key = "uI2ooxtwHeI6q69PS98fx9SWVGbpQohO";

export const to_Encrypt = (text) => {
  var encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};
export const to_Decrypt = (cipher, username) => {
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }

  var decrypted = aes256.decrypt(secret_key, cipher);
  return decrypted;
};
