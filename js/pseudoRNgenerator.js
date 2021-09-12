//var web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const ethereumButton = document.querySelector('.enableEthereumButton');
var canvas = document.getElementById('stage');
var options = {
  title: {    
    display: true,
    text: 'サンプルチャート'
  }, 
  scales: {
      yAxes: [
        //y軸
        {
          ticks: {
            //軸のメモリ
            beginAtZero: true //0から始まる
          },
          gridLines: {
            //y軸の網線
            display: false //表示するか否か
          },
          scaleLabel: {
            //表示されるy軸の名称について
            display: true, //表示するか否か
            labelString: "",
            fontSize: 15
          }
        }
      ]
  }
};


/*
async function digestMessage(message){
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hash;
}

async function sha256(message){
    const uint8_msg  = new TextEncoder().encode(message)
    const digest = await crypto.subtle.digest('SHA-256', uint8_msg)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('') // convert buffer to byte array then // convert bytes to hex string
}
*/

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


function toCountDict(array){
    let dict = {};
    for(let key of array){
        dict[key] = array.filter(function(x){return x==key}).length;
    }
    return dict;
}



ethereumButton.addEventListener('click', () => {

  const dt_text = document.querySelector('.datetime');
  //dt_text.innerHTML = seed;
  const result = document.querySelector('.result');

(async ()=>{
    const array = Array(50000).fill(0);
    const result = await Promise.all(array.map(async (v)=>{
        const seed = Math.random(100);
        //const randInt = Math.floor(Math.random() * 100);
        const randInt = await getAsyncPseudoRandomNumber(seed, 100, 0);
        return randInt;
    }));

    result_dict = toCountDict(result);

    var mydata = {
        labels: Object.keys(result_dict),
        datasets: [
          {
            label: 'サンプリング結果',
            hoverBackgroundColor: "rgba(255,99,132,0.3)",
            data: Object.values(result_dict),
          }
        ]
    };
    
    var chart = new Chart(canvas, {
  
        type: 'bar',  //グラフの種類
        data: mydata,  //表示するデータ
        options: options  //オプション設定
      
    });
    /*
    console.log(Object.values(toCountDict(result)).reduce(function(a, b) {
        return Math.max(a, b);
    }));
    console.log(result.reduce(function(a, b) {
        return Math.min(a, b);
    }));
    console.log(result.reduce(function(sum, element){
        return sum + element;
      }, 0))/1000;
      */
})();

}); 
