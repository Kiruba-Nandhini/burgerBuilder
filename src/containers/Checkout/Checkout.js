import React,{Component} from 'react';
import Checkoutsummary from '../../components/Orders/Checkoutsummary/Checkoutsummary';
import {connect} from 'react-redux';
import ContactData from "./ContactData/ContactData"
import {Route,Redirect} from 'react-router-dom';
import * as actions from '../../store/action/index'


class Checkout extends Component{
   
 CheckoutCancelledHandler=()=>{
    this.props.history.goBack();
   }

   CheckoutContinuedHandler=()=>
   {
    //    this.props.history.replace('/checkout/contact-data');
    this.props.history.replace('/checkout/contact-data')

   }


render(){
    let summary= <Redirect to="/"/>
    if(this.props.ings){
        const purchaseRedirect = this.props.purchased ? <Redirect to ="/"/> :  null;
       summary =(
      <div>
          {purchaseRedirect}
        <Checkoutsummary 
        ingredients={this.props.ings}
        cancelClicked={this.CheckoutCancelledHandler}
        continueClicked={this.CheckoutContinuedHandler}
        />
        {/* <Route 
        path={this.props.match.path +'/contact-data'}
        //component={ContactData} 
        render={()=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>)}
        /> */}
          <Route path={this.props.match.path + "/contact-data"} 
            component={ContactData}
            // render={()=>(
            //     <ContactData ingredients={this.props.ings} price={this.props.price} />
            // )}
            />
        
        
        </div>
       )
    }
    return summary;
}
    

}
const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased,
        
    }
}



export default connect(mapStateToProps) (Checkout);