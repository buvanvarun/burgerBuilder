import React from 'react'
import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
];
const buildControls=(props)=>{

    return(
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>&#8377; {props.price}</strong></p>
    {controls.map(ctrl=>{
       return <BuildControl disabled={props.disabled[ctrl.type]} ingredientAdded={()=>props.ingredientAdded(ctrl.type)} ingredientRemoved={()=>props.ingredientRemoved(ctrl.type)} key={ctrl.label} label={ctrl.label} />
    })}
    <button onClick={props.ordered} disabled={props.orderStatus} className={classes.OrderButton}>ORDER NOW</button>
    </div>)
}

export default buildControls;