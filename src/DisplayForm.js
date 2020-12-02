import './App.css';
import firebase from './firebase.js';
import { Component } from 'react';

class DisplayForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
        }
    }

    componentDidMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // destructure firebase function object from this.props
        const { updateFirebase } = this.props

        // is there a way to grab the form submit w/o the key-by-key method?
        updateFirebase(this.state.userInput)
        // clear the text input field
        document.querySelector('input').value = '';
    }

    handleInputChange = (e) => {
    // add debounce function which checks if events have stopped for the last 200ms

       // console.log(`e.target.value is`, e.target.value);
        this.setState({
            userInput: e.target.value
        })
    }

    removeGoal = (goalId) => {
        if (!goalId) return
        const {removeFromFirebase} = this.props
        removeFromFirebase(goalId)
    }

   renderGoals = (props) => {
    const {goalsArray} = props
    if (!goalsArray) return null
       
    return goalsArray.map((goal) => {
                            // console.log(`goal.name is`, goal.name);
       return (
        <li key={goal.id}>
          <p>{goal.name} </p>
          <button onClick={() => (this.removeGoal(goal.id))}>remove</button>
       </li>
       ) 
       }) 
    }

    render() {
        return(
            <div>

                <form action="">
                    <label htmlFor="newGoal">What do you want someone to write about? </label>
                    <input
                        type="text"
                        id="newGoal"
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleSubmit}>Add</button>
                </form>

                {/* {<p>{this.props.getRandomGoal}</p>} */}

                {this.renderGoals(this.props)}

                {/* <QuestionForm /> */}

                <ul>
                    {
                        
                    }
                </ul>

            </div>
        )
    }
}

export default DisplayForm;