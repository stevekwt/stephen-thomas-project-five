import './App.css';
import firebase from './firebase.js';
import { Component } from 'react';
import { randomNumber } from './randomizers.js';
import DisplayRandomGoal from './DisplayRandomGoal.js';

// 1. configure firebase on react -- 
// 2. connect firebase data to the state -- 
// 3. map through the 'goal' state to display each 'goal' -- 
// 4. add remove button
// 5. on remove button click, remove the 'goal' that was clicked on, remove it from firebase
// 6. create input form, to get user input value 
// 7. on submit of form, submit user input value to firebase

// getRandomNumber = () => {
const generatedNumber = randomNumber();
  // }

class App extends Component {

  constructor() {
    super();
    this.state = {
      goals: [
        {
          id: "1",
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
    const dbRef = firebase.database().ref()
    // TODO
    console.log(`COMPONENT MOUNTED, and dbRef is`, dbRef);
    // "add an event listener to that variable that fires
    // every time there is a change in the database.
    // Event listener takes a callback function that gets our data"
    dbRef.on('value', (data) => {
          // use Firebase's .val() method to parse our database info the way we want it
          const firebaseDataObj = data.val();
          // TODO
          console.log(`VALUE CHANGED, AND firebaseDataObj is`, firebaseDataObj);
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
          // TODO
          console.log(`goalsArray (temporary array created upon mount) is`, goalsArray);
          // updating our this.state.goals state with firebase data
          this.setState({
            goals: goalsArray
          })
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    
    // on form submit, ping firebase and create a reference object with the most up-to-date version of the data
    const dbRef = firebase.database().ref();
    
    // is there a way to grab the form submit w/o the key-by-key method?
    // console.log(e);
    const inputtedText = document.getElementById("newGoal").value;
    console.log(inputtedText);

    // add (push) the user's input, as grabbed by button submit, 
    // dbRef.push(this.state.userInput);
    dbRef.push(inputtedText);
    // TODO
    console.log(`this.state.goals is ${this.state.goals}`);
    // clear the text input field
    document.querySelector('input').value = '';
  }

  handleInputChange = (e) => {
    // console.log(`e.target.value is`, e.target.value);
    this.setState({
      userInput: e.target.value
    })
  }

  removeGoal = (goalId) => {
    const dbRef = firebase.database().ref();
    // a way to remove a record off the face of firebase
    // .child() is going to locate the particular record
    // .remove() is going to remove the record
    dbRef.child(goalId).remove();
  }

  displayRandomGoalInternal = (inputtedArray) => {
    const randomArrayIndex = Math.floor(Math.random() * inputtedArray.length);
    console.log(`randomArrayIndex is`, randomArrayIndex);
    console.log(`inputtedArray[randomArrayIndex] is`, inputtedArray[randomArrayIndex]);
    // get the goal property of a random item from the array
    return inputtedArray[randomArrayIndex].name;
  }

  render() {
    console.log(`this.state.goals is`, this.state.goals);
    console.log(this.displayRandomGoalInternal(this.state.goals));
    // console.log(thisremoveGoal());
    return (
      <div>
        <h1>Essay Idea DB</h1>

        <form action="">
          <label htmlFor="newGoal">What do you want someone to write about? </label>
          <input
            type="text"
            id="newGoal"
            // onChange={this.handleInputChange}
          />
          <button onClick={this.handleSubmit}>Add</button>
        </form>

        <QuestionForm

        />

        <div className="mainDisplayGoal">
          <p>
            Random number: <strong>{generatedNumber}</strong>
          </p>

          <p>Now a randomly displayed goal from internal function:&nbsp;<strong>
            {this.displayRandomGoalInternal(this.state.goals)}</strong>
          </p>

          <p>
            And from the external component:
              <DisplayRandomGoal
                  // item={this.state.goals[0].id}
                  goal={this.displayRandomGoalInternal(this.state.goals)}
              />
          </p>
          <p>
            And from the component where the randomizing logic is done in-component:
            <RandomStuff
              message={"hello"}
            />
          </p>

          <p>
            And cool beans business:&nbsp;
            <CoolBeans 
              array={this.state.goals}
            />
          </p>

        </div>

        <ul>
          {
            this.state.goals.map((goal) => {
              // console.log(`goal.name is`, goal.name);
              return (
                <li key={goal.id}>
                  <p>{goal.name} </p>
                  <button onClick={ () => (this.removeGoal(goal.id)) }>remove</button>
                </li>
              )
            })
          }
        </ul>

      </div>
    )
  }
}

class RandomStuff extends Component {
  render() {
    const hello = 'say hello';
    return (
      <div>
        <span><strong>{this.props.message}</strong></span>
      </div>
    )
  }
}

class QuestionForm extends Component {
  render() {
    return (
      <form action="">
        <label htmlFor="newGoal">(external class form) What someone should write? </label>
        <input
          type="text"
          id="newGoal"
        // onChange={this.handleInputChange}
        />
        <button onClick={this.handleSubmit}>Add</button>
      </form>
    )
  }
}

class CoolBeans extends Component {
  displayRandomItem = (inputtedArray) => {
    const randomArrayIndex = Math.floor(Math.random() * inputtedArray.length);
    console.log(`randomArrayIndex is`, randomArrayIndex);
    console.log(`inputtedArray[randomArrayIndex] is`, inputtedArray[randomArrayIndex]);
    // get the goal property of a random item from the array
    return inputtedArray[randomArrayIndex].name;
  }
  testArray = [
    1, 2, 3, 4, 5
  ]
  render () {
    return (
      <span>
        <strong> 
          {this.displayRandomItem(this.props.array)}
        </strong>
      </span>
    )
  }
}

export default App;
