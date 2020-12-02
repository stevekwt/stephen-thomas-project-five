import "./App.css";
import firebase from "./firebase.js";
import { Component } from "react";
import { randomNumber } from "./randomizers.js";
import DisplayRandomGoal from "./DisplayRandomGoal.js";
import DisplayForm from "./DisplayForm.js";
// import getRandomGoal from "./getRandomGoal.js";
// 1. configure firebase on react --
// 2. connect firebase data to the state --
// 3. map through the 'goal' state to display each 'goal' --
// 4. add remove button
// 5. on remove button click, remove the 'goal' that was clicked on, remove it from firebase
// 6. create input form, to get user input value
// 7. on submit of form, submit user input value to firebase
class App extends Component {
  generatedNumber = randomNumber();
  constructor(props) {
    super();
    this.state = {
      goalsArray: [],
      randomGoal: "",
    };
    this.firebaseRef = this.firebaseRef.bind(this);
    this.updateFirebase = this.updateFirebase.bind(this);
    this.removeFromFirebase = this.removeFromFirebase.bind(this);
  }
  // get reference to firebase and return it
  firebaseRef() {
    const dbRef = firebase.database().ref();
    return dbRef;
  }
  //generic function to update firebase
  updateFirebase(value) {
    if (value === undefined || null) return;
    const dbRef = this.firebaseRef();
    dbRef.push(value);
  }
  //generic function to remove from firebase
  removeFromFirebase(id) {
    if (id === undefined || null) return;
    const dbRef = this.firebaseRef();
    dbRef.child(id).remove();
  }
  componentDidMount() {
    const dbRef = this.firebaseRef();
    dbRef.on("value", (snapshot) => {
      const firebaseDataObj = snapshot.val();
      console.log(firebaseDataObj);
      if (firebaseDataObj === null) {
        return this.setState({ goalsArray: [] });
      }
      const goalsArray = Object.entries(firebaseDataObj).map(([id, value]) => {
        return { id, value };
      });
      this.setState({ goalsArray });
      if (this.state.randomGoal === '') {
        this.getRandomGoal();
      } 
    });
    
  }

  componentWillUnmount() {
    const dbRef = this.firebaseRef();
    dbRef.off();
  }

  getRandomGoal = () => {
    const goalsArray = this.state.goalsArray;
    const randomArrayIndex = Math.floor(Math.random() * goalsArray.length);
    const randomItem = goalsArray[randomArrayIndex]?.value; 
    this.setState({
      randomGoal: randomItem
    })
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
          displayRandomThing={this.state.randomGoal}
          // randomGoal={getRandomGoal(this.state.goalsArray)}
        />
        {/* <div className="mainDisplayGoal">
          <p>
            Random number: <strong>{this.generatedNumber}</strong>
          </p>
          <p>
            And from the external component:
            <DisplayRandomGoal />
          </p>
        </div> */}
      </div>
    );
  }
}
export default App;