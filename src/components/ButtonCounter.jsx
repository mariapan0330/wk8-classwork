import React, { useState } from 'react'
import Button from "./Button.js"


export default function ButtonCounter(props) {
    let buttons = [
		{color:'primary', step:1},
		{color:'warning', step:10},
		{color:'success', step:100},
		{color:'danger', step:1000}
    ]
    
    const [count, setCount] = useState(0);

    
    function handleClick(step){
        console.log('clicked');
        // console.log(`${props.color} has been clicked`);
        setCount(count + step)
    }
    
    return (
        <>
            {/* {props.setHomeActive('active')}
            {props.setStandingsActive('')}
            {props.setRegisterActive('')} */}
            <h1 className="text-center">Hey!</h1>
            <h3 className="text-center">Score: {count}</h3>
            {buttons.map((b,i) => <Button color={b.color} step={b.step} key={i} handleClick={handleClick}/>)}
        </>
    ) 
}
