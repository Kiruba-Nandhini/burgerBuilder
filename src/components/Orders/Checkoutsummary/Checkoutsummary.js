import React from 'react';
import  Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Classes from './Checkoutsummary.css';


const checkoutsummary =(props)=>{
    return(
    <div className={Classes.Checkoutsummary}>
        <h1> we hope it tastes well!!</h1>
        <div style={{width:'100%',margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
        </div>
        <Button 
        btnType="Danger"
        clicked={props.cancelClicked}>
            CANCEL
        </Button>
        <Button btnType="Success"
        clicked ={props.continueClicked}>
            CONTINUE
        </Button>
    </div>
    );
}

export default checkoutsummary;