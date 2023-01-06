example1 = () => new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('foo1');
  }, 3000);
});

example2 = () => new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('foo2');
  }, 3000);
});

doStuff = () => {
  const listExample = ['a', 'b', 'c'];
  let s = "";
  let promises = []; // hold all the promises
  listExample.forEach((item, index) => {
    s = item; //moved
    promises.push(example1() //add each promise to the array
      .then(() => {
        console.log(item); //moved
        console.log("First");
      }));
    promises.push(example2() //add each promise to the array
      .then(() => {
        console.log("Second");
      }));
  });
  Promise.all(promises) //wait for all the promises to finish (returns a promise)
    .then(() => console.log("The End"));
  return s;
};
doStuff();