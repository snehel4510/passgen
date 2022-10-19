const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const fname = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomChar
};

generateEl.addEventListener('click',()=>{
    const len = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
    resultEl.innerText = generatePassword(len, hasLower, hasUpper, hasNumber, hasSymbol);
})

function generatePassword(len, lower, upper, number, symbol) {
    let password= '';
    const cnt = lower + upper + number + symbol;
    if(cnt>len) {
        alert("minimum password size if 4");
        return "";
    }
    if(len>20) {
        alert("maximum password size if 20");
        return "";
    }
    const arr = [{lower},{upper},{number},{symbol}].filter(i => Object.values(i)[0]);
    if(cnt==0) return '';
    for(let i=0;i<len;i+=cnt) {
        arr.forEach(t => {
            const func = Object.keys(t)[0];
            password += fname[func]();
        })
    }
    return password.slice(0,len).shuffle();
}

clipboard.addEventListener('click', () => {
    const text = document.createElement('textarea');
    const password = resultEl.innerText;
    if(!password) return;
    text.value = password;
    document.body.appendChild(text);
    text.select();
    document.execCommand('copy');
    text.remove();
    resultEl.innerText = "";
    alert('password copied to clipboard');
})

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}

function getRandomChar() {
    const symbol = "!@#$%^&*_-+=:.<>;|'?/{}[]()~`₹"
    return symbol[Math.floor(Math.random()*symbol.length)];
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}