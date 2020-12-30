import React from 'react';

const Row = (props) => {
    
    // Will Adjust the height according to the highest number the max number is 500 px
    const height = 500*(props.number)/props.largestNum;

    return (
        <div className={`${props.beingCompared && 'compared' } row`} style={{width:"10px",height:`${height}px`}}>
            <h1>{props.number}</h1>
        </div>
    );
}

export default Row;
