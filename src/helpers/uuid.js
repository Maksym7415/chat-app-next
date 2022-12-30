export const uuid = (keySize = 4, customAlpabet) => {
  const alphabet =
    customAlpabet ||
    'Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz9';
  const key_len = alphabet.length;
  const randomArrayOfSymbols = new Array(keySize).fill().map(item => {
    const random = Number((Math.random() * key_len).toFixed());
    return alphabet[random >= key_len ? key_len - 1 : random];
  });
  return generationEngine(randomArrayOfSymbols, randomArrayOfSymbols.length);
};

const generationEngine = (randomArrayOfSymbols, maxSize) => {
  let id = '';
  for (let i = 0; i < randomArrayOfSymbols.length; i++) {
    const random = Number((Math.random() * maxSize).toFixed());
    id += randomArrayOfSymbols[random >= maxSize ? maxSize - 1 : random];
  }
  return id;
};
