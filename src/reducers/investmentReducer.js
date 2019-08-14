import _ from 'lodash';
import {
    USER_BALANCE
} from '../actions/types';

export default (state={}, action) =>{
    switch(action.type){
        case USER_BALANCE :
            return {...state, ...action.payload};
        default:
            return state;
     
    }
}