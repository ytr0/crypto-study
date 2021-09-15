
/**
 * a hosted version of moment.js has been added to this
 * project's index.html. grab the relevant <script></script> tag
 * from there to add it to your own project.
 */

 async function getAsyncPseudoRandomNumber(seedInStr, min, max){
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
 

function setup() { 
  createCanvas(600, 600);
  noLoop();
} 

const api_key = "YVCX241IQZTK5QSZXXMKDWN928DZD8RDIN"
const api_uri = "https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=1631515227&closest=before&apikey"


async function draw() { 
  background(0);
  fill(255);
  
  var y = 50;
  var x = 200;
  var space = 50;
  
  const fetched = await fetch("https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=1631515227&closest=before&apikeyYVCX241IQZTK5QSZXXMKDWN928DZD8RDIN", {mode:"cors"})
  .then(response => response.text())
  const randIntFromDate = await getAsyncPseudoRandomNumber(fetched, 0, 1000)
  showDate("yesterday_block_number", randIntFromDate, x, y);
	y += space;
  
  await showDate("daysjs().format", dayjs().format('YYYY-MM-DDTHH:mm:ss:SSSZ[Z]'), x, y);
	y += space;

  const randInt = await getAsyncPseudoRandomNumber(dayjs().format('YYYY-MM-DDTHH:mm:ss:SSSZ[Z]'), 0, 1000);
  await showDate("randInt", randInt, x, y);

}


async function showDate(txt, date, x, y) {  
  fill(255);
  textAlign(RIGHT);
  text(txt + "    =>    ", x, y);
  textAlign(LEFT);
  text(date, x, y);
  console.log(date);
  //background(0);
}

function mousePressed() {
  if (check==true) {
    loop();
  }
}

function mouseReleased() {
  noLoop();
}