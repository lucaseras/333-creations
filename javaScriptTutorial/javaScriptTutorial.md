##### Created by Lucas Eras
# Quick JavaScript tutorial

## Introduction
This is a quick introduction on JavaScript using a simple HTML file that
students can run in their browser and see the result in real time.
The files in the folder should be shared to the students.

## Using JavaScript
The next step is to show how JavaScript can be added to an HTML file. Let us
show the two main ways of doing it: first, by using the `<script>`, and second
by using a JS source file.

### 1. Using the `<script>` tag in head or in body

In the head of the file, let's add the following (see file
main_hello_world.html):
```html
<script>
console.log('Hello, World!')
</script>
```

Students will have to figure out how to open Developer Tools and open the
console.

### 2. Using `<script src=>`

Rather than writing the JS code directly in the HTML file, we can write it in a
separate file and refer to that file using the script tag.

Show the file main.js that contains some JS code to the class.

Let's add that code to the html using the script(open main_script_src.html in
text editor):

```html
<script src='main.js'> </script>
```

Ask students to look at the console again.


Finally, to show the ways that JavaScript communicates with the HTML code, show
the code main_more.html to the students. The different elements in this file:

```html

<html>
<head>
	<script> let counter = 0; </script>
</head>
<body>
	<input type="text" id="input" value=""> </input>
	<button id="submit">PRINT!</button>
	<p id='times'>You printed 0 times</p>

	<script> 
		let submitButton = document.getElementById("submit");

		submitButton.onclick = function() {
		let inputValue = document.getElementById("input").value;

		counter += 1;

		document.getElementById("times").innerHTML = "You printed " +
		counter + " times"

		alert(inputValue)
		};
	</script>
</body>
</html>
```
1. There is `<script> let counter = 0; </script` in the `<head>` tag. This
	 always runs first before the content of the page is generated.
2. We created an input box using the `<input>` tag. Notice that it has an `id` —
	 this is the value we use to identify this element when programming with JS.
3. We created a button using the `<button>` tag with a `'submit'` id.
4. We finalize the visual of the body by creating a paragraph with the `'times'`
	 id.
5. Using the `<script>` tag we create JavaScript code to demonstrate how it
	 relates to the HMTL file content.
6. We create a variable called `submitButton` — this is the first instance of a
	 connection between the HTML content and the JS code. Using the `document`
	 interface (students can learn more about it in the
	 [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document)).
	 We use the getElementById() method to assing our button to the submitButton
	 variable.
7. We use the onclick (which is a [GlobalEventHandler](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick$)) to check when the button is clicked. The handler takes a function, which we have created as an anonymous function using the `function() {}` syntax.
8. Inside the onclick event, we get the input value from our `<input>` element
	 using `getElementById` once again. Notice that just doing
	 `document.getElementById("input")` would not give us the value inside the
	 input box. Instead, we would receive an HTML input object (which can also be
	 useful).
9. We add 1 to the counter that was created in the head of the file — here we
	 demonstrate that JS code can connect to itself in different parts of the HTML
	 file (always going from top to bottom).
10. We then use the `.innerHTML` property to change the value inside the
		paragraph with id `'times'`, making sure that it contains the correct counter
		value.
11. We finalize the function by creating a browser alert that contains the input
		from the `<input>` tag that we stored in `inputValue`.
		
## Console.log()
Data is printed, or logged, to the console with the console.log() function (think of print in Python)

## Declaring Variables
With the ES6 update that was launched in 2015 occured, a lot has changed in the
way JavaScript works, incluidng varible declaration.
### 1. var
Using var to create a variable is the old style of varible declaration (from
before the update). This is how it looks like: 

```javascript
var newVariable = 10;
var variableWithNoValue;
```

The primary issue with var is that it is not scope bounded. Let me create an
example of what that means:

```javascript
var x = 10;
// a bunch of other code here ...
function fun() {
    var x = 2;
}

fun();
console.log(x); // prints 2. The value 10 is lost! 
```

### 2. let
Let was introduced in the update. It is block scoped (blocks are any structures
that have brackets {} around them). So, by modifying the previous example:

```javascript
let x = 10;
// a bunch of other code here ...
function fun() {
    let x = 2;
}

fun();
console.log(x); // prints 10. This is a safer way of going about variables!
```
Notice that the variable x can still be re-declared with a different value.
```javascript
let x = 10;
let x = 5;
console.log(x); // prints 5
```

### 3. const

Meanwhile, const variables do not allow re-declarations. If we try the
following:
```javascript
const x = 10;
const x = 5;
```
This would give us the following syntax error:
`SyntaxError: Cannot declare a const variable twice (...)`

Although we cannot re-declare a const variable, it is still possible to mutate
the variable (the only thing that const does is lock the memory address of the
varible, so the value can still change).

## Datatypes
Some of JavaScript datatypes are:
### 1. undefined

Example: 
```javascript
let variable;
typeof variable === 'undefined'; // returns true
```
### 2. Boolean

Booleans are always either `true` or `false`. The `and` operation is spelled
like `&&` and the or operation is `||`. The not operation is done by putting an
`!` before a boolean value.
### 3. Number

We can use the increment and decrement operators:

```javascript
let a = 10;
a++;
let b = 20;
b--;
```

Expect all of the operations that you have in other languages. Also, the Math
module can be very helpful. Example:

```javascript
let randomNumber = Math.random(); // Math.random() returns a random number from 0
to 1

// If we wanted to create a random integer between 0 and 10:
let randomInteger = Math.floor(randomNumber * 10); // we multiply the
randomNumber by ten and then approximate it to the nearest smallest integer.
```
### 4. String
Strings are what you would expect. Also, JavaScript converts other data types to
string automatically when concatenating them with strings. For example:
```javascript
let aNumber = 4;
let aString = "The number " + aNumber + " is now part of this string";
console.log(typeof aString) // prints "String"
```
Another nice way of concatenating other objects in strings is by using the
backtick ( \` ) symbol, like this:

```javascript
let aString = `The number ${aNumber} is now part of this string`;
```

### 5. Objects
All of the above datatypes are considered "primitive" in JavaScript. Objects,
however, are considered "structural" types, And they are quite important. Let us
create a simple object:

```javascript
const car = {
    color: 'blue',
    maxSpeed: 100,
}
```
As you can see, an object contains multiple `"property": value` pais that are
separated by commas. Now that we have created our car, its properties can be
accessed using the dot notation:

```javascript
console.log(car.color); // prints blue

car.maxSpeed = 120;
console.log(car.maxSpeed); // prints 120
```

Notice how despite the object being created using the const declaration, we can
still modify its properties, as we've done with maxSpeed.

### 6. Null

Null is a primitive data type, and it represents the intentional absence of value.

```javascript
let x = null;
```

## Comments

Single line comments

```javascript
// This line will denote a comment.
```

Multi-line comments

```javascript
/*  
The line is a comment
and this line is a comment.
*/
```

## Arrays
Arrays are objects, but they function in a specified way, with specific
functions that only apply to them. To create an array we use brackets:

```javascript
let names = ['Sebastian', 'Sophie', 'Lucas'];
console.log(names.length);     //arrays have a length property
console.log(names[1]);         //we can access array values with the bracket notation
```
Lists start with a 0 index, so `names[0]` would give us `'Sebastian'`.

Some important array functions:

```javascript
let fruits = ['Apple', 'Banana'];

// pop() removes the last element of the list (and returns it)
let lastFruit = fruits.pop()
// ['Apple', 'Banana', 'Orange']

// push() adds elements to the end of the array
fruits.push('Orange', 'Tomato');
// ['Apple', 'Banana', 'Orange', 'Tomato']

// shift() removes the first element of the array (and returns it)
let firstFruit = fruits.shift()
// ['Banana', 'Orange']

// unshift() adds elements to the beginning of the array
fruits.unshift('Mango')
// ['Mango', 'Banana', 'Orange']

// .indexOf(item) returns the index position of an item
fruits.indexOf('Banana')
// 1

// .forEach(function(item, index, array){}) iterates over the elements of the array
// we can omit parameters that are not needed
fruits.forEach((item) => console.log(item))
// prints:
// 'Mango'
// 'Banana'
// 'Orange'

// .map(function(currentValue, index, array){}) creates a new array populated
// with the results of calling a provided function on every element of the array
let fruiting = fruits.map((value) => `${value}ing`)
// ['Mangoing', 'Bananaing', 'Orangeing']

// .filter(function(currentValue, index, array){}) creates a new array populated
// only with the values that the inner function returned true for
let fruitsStartingWithO = fruits.filter((value) => value[0] === 'O')
// ['Orange']
```
More array functions can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)


## Array Spread Syntax
This: `...` is the spread syntax. It allows for array elements to be expanded
out of the array structure, which allows us to use the array values as function
parameters, or as elements. An example:

```javascript
function sum(x, y) {
    return x + y
};
let pair = [5, 2];
sum(...pair);
// 7
```

## Comparison operations
See a list in https://www.w3schools.com/js/js_comparisons.asp

## Conditional statement
To do an 'if' statement in JavaScript, we do:

```javascript
if (boolean expression) {
    do this
}
```

And an 'if...else' statement:

```javascript
if (boolean expression) {
    do this
} else {
    do that
    }
```

And an "else if" statement:

```javascript
const size = 10;
if (size > 100) {
  console.log('Big');
} else if (size > 20) {
  console.log('Medium');
} else if (size > 4) {
  console.log('Small');
} else {
  console.log('Tiny');
}
```

Another way to write an if...else statement is by using the ternary operator,
which can often be written in a single line:
```javascript
function getFee(isMember) {
  return (isMember ? '$2.00' : '$10.00');
}
```
If the value before the `?` returns true, then the result will be the value
right before `:`, which in this case is `$2.00`. It will return the right one
if otherwise.

## Logical Operators

|| is the logical OR operator
```javascript
true || false; // true
```

&& is the logical AND operator
```javascript
true && false; // false
```

## Truthy and Falsy

In JavaScript, values evaluate to true or false when evaluated as Booleans.

Values that evaluate to true are known as truthy, and values that evaluate to false are known as falsy.

Falsy values include:
- false

- 0

- empty strings

- null 

- undefined

- NaN. 

All other values are truthy.

## Switch Statement

The switch statements provide a means of checking an expression against multiple case clauses. If a case matches, the code inside that clause is executed.

The case clause should finish with a break keyword. If no case matches but a default clause is included, the code inside default will be executed.
```javascript
const food = 'salad';

switch (food) {
  case 'oyster':
    console.log('The taste of the sea');
    break;
  case 'pizza':
    console.log('A delicious pie');
    break;
  default:
    console.log('Enjoy your meal');
}

// Prints: Enjoy your meal
```
Note: If break is omitted from the block of a case, the switch statement will continue to check against case values until a break is encountered or the flow is broken.

## Declaring functions

There are multiple ways of declaring a fuction. An example of how the same
function can be defined in different ways:

```javascript
// Define a function using function expressions:
function add(x, y) {
    return x + y;
}

// To call the function:
add(2, 5) // returns 7;
// The following methods were introduced in ES6;

// Notice that here function(x,y) {} is, actually, an anonymous function (the
// function itself doesn't have a name);
const add = function(x, y) {
    return x + y;
}

// Define a function using arrow function notation:
const add = (x, y) => {return x + y};
// This is similar to the one above, but nicely abreviated

// Define a function using concise arrow notation: 
const add = (x, y) => x + y;
// When the function does not contain more than one line in the body, we can omit the 'return' and the brackets
```

If you are familar to curried functions because of SML, it is also possible to
do that in JS:

``` javascript 
const add = x => y => x + y

add (3) (10) // returns 13
```

And, of course, functions can take functions as inputs (which will happen a
lot). They are commonly called callback functions:
```javascript
const add = (x, y) => x + y;
const double = (x, addFun) => addFun(x, x);

add(10) // returns 20
```

## Asynchronous calls overview
To create asynchronous calls, we have to use the Promise object. A promise can
be in three diferent states:
1. pending
2. resolved
3. rejected

If the promise is pending, it has not returned a value yet. When it does return
a value, its state is either resolved or rejected (if students have taken SML
classes, they might find it useful to think of this as slightly similar to the
`option` type).

The syntax of a promise:

```javascript
const promiseName = new Promise((resolve, reject) => {})
```

`resolve` and `reject` are functions pre-defined by the JS engine. Let us
define the following promise:

```javascript
var someBool = true;

const promise = new Promise((resolve, reject) => {
    if (someBool) {
        resolve('The bool was true!');
    } else {
        reject('The bool was so false!');
});
```

This way, we have created `promise` and defined when it would return the
function resolve and when it would return reject. The values given to resolve
and reject are the values we will eventually have access to, once the promise
goes from pending to either resolve or rejected states.

Now, to get access to the result of the promise (when it is available), we use
the `.then()` method. It takes a function that handles the outcome of the promise. Example:

```javascript
var someBool = true;

const promise = new Promise((resolve, reject) => {
    if (someBool) {
        resolve('The bool was true!');
    } else {
        reject('The bool was so false!');
});

promise.then((resolveValue) => console.log(resolveValue)) // this will log
// 'The bool was true!'
```
We gave the `.then()` method a function (in the form of the abreviated anonymous
function) that has one input, the `resolvedValue`, and simply logs the result of
the promise. Remember that the function inside `then` will only occur once the
promise is not pending anymore (which makes it async). 

If someBool was false, the promise would end up in the rejected state. We can
use the `.catch()` method to deal with this (similar to `.this()`): 
```javascript
var someBool = false;

const promise = new Promise((resolve, reject) => {
    if (someBool) {
        resolve('The bool was true!');
    } else {
        reject('The bool was so false!');
});

promise.catch((rejectValue) => console.log('Oh, our promise failed! It returned
the value: ${rejectValue}`)) // this will log 'Oh, our promise failed! It
// returned the value: The bool was so false!'
```

If there are multiple elements that depend on each other to be executed (and
they are all promises), we can chain the `then` (that is, if the function given
to a `then` returns another promise value, we can do another (external) `then`.
Good examples [here](https://javascript.info/promise-chaining)).

Moreover, if we are creating a function that has to deal with multiple promises,
we can use the `async...await` syntax to simplify the code, so that we don't
have to write an ugly chain of `.then()`. An example from the documentation:


```javascript
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  }); // setTimeout is a function that makes the code wait for some specified
      // amount of time to return

  let result = await promise; // wait until the promise resolves (*)

  alert(result); // "done!"
}

f();
```
