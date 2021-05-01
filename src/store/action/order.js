import * as actionTypes from './actionTypes';
import axios from '../../Axios-orders'


export const purchseBurgerSuccess=(id,orderData)=>{
    return {
        type:actionTypes.Purchase_Burger_Success,
        orderId:id,
        orderData:orderData,
    };
}

export const purchaseBurgerFail=(error)=>{
    return{
       type:actionTypes.Purchase_Burger_Fail,
       error:error
    };
}
export const purchaseBurgerstart=()=>{
    return{
        type:actionTypes.purchase_Burger_Start
    }
}

export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerstart());
        axios.post('/orders.json',orderData)
        .then(response=>{
            console.log(response.data)
            dispatch(purchseBurgerSuccess(response.data.name,orderData))
        
        })
        .catch(err=>{
          dispatch(purchaseBurgerFail(err))
        })

    };
}
export const purchaseInit=()=>{
    return{
        type:actionTypes.Purchase_Init
    };
}

export const fetchOrdersStart =()=>{
    return{
        type:actionTypes.Fetch_Orders_Start,
    };
}

export const fetchOrdersSuccess=(orders)=>{
    return{
       type:actionTypes.Fetch_Orders_Success,
       orders:orders
    };
}
export const fetchOrdersFailed=(error)=>{
    return{
       type:actionTypes.Fetch_Orders_Failed,
       error:error
    };
}
export const fetchOrders=()=>{
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res=>{
            const fetchedOrders=[];
            for( let key in res.data){
               fetchedOrders.push({
                   ...res.data[key],
                   id:key
               });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        }
        )
        .catch(err=>{
            dispatch(fetchOrdersFailed(err))
        })
    };
}