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
      selectedGoal: '',
      goalsArray: [],
      // userInput: ''
    }
   this.firebaseRef = this.firebaseRef.bind(this);
   this.updateFirebase = this.updateFirebase.bind(this);
   this.removeFromFirebase = this.removeFromFirebase.bind(this);
   this.getRandomGoal = this.getRandomGoal.bind(this);
   this.setRandomGoalToState = this.setRandomGoalToState.bind(this);
  }

  firebaseRef() {
    const dbRef = firebase.database().ref();
    return dbRef;
  }

  //generic function to update firebase
  updateFirebase(value) {
    if (value === undefined || null) return
    const databaseRef = this.firebaseRef() 
    databaseRef.push(value)
  }

  //generic function to remove from firebase
  removeFromFirebase(id) {
    if (id === undefined || null) return
    const databaseRef = this.firebaseRef() 
    databaseRef.child(id).remove() 
  }

  // calculate random goal from array of goals
  getRandomGoal = (array) => {
    if (!array) return 
    
    const randomArrayIndex = Math.floor(Math.random() * array.length);
    return array[randomArrayIndex]?.name 
  }

  setRandomGoalToState = () => {
    if (this.state.goalsArray) {
      let result = this.getRandomGoal(this.state.goalsArray)
      console.log(result);

      this.setState({
      selectedGoal: result
      })
    }
    
  }

  componentDidMount() {

    this.firebaseRef().on("value", (data) => {
      // use Firebase's .val() method to parse our dat-abase info the way we want it
      const firebaseDataObj = data.val();
      // make a new empty array for goals
      const goalsArray = [];
      // use for-in loop to loop through the object we get from firebase
      for (let propertyKey in firebaseDataObj) {
        // propertyKey = 'g1', 'g2' etc
        // extracting the key and value of the object
        const propertyVal = firebaseDataObj[propertyKey];
        // format it to the way we want it
        const formattedObj = { id: propertyKey, name: propertyVal }
        // push each new item in the loop into the empty array
        goalsArray.push(formattedObj);
      }

     // updating our this.state.goals state with firebase data
      this.setState({
        goalsArray: goalsArray,
      })

    // push randomly selected goal into firebase for persitance 
    // this.setRandomGoalToFirebase(this.getRandomGoal(this.state.goalsArray))
  });
  
  this.setRandomGoalToState()

    // then in this component's render(), add random item to page,
    // and for everything else, i.e. state changes, put in different components
    // 
  }

  render() {
    
    return (
      <div>
        <h1>Essay Idea DB</h1>

        {/* DISPLAY FORM HERE */}
        <DisplayForm
          goalsArray={this.state.goalsArray}
          updateFirebase={this.updateFirebase}
          removeFromFirebase={this.removeFromFirebase}
          // getRandomGoal={selectedGoal}
        />

        <div className="mainDisplayGoal">
          <p>
            Random number: <strong>{this.generatedNumber}</strong>
          </p>

          <p>
            And from the external component:
              <DisplayRandomGoal
                  // goal={this.getRandomGoal()}
                  
              />
          </p>

         
        </div>

        {/* DISPLAY LIST OF ITEMS HERE */}

      </div>
    )
  }
}


export default App;
