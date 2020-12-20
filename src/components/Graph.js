import React, { useEffect, useState } from 'react';
import Row from './Row';

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

const Graph = () => {
    const [input, setInput] = useState("");
    const [change, setChange] = useState(true);
    const [arrOfNums, setArrOfNums] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(()=>{
        console.log("a number has been added to the array");
        const newRows = arrOfNums.map((elem,index)=>{
            return <Row key = {index} number={elem}/>
        });
        setRows(newRows);
    },[change])

    const submitHandler = (e) =>{
        e.preventDefault();

        if(isNumber(input)){
            const newArr = arrOfNums;
            newArr.push(parseInt(input));
            setArrOfNums(newArr);
            setChange(!change);
        }else{
            console.log("That is not a number try again")
        }
        setInput("");
    }

    const inputHandler = (e) =>{
        setInput(e.target.value)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" value={input} onChange={inputHandler}/>
                <input type="submit" name="Submit"/>
                {/* <button onClick = {submitHandler}>Press me</button> */}
            </form>
            {rows}
        </div>
    );
}


export default Graph;
