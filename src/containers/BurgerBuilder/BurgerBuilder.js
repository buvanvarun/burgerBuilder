import React , {Component} from 'react'
import Auxiliary from "../../hoc/Auxiliary"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
const INGREDIENT_PRICES ={
    salad: 15,
    cheese: 10,
    meat: 20,
    bacon: 25
}
class BurgerBuilder extends Component {

    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 40,
        purchasing: false
    }

    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const newCount=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=newCount;
        

        const oldPrice=this.state.totalPrice;
        const addOnPrice=INGREDIENT_PRICES[type];
        const newPrice=oldPrice+addOnPrice;

        this.setState({ingredients:updatedIngredients,totalPrice:newPrice})
    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const oldPrice=this.state.totalPrice;
        let newPrice;
        let newCount;
        if(oldCount !==0)
        {
            newCount=oldCount-1;
            newPrice=oldPrice-INGREDIENT_PRICES[type];
        }
        else{
            newCount=oldCount;
            newPrice=oldPrice;
        }
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=newCount;

        this.setState({ingredients:updatedIngredients,totalPrice:newPrice})     
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        alert("You continue!");
    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        const status=Object.keys(disabledInfo).map(igKey=>disabledInfo[igKey]).findIndex(el=>el===false);
        let orderStatus;
        if(status===-1)
        orderStatus=true;
        else
        orderStatus=false;

        return(
            <Auxiliary>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing} >
                    <OrderSummary price={this.state.totalPrice} purchaseCancled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    orderStatus={orderStatus}
                    ordered={this.purchaseHandler}
                />
            </Auxiliary>
        );
    }

}

export default BurgerBuilder;