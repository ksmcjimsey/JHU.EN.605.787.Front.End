// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)

// Immediately Invoked Function Expression (IIFE)
(function () {

    var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

    // STEP 10:
    // Loop over the names array and say either 'Hello' or "Good Bye"
    // using the 'speak' method or either helloSpeaker's or byeSpeaker's
    // 'speak' method.
    // See Lecture 50, part 1
    for (var count = 0; count < names.length; count++) {

      // STEP 11:
      // Retrieve the first letter of the current name in the loop.
      // Use the string object's 'charAt' function. Since we are looking for
      // names that start with either upper case or lower case 'J'/'j', call
      // string object's 'toLowerCase' method on the result so we can compare
      // to lower case character 'j' afterwards.
      // Look up these methods on Mozilla Developer Network web site if needed.
      //console.log(names[count]);
      var firstLetter = names[count].toLowerCase().charAt(0);
      //console.log(firstLetter);

      // STEP 12:
      // Compare the 'firstLetter' retrieved in STEP 11 to lower case
      // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
      // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
      // name in the loop.
      if ("j" === firstLetter) {
        //console.log("It equals J")
        byeSpeaker.speak(names[count]);
      } else {
        helloSpeaker.speak(names[count]);
      }

    }   // End of for loop

    console.log("****************************************");  // Add a break between outputs


    // array prototype map
    greetingMap = names.map(n => returnAndPrintMessage(n));
    //console.log (greetingMap);

    console.log("****************************************");  // Add a break between outputs


    // Part 3. Reducer section
    
    hello = [];
    bye = [];   // Had to have arrays here to get reducer to work.
    // console.log (hello, bye);

    // Part 3b. reduce
    names.reduce(function(aC, cV,cI, aR) {

      //console.log(aC, cV, cI, aR);
      var firstLetter = cV.toLowerCase().charAt(0);
      if ("j" === firstLetter) {
        bye.push(returnMessage(cV));
      } else {
        hello.push(returnMessage(cV));
      }
      //console.log (bye, hello);
      
    }, {hello: [], bye: []} );

    // Part 3b. Loop over new arrays
    //console.log ("Hello: ", hello);
    //console.log("Goodbye: ", bye);
    hello.forEach(function(element) {
      console.log(element);
    });
    bye.forEach(function(element) {
      console.log(element);
    });

  })();   // IIFE wrap - Step 1


  // 2b. Named function to pass to map prototype function
  function returnAndPrintMessage (name) {
    //console.log(name);
    var firstLetter = name.toLowerCase().charAt(0);
    if ("j" === firstLetter) {
      console.log(byeSpeaker.speakSimple(name));
      return byeSpeaker.speakSimple(name);
    } else {
      console.log(helloSpeaker.speakSimple(name));
      return helloSpeaker.speakSimple(name);
    }
  }

  // 3a. speakSimple used in the function called by Array.prototype.reduce
  function returnMessage (name) {
    //console.log(name);
    var firstLetter = name.toLowerCase().charAt(0);
    if ("j" === firstLetter) {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }