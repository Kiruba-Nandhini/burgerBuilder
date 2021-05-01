import React,{ Component } from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component
{
componentDidUpdate(){
  console.log('[OrderSummary] willUpdate');
}

    render(){  

        const ingredientSummary = Object.keys (this.props.ingredients)
    .map(igkey=>{
    return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>:{this.props.ingredients[igkey]}</li>
    }
    );
        return(
            <Auxilary>
        <h3>your Order </h3>
        <p>A Delicious burger with the following ingredients</p>
        <ul>
             {ingredientSummary}
        </ul>
            <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
        <p>Continue to  Checkout?</p>
        
        <Button btnType ="Danger" clicked ={this.props.purchaseCancel}>CANCEL</Button>
        <Button btnType ="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxilary>)
        
    }
} 
    
    


export default  OrderSummary;