import { useState } from "react"

function Counter(){

    const [counter, setCounter] = useState(0);

    function inc(){
        setCounter(counter + 1)
    }

    function dec(){
        setCounter(counter - 1)
    }

    return(
        <>
        <button onClick={inc}>Increment</button>
        <p>{counter}</p>
        <button onClick={dec}>Decrement</button>
        </>
    )
}
export default Counter;