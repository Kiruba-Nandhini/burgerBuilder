import React,{Component} from 'react';
import Model from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary/Auxilary'




const withErrorHandler=(WrappedComponent,Axios)=>{
    return class extends Component{
        state={
          error:null,
        }
        componentWillMount(){
            this.reqinterceptors=Axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req;
            })

            this.resinterceptors=Axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            });
        }
        componentWillUnmount(){
            Axios.interceptors.request.eject(this.reqinterceptors);
            Axios.interceptors.response.eject(this.resinterceptors);

        }

        ErrorConfrimedHandler=()=>{
            this.setState({error:null});
        }
    

        render(){
            
                return(
                    <Auxilary>
                        <Model 
                        modalClosed={this.ErrorConfrimedHandler}
                        show={this.state.error}>
                            {this.state.error ? this.state.error.message:null}
                        </Model>
                        <WrappedComponent {...this.props}/>
                    </Auxilary>
                )
            
        }
    }

};

export default withErrorHandler;