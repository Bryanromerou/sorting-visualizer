import React, { Component } from 'react';
import Row from './Row';


function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class GraphClassComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputVal: '',
            arrOfNums:[],
            rows:[],
            largestNum:1
        }
    }

    componentDidMount(){
        console.log("mounted")
    }

    submitHandler = () =>{
        this.setState((prevState)=>{
            const tempArr = prevState.arrOfNums.slice();
            const number = parseInt(this.state.inputVal)
            
            tempArr.push(number);
            const newRows = tempArr.map((elem,index)=>{
                return <Row key = {index} number={elem} largestNum={this.largestNum}/>
            });
            let newLargest = 1;
            if(number>prevState.largestNum){
                newLargest = number;
            }else{
                newLargest = prevState.largestNum;
            }
            console.log(prevState.largestNum)
            // console.log(this);
            return {arrOfNums: tempArr, inputVal : "", rows: newRows, largestNum:newLargest}
        })
    }

    render() {
        return (
            <div>
                {this.state.inputVal}
                <input type="text" placeholder="Enter Number" value={this.state.inputVal} onChange={(event)=> this.setState({ inputVal: event.target.value })}/>
                <button onClick = {this.submitHandler}>Add Number</button>
                {this.state.rows}
            </div>
        );
    }
}

export default GraphClassComponent;
