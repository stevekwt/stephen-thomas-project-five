import "./App.css";
// import firebase from "./firebase.js";
import { Component } from "react";
class DisplayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
    };
  }

  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();
    // destructure firebase function object from this.props
    const { updateFirebase } = this.props;
    updateFirebase(this.state.userInput);
    // clear the text input field
    document.querySelector("input").value = "";
  };

  handleInputChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  removeGoal = (goalId) => {
    if (!goalId) return;
    const { removeFromFirebase } = this.props;
    removeFromFirebase(goalId);
  };

  renderGoals = (goalsArray) => {
    if (!goalsArray.length) return <li>No goals to show</li>;
    return goalsArray.map(({ id, value }) => {
      return (
        <li key={id}>
          <p>{value} </p>
          <button onClick={() => this.removeGoal(id)}>remove</button>
        </li>
      );
    });
  };

  render() {
    return (
      <div>
        
        {/* // FORM */}
        <form action="">
          <label htmlFor="newGoal">What do you want someone to write about? </label>
          <input type="text" id="newGoal" onChange={this.handleInputChange} />
          <button onClick={this.handleSubmit}>Add</button>
        </form>

        {/* // RANDOM ITEM */}

        <p>Random Essay Idea: <strong>{this.props.displayRandomThing}</strong> 
            <button onClick={this.props.getRandomGoal}>Show me another</button> 
        </p>

        {/* // LIST OF ITEMS */}
        <ul>
            {this.renderGoals(this.props.goalsArray)}
        </ul>

      </div>
    );
  }
}
export default DisplayForm;