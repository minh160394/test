import request from "../api/axios"
import {
    USER_BALANCE,
    TRANSACTION_HISTORY
} from "./types";


export const getuserBalance = (username) => async dispatch => {
    const response = await request.post('/users/balance',{
        key: "username", 
        value:"ayesha",
        username:"investment_user" // username: username
    });
    const newbalance = Object.values(response.data.user_balance);
    const fixedbalance = await newbalance.reduce((acc,current) => {
    const pass = acc.find(item => (item.currency === current.currency ? item.balance += current.balance : false));
         if(!pass){
            return acc.concat([current]);
         }else{ 
             return acc;
         }
    },[]);
        let  balance  = new Object();
            fixedbalance.map(v => 
            {              
               return balance[v.currency] = parseFloat(v.balance.toFixed(2)) ;
            });
    dispatch ({type: USER_BALANCE, payload: balance});
}

export const getuserTransacionHistory = (username) => async dispatch => {
    const response = await request.post('/accounts/transaction_history',{
        username:"ayesha" // username: username
    });
    dispatch ({type: TRANSACTION_HISTORY, payload: response.data});
}
