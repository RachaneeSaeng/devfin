import {LOGIN, LOGOUT} from '../action/user'

const init = {
    id: null,
    name: null,
    isLogin: false,
}

function user(state = init, action){
    switch (action.type){
        case LOGIN: return action.user
        case LOGOUT: return {...state, isLogin: false}
        default: return state
    }
}

export default user
