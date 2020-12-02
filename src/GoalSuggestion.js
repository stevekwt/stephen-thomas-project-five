import './App.css';
import firebase from './firebase.js';
import { Component } from 'react';

class DisplayForm extends Component {

    constructor(props) {
        super();
        this.state = {
            goals: [],
            userInput: ''
        }
    }

    componentDidMount() {
        // "Here we create a variable that holds a reference to our database"
        // console.log(`props`, this.props);
        // const dbRef = firebase.database().ref()
        // console.log(`COMPONENT MOUNTED, and dbRef is`, dbRef);
        // "add an event listener to that variable that fires
        // every time there is a change in the database.
        // Event listener takes a callback function that gets our data"
        // dbRef.on('value', (data) => {
        //     // use Firebase's .val() method to parse our database info the way we want it
        //     const firebaseDataObj = data.val();
        //     // TODO
        //     console.log(`VALUE CHANGED, AND firebaseDataObj is`, firebaseDataObj);
        //     // make a new empty array for goals
        //     let goalsArray = [];
        //     // use for-in loop to loop through the object we get from firebase
        //     for (let propertyKey in firebaseDataObj) {
        //         // propertyKey = 'g1', 'g2' etc
        //         // extracting the key and value of the object
        //         const propertyVal = firebaseDataObj[propertyKey];
        //         // console.log(`propertyVal is`, propertyVal);
        //         // format it to the way we want it
        //         const formattedObj = { id: propertyKey, name: propertyVal }
        //         // push each new item in the loop into the empty array
        //         goalsArray.push(formattedObj);
        //     }
        //     console.log(`goalsArray (temporary array created upon mount) is`, goalsArray);
        //     // updating our this.state.goals state with firebase data
        //     this.setState({
        //         goals: goalsArray
        //     })
        // })
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

    render() {

        console.log(`this.state.goals is`, this.state.goals);
        // console.log(this.displayRandomGoalInternal(this.state.goals));

        return (
            //
            <div>

                <form action="">
                    <label htmlFor="newGoal">What do you want someone to write about? </label>
                    <input
                        type="text"
                        id="newGoal"
                    // onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleSubmit}>Add</button>
                </form>

                {/* {this.props.displayRandomGoalInternal()} */}

                {/* <QuestionForm /> */}

                <ul>
                    {
                        this.state.goals.map((goal) => {
                            // console.log(`goal.name is`, goal.name);
                            return (
                                <li key={goal.id}>
                                    <p>{goal.name} </p>
                                    <button onClick={() => (this.removeGoal(goal.id))}>remove</button>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}

export default DisplayForm;