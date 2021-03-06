import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/BackDrop/BackDrop';
import Auxilary from '../../../hoc/Auxilary/Auxilary';


const sideDrawer =(props)=>{
    let attachedClasses= [classes.SideDrawer,classes.Close];
    if(props.open){
        attachedClasses= [classes.SideDrawer,classes.Open];
    }
    
    return(
        <Auxilary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div  className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/></div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </Auxilary>
        
    )
}

export default sideDrawer;