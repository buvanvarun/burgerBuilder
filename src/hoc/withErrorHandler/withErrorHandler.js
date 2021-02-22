import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';

const withErrorHandler=(WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error:null
        }
        constructor(props){
            super(props);
            this.requestInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.responseInterceptor=axios.interceptors.response.use(res=>res,err=>{
                this.setState({error:err})
            
            });
        } 
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.reponse.eject(this.responseInterceptor);
        }
        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }
        render(){
            return (
                <Auxiliary>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error?this.state.error.message:null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Auxiliary>
            )
        }
    }
}

export default withErrorHandler;