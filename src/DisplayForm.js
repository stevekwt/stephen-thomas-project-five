import "./App.scss";
import { Component, Fragment } from "react";
class DisplayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      nameInput: "",
      selectedChoice: 'placeholder'
    };
  }

  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();
    // destructure firebase function object from this.props
    const { updateFirebase } = this.props;
    const timeSubmittedinMS = Date.now();
    console.log(`timeSubmittedinMS`, timeSubmittedinMS);
    const millisecondDateFormatted = new Date(timeSubmittedinMS);
    console.log(`millisecondDateFormatted`, millisecondDateFormatted);
    const humanDateAndTime = millisecondDateFormatted.toLocaleString();
    console.log(`humanDateAndTime is`, humanDateAndTime);
    // const humanTime = Date(date);
    // console.log(`humanTime`, humanTime);
    const thingGoingToFirebase = { 
      item: this.state.userInput, 
      date: humanDateAndTime,
      name: this.state.nameInput
    }
    updateFirebase(thingGoingToFirebase);
    // clear the text input field
    document.querySelector("input").value = "";
  };

  handleInputChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
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
    if (!goalsArray.length) return <li>No goals to show</li>;
    return goalsArray.map(({ date, item, name }) => {
      return (
        <li key={date}>
          <p><span className="ideaSpan">{item}</span></p>
          {/* <span> -- </span> */}
          <p className="attribution">
            Added by <span className="dateSpan">{name}</span> on <span className="dateSpan">{date}</span>
          </p>
          {/* <button onClick={() => this.removeGoal(item)}>remove</button> */}
        </li>
      );
    });
  };

  changeDateOrder = (orderDirection) => {
    console.log(`i'm in changeDateOrder`, orderDirection);
    console.log(this.props.goalsArray);
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

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      selectedChoice: e.target.value
    })
    // this.changeDateOrder(this.state.selectedChoice);
    this.changeDateOrder(e.target.value);
  }
  
  render() {
    return (
      <Fragment>
        
        {/* // FORM */}
        <section className="inputFormSection">
          <div className="internalFormDiv wrapper">
          <form action="">

            <label htmlFor="newGoal" className="newGoal" >What do you want someone to write about? </label>

            <textarea id="newGoal" className="ideaTextField" placeholder="Something world-explaining..?" onChange={this.handleInputChange} required />

            <div className="nameAndButton">

              <input type="text" id="name" className="nameField" placeholder="Your Name" onChange={this.handleNameChange} required />

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
                    onChange={this.handleChange}
                    value={this.state.selectedChoice} >
                        <option value="placeholder" disabled>Order By:</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                </select>
            </form>

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