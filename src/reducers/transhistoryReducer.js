import _ from 'lodash';
import {
    TRANSACTION_HISTORY
} from '../actions/types';

export default (state={}, action) =>{
    switch(action.type){
        case TRANSACTION_HISTORY :
            return {...state, ...action.payload.transaction_history};
        default:
            return state;
     
    }
}