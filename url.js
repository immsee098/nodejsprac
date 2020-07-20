const url = require('url');

const URL = url.URL;
const myURL = new URL('https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=240537888&start=wz&ptid=9&' +
    'utm_source=aladin&utm_medium=wizard&utm_campaign=choice&utm_content=welcome');
console.log("new URL() : ", myURL);
console.log('url.format() : ', url.format(myURL));
console.log("---------")

const parseUrl = url.parse("https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=246405958&start=wz&ptid=9" +
    "&utm_source=aladin&utm_medium=wizard&utm_campaign=choice&utm_content=welcome");
console.log("url.parse() : ", parseUrl);
console.log("url.format() : ", url.format(parseUrl));
