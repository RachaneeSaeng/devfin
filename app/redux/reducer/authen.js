import {SET_LOGGED_IN} from '../action/authen'

function authen (state = false, action){
    switch (action.type){
        case 'SET_LOGGED_IN': return action.logged_in     
        default: return state
    }
}

export default authen