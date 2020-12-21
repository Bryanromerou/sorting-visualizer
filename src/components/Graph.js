import React, { useEffect, useState } from 'react';
import Row from './Row';

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Graph = () => {


    const [input, setInput] = useState("");//Tracking the input of the user
    const [change, setChange] = useState(true);// Checks for change in array if there is a change it will trigger to rerender rows 
    const [arrOfNums, setArrOfNums] = useState([]);// Integer Holder of all numbers
    const [rows, setRows] = useState([]);//Component holder for all of my row components
    const [largestNum, setLargestNum] = useState(1);//Tracking the greatest number for the height of the rows


    //This function is ran when we have a change in the "change state"
    useEffect(()=>{
        const newRows = arrOfNums.map((elem,index)=>{
            return <Row key = {index} number={elem} largestNum={largestNum}/>
        });
        setRows(newRows);
    },[change])
    // useEffect(() => {
    //     // Update the document title using the browser API
    //     console.log("what the fuck")
    // });

    const submitHandler = (e) =>{
        //Prevents a rerender that would lose data info
        e.preventDefault();

        //Will Store Number
        const number = parseInt(input);
        if(isNumber(input)){//Checks if it is a number and if it is it adds it to the array
            const newArr = arrOfNums;
            newArr.push(number);
            setArrOfNums(newArr);
            setChange(!change);
            if(number>largestNum){
                setLargestNum(number);
            }
        }else{
            console.log("That is not a number try again")
        }
        setInput("");
    }

    const inputHandler = (e) =>{
        setInput(e.target.value)
    }

    const sorter = async() =>{
        // await sleep(100);
        let arr = arrOfNums;
        var len = arr.length;
        for (var i = len-1; i>=0; i--){
            for(var j = 1; j<=i; j++){
            await sleep(1000);
            if(arr[j-1]>arr[j]){
                var temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
                console.log("yo")
                console.log(arr);
                console.log(arrOfNums);
                changeArr(arr);
                }
            }
        }
        console.log("Hello");
    }

    const changeArr = (arr) =>{
        setArrOfNums(arr);
        setChange(!change);
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" value={input} onChange={inputHandler}/>
                <input type="submit" name="Submit"/>
            </form>
            <div className="all_rows">
                {rows}
            </div>
            <button onClick={sorter}>Sort</button>
        </div>
    );
}


export default Graph;
