import React,{Component} from 'react';
import classes from './Modal.css'
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import BackDrop from '../../UI/BackDrop/BackDrop';



class Modal extends Component{
 shouldComponentUpdate(nextProps, nextState ){
    return nextProps.show !== this.props.show|| nextProps.children !== this.props.children;
 }
 componentDidUpdate(){
    console.log('[Model] willUpdate');
 } 

   render(){
      return(<Auxilary>
         <BackDrop show ={this.props.show} clicked={this.props.modalClosed}/>
         <div className={classes.Modal}
            style={{transform: this.props.show ? 'translateY(0)': 'translateY(-100vh)',
            opacity:this.props.show ? '1':'0',
            }}>
            {this.props.children}
         </div>
    </Auxilary>);
   }
} 


export default Modal;

