import React ,{Component} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner' ;
import WithErrorHandler from '../../hoc/WitherrorHandler/WitherrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/action/index';
import Axios from '../../Axios-orders';




class BurgerBuilder extends Component{
    //constructor(props){
       // super(props)
       // this.state={...}
    //}
    state={
        
        purchasing:false,
        

    }
    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchase(ingredients){
        
        const sum= Object.keys(ingredients).map(igkey=>{
            return ingredients[igkey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0)
         return sum > 0;

    }
    /*addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition =INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchase(updatedIngredients);

    }
    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount-1;
        if(oldCount<=0){
            return;
        }
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction =INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
         this.updatePurchase(updatedIngredients);
    } */
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
     purchaseCancelHandler=()=>{
         this.setState({purchasing:false})
     }
    purchaseContinueHandler=()=>{
        // alert('you continue!!');
    //        this.setState({loading:true});
    //     var orders={
    //         ingredients:this.props.ingredients,
    //         price:this.props.price,
    //         customer:{
    //             name:'kiruba',
    //             address:{
    //                 street:'kamarajar salai',
    //                 zipcode:'625009',
    //                 country:'india'
    //             },
    //             email:'kiruba@gmail.com',
                
    //         },
    //         deliverymode:'fast',
           
    //     }
    // Axios.post('/orders.json',orders)
    //     .then(response => {
    //         console.log(response)
    //         this.setState({loading:false});
    //         //this.props.history.push('/');
    //     })
    //     .catch( error => {
    //         console.log(error)
    //         this.setState({loading:false})   
    //     }); 
       this.props.onInitPurchsed();
       this.props.history.push('/checkout');

    }
    
    render()
    {
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary =null;
         let burger= this.props.error? <p>Ingredients can't be loaded!!</p>:<Spinner/>;

         if(this.props.ings)
        {
         burger=(
            <Auxilary>
          <Burger ingredients={this.props.ings}/>
            <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchase(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price} />
            </Auxilary>
            );
            orderSummary =<OrderSummary ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}/>
        }
        
       return(
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                    </Modal>
                    {burger}
                
            </Auxilary>
        );
    }
}
const mapStateToProps = state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
       
    };
    
}
const mapDispatchToProps =dispatch =>{
    return{
    onIngredientAdded:(ingName)=> dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
    onInitIngredients:()=>dispatch(actions.initIngredients()),
    onInitPurchsed:()=>dispatch(actions.purchaseInit())
    };
}





export default  connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,Axios)) ;