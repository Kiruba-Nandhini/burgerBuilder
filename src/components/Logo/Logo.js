import React from 'react';
import  BurgerLogo from '../../assets/images/burgerlogo1.png';
import classes from './Logo.css';


const logo =(props)=>(
    <div className={classes.Logo} style={{height:props.height}}>
        <img src={BurgerLogo}alt='Burger image'/>
    </div>
);

export default logo;
