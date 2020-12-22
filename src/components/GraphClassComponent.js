import React, { Component } from 'react';
import Row from './Row';

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
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

        //Seeding the Data
        const seedArr = [];
        let largest = 1;
        for(let i = 0; i< 50;i++){
            const num = getRandomInt(100)+1;
            if (num>largest) largest = num;
            seedArr.push(num);
        }
        const newRows = seedArr.map((elem,index)=>{
            return <Row key = {index} number={elem} largestNum={largest}/>
        });
        this.setState({arrOfNums: seedArr, rows: newRows, largestNum:largest})

    }

    submitHandler = (e) =>{
        e.preventDefault();
        if(isNumber(this.state.inputVal)){
            this.setState((prevState)=>{
                const tempArr = prevState.arrOfNums.slice();
                const number = parseInt(this.state.inputVal)
                
                let newLargest = 1;
                if(number>prevState.largestNum){
                    newLargest = number;
                }else{
                    newLargest = prevState.largestNum;
                }
                tempArr.push(number);
                const newRows = tempArr.map((elem,index)=>{
                    return <Row key = {index} number={elem} largestNum={newLargest}/>
                });

                return {arrOfNums: tempArr, inputVal : "", rows: newRows, largestNum:newLargest}
            })
        }
        this.setState({inputVal:""})

    }

    sorter = async() =>{

        let arr = this.state.arrOfNums;
        var len = arr.length;
        for (let i = len-1; i>=0; i--){
            for(let j = 1; j<=i; j++){
                await sleep(10);
                if(arr[j-1]>arr[j]){
                    var temp = arr[j-1];
                    arr[j-1] = arr[j];
                    arr[j] = temp;
                    console.log("yo")
                    const newRows = arr.map((elem,index)=>{
                        return <Row key = {index} number={elem} largestNum={this.state.largestNum} beingCompared = {false}/>
                    });
                    this.setState({rows:newRows,arrOfNums:arr})
                }
            }
        }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text" placeholder="Enter Number" value={this.state.inputVal} onChange={(event)=> this.setState({ inputVal: event.target.value })}/>
                    <input type="submit" name="Submit" value="Add Number"/>
                </form>
                <button onClick={this.sorter}>Sort</button>
                <div className="all_rows">
                    {this.state.rows}
                </div>
            </div>
        );
    }
}

export default GraphClassComponent;
