import React from 'react';
import Classes from './Order.css';

const Order =(props)=>{
    const ingredients=[];
    for(let ingredientName in props.ingredients){
      ingredients.push({
          name:ingredientName,
          amount:props.ingredients[ingredientName],
        
      }
      )
    };
    const ingredientsOutput=ingredients.map(ig=>{
        return(
        <span  
        style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding :'5px',
        }}
        key={ig.key}>  {ig.name} ({ig.amount})</span>
        );
    })

    return(
        <div className={Classes.Order}>
            <p>Ingredients : {ingredientsOutput}</p>
         <p>Price <strong>RS:{Number.parseFloat(props.price).toFixed(2)}</strong> </p>
        </div>
        
    );
        
    
};
export default Order;