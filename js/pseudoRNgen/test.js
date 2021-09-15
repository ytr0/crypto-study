const text = 'An obscure body in the S-K System, your majesty. The inhabitants refer to it as the planet Earth.';

async function getAsyncPseudoRandomNumber(seedInStr, max, min){
    const encoder = new TextEncoder();
    const data = encoder.encode(seedInStr);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hash_decimal = Array.from(new Uint8Array(hash)).map(v => parseInt(v, 10)).join('')
    const result = min + hash_decimal % (max - min + 1)
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(result);
    }, 100);
  });
}

//usage
const digestHex = await getAsyncPseudoRandomNumber(text);
console.log(digestHex);