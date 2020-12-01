// create a data structure that holds my colors
export const colors = {
    "yellow": 1,
    "red": 2,
    "blue": 3
}


// create a function which serves up a random color
export function randomColor(colorsArray) {
    const randomArrayIndex = Math.floor(Math.random() * colorsArray.length);
    
    // get a random color from the color array
    return colorsArray[randomArrayIndex];
}


const DisplayRandomGoal = ({goal }) => {
    return (
        <li className="goalItem">
            Goal: <strong>{goal}</strong>
        </li>
    )
}

export default DisplayRandomGoal;



// console.log( randomColor(colors) );
export const greeting = "hello";
// export { greeting };

// COMPLETELY UNRELATED TO ABOVE, just for testing/proof of concept
export const randomNumber = () => {
    return Math.floor(Math.random() * 70);
}