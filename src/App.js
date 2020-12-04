import "./App.scss";
import firebase from "./firebase.js";
import { Component, Fragment } from "react";
import DisplayForm from "./DisplayForm.js";

class App extends Component {

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
      <Fragment>
        <header>
          <div className="internalHeader wrapper">
            <h1>Essay Idea DB</h1>
          </div>
        </header>

        <DisplayForm
          goalsArray={this.state.goalsArray}
          updateFirebase={this.updateFirebase}
          removeFromFirebase={this.removeFromFirebase}
          displayRandomThing={this.state.randomGoal}
          getRandomGoal={this.getRandomGoal}
        />
        
      </Fragment>
    );
  }
}

export default App;