// Questions from Datava
//a) What does the following print to the console log?
//b) What is the correct way to handle the response from the post?
var response = 'Nothing yet';
$.post(
  'someUrl', // URL to send the request to
  { prop1: 'param1', prop2: 'param2' }, // properties to send to the server
  function (data, textStatus, jqXHR) {
    // function that gets run with the response of the server
    // Server responds with data = 'Hello world!';
    // The server responds in typically 50-60ms under normal conditions.
    response = data;
  }
);
console.log('1');
console.log('Response 1: ' + response);
console.log('2');
setTimeout(function () {
  console.log('Response 2: ' + response);
}, 0);
console.log('3');
setTimeout(function () {
  console.log('Response 3: ' + response);
}, 100);
console.log('4');

('1');
('Response 1:  Nothing yet');
('2');
('3');
('4');
('Response 2: Nothing yet');
('Response 3: Hello world!');

//The correct way to handle this response would be:

// 1) put the console.log or other necessary code inside the anonymous function of the ajax request and get rid of the response 3 output

var response = 'Nothing yet';
$.post('someUrl', { prop1: 'param1', prop2: 'param2' }, function (
  data,
  textStatus,
  jqXHR
) {
  response = data;
  console.log('Correct way: ' + response);
});

// setTimeout(function () {
//   response = 'Hello world!';
//   console.log('correct way: ' + response);
// }, 55);

console.log('1');
console.log('Response 1: ' + response);
console.log('2');
setTimeout(function () {
  console.log('Response 2: ' + response);
}, 0);
console.log('3');
console.log('4');

// 2) Wrap the response in a promise. Handle the response with a .then and all necessary code inside the .then

var response = 'Nothing yet';
function serverResponse() {
  return new Promise(resolve =>
    $.post('someUrl', { prop1: 'param1', prop2: 'param2' }, function (
      data,
      textStatus,
      jqXHR
    ) {
      response = data;
      resolve(response);
    })
  );
}

// function serverResponse() {
//   return new Promise ( response => {
//     setTimeout(function () {
//       response ('Hello world!');
//     }, 55);
//   })
// }

serverResponse().then(res => console.log('Correct way: ' + res));
console.log('1');
console.log('Response 1: ' + response);
console.log('2');
setTimeout(function () {
  console.log('Response 2: ' + response);
}, 0);
console.log('3');
console.log('4');

// 3) Handle the promise in the previous way using async/await

var response = 'Nothing yet';
function serverResponse() {
  return new Promise(resolve =>
    $.post('someUrl', { prop1: 'param1', prop2: 'param2' }, function (
      data,
      textStatus,
      jqXHR
    ) {
      response = data;
      resolve(response);
    })
  );
}

// function serverResponse() {
//   return new Promise ( response => {
//     setTimeout(function () {
//       response ('Hello world!');
//     }, 55);
//   })
// }

async function messageFromServer() {
  var msg = await serverResponse();
  console.log('Correct way: ', msg);
}

messageFromServer();

console.log('1');
console.log('Response 1: ' + response);
console.log('2');
setTimeout(function () {
  console.log('Response 2: ' + response);
}, 0);
console.log('3');
console.log('4');
