import './App.css';
import firebase from './firebase.js';
import { Component } from 'react';
import { randomNumber } from './randomizers.js';
import DisplayRandomGoal from './DisplayRandomGoal.js';
import DisplayForm from './DisplayForm.js';

// 1. configure firebase on react -- 
// 2. connect firebase data to the state -- 
// 3. map through the 'goal' state to display each 'goal' -- 
// 4. add remove button
// 5. on remove button click, remove the 'goal' that was clicked on, remove it from firebase
// 6. create input form, to get user input value 
// 7. on submit of form, submit user input value to firebase


class App extends Component {
  
  // getRandomNumber = () => {
  generatedNumber = randomNumber();
    // }

  // goalsArray = [];

  constructor() {
    super();
    this.state = {
      featuredGoal: '',
      goals: [
        {
          id: "a million",
          goal: "testing 123"
        }
      ],
      userInput: ''
    }
  }

  secondTestArray = [
    7, 8, 9, 10, 11, 12
  ]

  componentDidMount() {

    // "Here we create a variable that holds a reference to our database"
    const dbRef = firebase.database().ref();
    console.log(`COMPONENT MOUNTED, and dbRef is`, dbRef);

    // call function component that grabs firebase data & creates array from it
    // doesn't need any params, but returns an array
    // populateNewArrayFromFirebaseData();
    dbRef.once("value", (data) => {
      // use Firebase's .val() method to parse our dat-abase info the way we want it
      const firebaseDataObj = data.val();
      console.log(`in 'once' method, AND firebaseDataObj is`, firebaseDataObj);
      // make a new empty array for goals
      let goalsArray = [];
      // use for-in loop to loop through the object we get from firebase
      for (let propertyKey in firebaseDataObj) {
        // propertyKey = 'g1', 'g2' etc
        // extracting the key and value of the object
        const propertyVal = firebaseDataObj[propertyKey];
        // console.log(`propertyVal is`, propertyVal);
        // format it to the way we want it
        const formattedObj = { id: propertyKey, name: propertyVal }
        // push each new item in the loop into the empty array
        goalsArray.push(formattedObj);
      }
      console.log(`goalsArray (temporary array created upon mount for random thing) is`, goalsArray, `and its length is`, goalsArray.length);
          // updating our this.state.goals state with firebase data
          this.setState({
            featuredGoal: this.displayRandomGoalInternal(goalsArray)
          })
    });

    // then in this component's render(), add random item to page,
    // and for everything else, i.e. state changes, put in different components
    // 

  }
  
  displayRandomGoalInternal = (inputtedArray) => {
    console.log(`inputtedArray in displayRandomGoal is`, inputtedArray);
    // inputtedArray[0] = "1";
    console.log(inputtedArray);
    console.log(inputtedArray.length);
    const randomArrayIndex = Math.floor(Math.random() * inputtedArray.length);
    console.log(`randomArrayIndex is`, randomArrayIndex);
    console.log(`inputtedArray[randomArrayIndex] is`, inputtedArray[randomArrayIndex]);
    // get the goal property of a random item from the array
    // return inputtedArray[randomArrayIndex];
    // normally:
    return inputtedArray[randomArrayIndex].name;
    // return "testing ok good";
  }

  render() {
    console.log(`this.goalsArray inside the main render is`, this.goalsArray);
    let testArray = [
      {"1": "test"}, 2, 3, 4, 5
    ]
    console.log(testArray);
    console.log(testArray[3]);
    console.log(`testArray.length is`, testArray.length);
    
    return (
      <div>
        <h1>Essay Idea DB</h1>

        {/* DISPLAY FORM HERE */}
        <DisplayForm 
          displayRandomGoalInternal={this.displayRandomGoalInternal}
        />

        <div className="mainDisplayGoal">
          <p>
            Random number: <strong>{this.generatedNumber}</strong>
          </p>
{/* 
          <p>Now a randomly displayed goal from internal function:&nbsp;<strong>
            {this.displayRandomGoalInternal(this.state.goals)}</strong>
          </p>
*/}
          <p>
            And from the external component:
              <DisplayRandomGoal
                  // item={this.state.goals[0].id}
                  // goal={this.displayRandomGoalInternal(testArray)}
                  goal={this.state.featuredGoal}
              />
          </p>

          {/* <p>
            And from the component where the randomizing logic is done in-component:
            <RandomStuff
              message={"hello"}
            />
          </p>  */}

          {/* <p>
            And cool beans business:&nbsp;
            <CoolBeans 
              array={this.goalsArray}
            />
          </p>  */}

        </div>

        {/* DISPLAY LIST OF ITEMS HERE */}

      </div>
    )
  }
}

// class RandomStuff extends Component {
//   render() {
//     const hello = 'say hello';
//     return (
//         <span>
//           <strong>{this.props.message}</strong>
//         </span>
//     )
//   }
// }

// class QuestionForm extends Component {
//   render() {
//     return (
//       <form action="">
//         <label htmlFor="newGoal">(external class form) What someone should write? </label>
//         <input
//           type="text"
//           id="newGoal"
//         // onChange={this.handleInputChange}
//         />
//         <button onClick={this.handleSubmit}>Add</button>
//       </form>
//     )
//   }
// }

// class CoolBeans extends Component {
//   displayRandomItem = (inputtedArray) => {
//     const randomArrayIndex = Math.floor(Math.random() * inputtedArray.length);
//     console.log(`randomArrayIndex is`, randomArrayIndex);
//     console.log(`inputtedArray[randomArrayIndex] is`, inputtedArray[randomArrayIndex]);
//     // get the goal property of a random item from the array
//     return inputtedArray[randomArrayIndex].name;
//   }
//   testArray = [
//     1, 2, 3, 4, 5
//   ]
//   render () {
//     return (
//       <span>
//         <strong> 
//           {this.displayRandomItem(this.props.array)}
//         </strong>
//       </span>
//     )
//   }
// }


export default App;
