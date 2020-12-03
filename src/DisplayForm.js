import "./App.scss";
// import firebase from "./firebase.js";
import { Component, Fragment } from "react";
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
          {value}
          <button onClick={() => this.removeGoal(id)}>remove</button>
        </li>
      );
    });
  };

  render() {
    return (
      <Fragment>
        
        {/* // FORM */}
        <section className="inputFormSection">
          <div className="internalFormDiv wrapper">
          <form action="">

            <label htmlFor="newGoal" className="newGoal" >What do you want someone to write about? </label>

            <div className="textAndButton">

              <input type="text" id="newGoal" className="ideaTextField" placeholder="Something that helps explain the world..?" onChange={this.handleInputChange} />

              <button className="addButton" onClick={this.handleSubmit}>Add</button>

            </div>
            

          </form>
          </div>
        </section>

        {/* // RANDOM ITEM */}
        <section className="randomItem">
          <div className="internalRandomDiv wrapper">
            <span className="randomIntroText">Random Essay Idea: </span>
              
            <span className="randomEssayIdea">{this.props.displayRandomThing}</span> 

            <button className="anotherButton" onClick={this.props.getRandomGoal}>Show me another</button> 
          </div>
        </section>

        {/* // LIST OF ITEMS */}
        <section className="itemList">
          <div className="internalListDiv wrapper">
            <h2>The Ideas</h2>
            <ul>
                {this.renderGoals(this.props.goalsArray)}
            </ul>
          </div>
        </section>

      </Fragment>
    );
  }
}
export default DisplayForm;