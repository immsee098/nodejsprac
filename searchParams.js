const {URL} = require('url');

const myURL = new URL("https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=246405958&start=wz&" +
    "ptid=9&utm_source=aladin&utm_medium=wizard&utm_campaign=choice&utm_content=welcome");
console.log("searchParams : ", myURL.searchParams);
console.log("searchParams.getAll() : ", myURL.searchParams.getAll("utm_source"));
console.log("searchParams.key() : ", myURL.searchParams.keys());

myURL.searchParams.append("filter", "es3");
myURL.searchParams.append("filter", "es5");
console.log(myURL.searchParams.getAll("filter"));

console.log('searchParams.toString() : ', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();