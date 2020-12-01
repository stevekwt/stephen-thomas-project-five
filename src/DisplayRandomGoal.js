
const DisplayRandomGoal = ({ goal }) => {
    console.log(`goal in dedicated component is`, goal);
    return (
        <span>
            <strong> {goal}</strong> 
        </span>
    )
}

export default DisplayRandomGoal;
