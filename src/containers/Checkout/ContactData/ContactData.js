// import React,{Component} from 'react';
// import Button from '../../../components/UI/Button/Button';
// import Classes from './ContactData.css';
// //import Axios from '../../../Axios-orders';
// import axios from "../../../Axios-orders"
// //import Axios from 'axios'
// import Spinner from '../../../components/UI/Spinner/Spinner';
// import {withRouter} from 'react-router-dom'

// class ContactData extends Component{
//  state={
//      name:'',
//      email:'',
//      address:{
//          street:'',
//          zipcode:'',
//         },
//         loading:false,
//     }
//   OrderClikedHandler=(event)=>{
//     //   event.preventDefault();
//     //   this.setState({loading:true});
//     //     var orders={
//     //         ingredients:this.props.ingredients,
//     //         price:this.props.price,
//     //         customer:{
//     //             name:'kiruba',
//     //             address:{
//     //                 street:'kamarajar salai',
//     //                 zipcode:'625009',
//     //                 country:'india'
//     //             },
//     //             email:'kiruba@gmail.com',
                
//     //         },
//     //         deliverymode:'fast',
           
//     //     }
//     event.preventDefault()
//     this.setState({loading:true})
//     const order={
//         ingredients:this.props.ingredients,
//         price:this.props.price,
//         customer:{
//             name:'Krishna',
//             address:{
//                 street:'Street 101',
//                 zipCode:'42423',
//                 country:'India'
//             },
//             emailid:'test@test.com'
//         },
//         delivery:"fastest"
//     }
        
        
//         // Axios.post('/orders.json',orders)
//         // .then(response => {
//         //     console.log(response)
//         //     this.setState({loading:false});
//         //     //this.props.history.push('/');
//         // })
//         // .catch( error => {
//         //     console.log(error)
//         //     this.setState({loading:false})   
//         // }); 
//         axios.post('/orders.json',order)
//         .then(response=>{
//             console.log(response)
//         this.setState({loading:false})
//         this.props.history.push('/')
//         })
//         .catch(err=>{
//             console.log(err)
//         this.setState({loading:false})
//         })

//   }


// render(){
//     console.log(this.props)
//     let form=(<form>
//         <input  className={Classes.Input} type='text'name='name' placeholder='your Name'></input>
//         <input className={Classes.Input} type='email'name='email' placeholder='your e-mail'></input>
//         <input className={Classes.Input} type='text'name='street' placeholder='your street'></input>
//         <input className={Classes.Input} type='text'name='zipcode' placeholder='your zipcode'></input>
        
//        <Button btnType='Success'
//        clicked={this.OrderClikedHandler}>ORDER</Button>
//     </form>);
//     if(this.state.loading){
//       form=<Spinner/>;
//     }
//     return(
//        <div className={Classes.ContactData}>
//         <h4>Enter Your Contact Data</h4>
//         {form}
        
//         </div>
//     );
        
    
// }

// }
// export default withRouter(ContactData);

import React,{Component} from "react"

import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "../../../Axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"
import {withRouter} from 'react-router-dom'
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import  * as actions from '../../../store/action/index'



class ContactData extends Component{
    state={ 
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'type your Name',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
        },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'type your Street',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
        },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'type your ZIP code',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength :5,
                },
                valid:false,
                touched:false,
        },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'type your Country',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
        },
        
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'type your E-mail',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
        },
           deliveryMethod:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'Fastest', displayValue:'Fastest'},
                    {value:'Cheapest', displayValue:'Cheapest'},
                ],
            },
            value:'Fastest',
            validation:{},
            valid:true,
             },
    },
        
        formIsvalid:false,
    }

    orderHandler=(event)=>{
        event.preventDefault()
       
        const formData={};
        for(let formDataIdentifier in this.state.orderForm){
            formData[formDataIdentifier]=this.state.orderForm[formDataIdentifier].value;
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderdata:formData,
        }
        this.props.onOrderData(order);
        
    }
     checkValidity=(value,rules)=>{
        let isValid= true;
        if(rules.required){
            isValid= value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid=value.length >=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength && isValid;
        }
        return isValid;
     }


    inputChangedHandler=(event,inputIdentifier) => {
        const UpdatedOrderForm={
            ...this.state.orderForm
        };
       const UpdatedFormElement={  
           ...UpdatedOrderForm[inputIdentifier]
       };
       UpdatedFormElement.value= event.target.value;
       UpdatedFormElement.valid=this.checkValidity(UpdatedFormElement.value,UpdatedFormElement.validation);
       UpdatedFormElement.touched=true;
         
       let formIsvalid = true;
       for(let inputIdentifier in this.state.orderForm){
           formIsvalid=UpdatedOrderForm[inputIdentifier].valid && formIsvalid
       }



       UpdatedOrderForm[inputIdentifier]=UpdatedFormElement;
       this.setState({orderForm:UpdatedOrderForm, formIsvalid:formIsvalid});
    }


    render(){
      const formElementsArray =[];
      for(let key in this.state.orderForm){
          formElementsArray.push({
              id:key,
              config:this.state.orderForm[key]
          });
      }
     let form=(
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement=>(
              <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event)=>this.inputChangedHandler(event,formElement.id)} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsvalid}>Order Now</Button>
        </form>
        );
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Contact Details</h4>
                {form}
            </div>
        )
    }

}
const mapStateToprops = state =>{
return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading,

}
}

const mapDispatchToProps= dispatch=>{
    return{
        onOrderData: (orderData)=> dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToprops,mapDispatchToProps) (withRouter( ContactData,axios));