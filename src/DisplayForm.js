import "./App.scss";
import { Component, Fragment } from "react";
class DisplayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      charsLeft: 1000,
      nameInput: "",
      selectedOrderingChoice: 'placeholder'
    };
  }

  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userInput.length >= 20 && this.state.userInput.length <= 1000 && this.state.nameInput.length >= 1){
      // destructure firebase function object from this.props
      const { updateFirebase } = this.props;
      const timeSubmittedinMS = Date.now();
      const thingGoingToFirebase = { 
        item: this.state.userInput, 
        date: timeSubmittedinMS,
        name: this.state.nameInput
      }
      updateFirebase(thingGoingToFirebase);
      // clear the text input field
      document.querySelector("textarea").value = "";
      this.setState({
        userInput: "",
        nameInput: ""
      })
    }
  };

  handleInputChange = (e) => {
    this.setState({
      userInput: e.target.value
    });
    setTimeout(() => {
      this.setState({
        charsLeft: 1000 - this.state.userInput.length
      });
    },20)
  };
  handleNameChange = (e) => {
    this.setState({
      nameInput: e.target.value,
    });
  };

  removeGoal = (goalId) => {
    if (!goalId) return;
    const { removeFromFirebase } = this.props;
    removeFromFirebase(goalId);
  };

  renderGoals = (goalsArray) => {
    if (!goalsArray.length) return <li>No ideas to show</li>;
    // call changeDateOrder here, except solve the recursion problem
    // this.changeDateOrder();
    return goalsArray.map(({ date, item, name }) => {
      const bigWordyDateAndTime = new Date(date);
      const conciseNumbersDateAndTime = bigWordyDateAndTime.toLocaleString();
      return (
        <li key={date}>
          <p><span className="ideaSpan">{item}</span></p>
          {/* <span> -- </span> */}
          <p className="attribution">
            Added by <span className="dateSpan">{name}</span> on <span className="dateSpan">{conciseNumbersDateAndTime}</span>
          </p>
          {/* <button onClick={() => this.removeGoal(item)}>remove</button> */}
        </li>
      );
    });
  };

  changeDateOrder = (orderDirection) => {
    if (orderDirection === null) { orderDirection = this.state.selectedOrderingChoice};
    const oldestFirst = ( a, b ) => {
      if ( a.date < b.date ){
        return -1;
      }
      if ( a.date > b.date ){
        return 1;
      }
      return 0;
    }
    const newestFirst = ( b, a ) => {
      if ( a.date < b.date ){
        return -1;
      }
      if ( a.date > b.date ){
        return 1;
      }
      return 0;
    }
    if (orderDirection === "newest") {
      this.props.goalsArray.sort(newestFirst)
    } else {
      this.props.goalsArray.sort(oldestFirst)
    }
    console.log(`this.props.goalsArray after sort`, this.props.goalsArray);
    this.renderGoals(this.props.goalsArray)
  }

  handleDateOrderingChange = (e) => {
    e.preventDefault();
    this.setState({
      selectedOrderingChoice: e.target.value
    })
    this.changeDateOrder(e.target.value);
    // this.renderGoals(this.props.goalsArray);
  }
  
  render() {
    return (
      <Fragment>
        
        {/* // FORM */}
        <section className="inputFormSection">
          <div className="internalFormDiv wrapper">
          <form action="">

            <label htmlFor="newGoal" className="srOnly" >What do you want someone to write about? 20 characters minimum — but go wild! Get as in-depth as you like. (Max 1000 characters, though.) </label>

            <p className="newGoal" aria-hidden="true">What do you want someone to write about?</p>

            <textarea id="newGoal" className="ideaTextField" placeholder="20 characters minimum — but go wild! Get as in-depth as you like." onChange={this.handleInputChange} minLength="20" />

            <p className="charCount"> {this.state.userInput.length <= 1000 ? `${this.state.charsLeft} characters left` : "Too many characters"}</p>

            <div className="nameAndButton">

              <label htmlFor="name" className="srOnly" >Your Name (required) </label>

              <input type="text" id="name" className="nameField" placeholder="Your Name" onChange={this.handleNameChange} minLength="1" />

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

            <form>
                <label htmlFor="orderByDate" className="srOnly">Order by:</label>
                <select 
                    name="orderByDate" 
                    id="orderByDate" 
                    onChange={this.handleDateOrderingChange}
                    value={this.state.selectedOrderingChoice} >
                        <option value="placeholder" disabled>Order By:</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                </select>
            </form>

            <ul>
                {/* { this.state.selectedOrderingChoice="newest" ? this.changeDateOrder() : this.renderGoals(this.props.goalsArray)} */}
                {this.renderGoals(this.props.goalsArray)}
            </ul>
          </div>
        </section>

      </Fragment>
    );
  }
}
export default DisplayForm;