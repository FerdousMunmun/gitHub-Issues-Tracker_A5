1.What is the difference between var, let, and const?
var
পুরোনো JavaScript variable
একই variable আবার declare করা যায়
var a = 10;
var a = 20

let
নতুন JavaScript variable
value change করা যায়
আবার declare করা যায় না
let a = 10;
a = 20;
const
value change করা যায় না
আবার declare করা যায় না
const a = 10

2.What is the spread operator (...)?
Spread operator array বা object কে expand (ভেঙে) করে।
Example:  const numbers = [1,2,3];
const  newNumbers = [...numbers,4,5];
Result: [1,2,3,4,5]
Spread operator array বা object copy বা merge করতে ব্যবহার হয়।

3.Difference between map(), filter(), forEach()
forEach()
array loop করে কিন্তু new array return করে না
numbers.forEach(num => console.log(num));
map()
loop করে এবং new array return করে
const newArray = numbers.map(num => num * 2);

filter()
condition অনুযায়ী array filter করে
const result = numbers.filter(num => num > 5);

4.What is an arrow function?
Arrow function হলো short function syntax।
Normal function
function add(a,b){
return a+b;
}

Arrow function
const add = (a,b) => a+b;
Arrow function হলো ছোট করে function লেখার উপায়।

5.What are template literals?
Template literal দিয়ে string এর ভিতরে variable ব্যবহার করা যায়।
Backtick (``) ব্যবহার করা হয়।
Example:
let name = "Rahim";

console.log(`Hello ${name}`);
Output:Hello Rahim
Template literal দিয়ে string এর ভিতরে variable বসানো যায়।
