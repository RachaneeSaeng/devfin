import {ADD_DOG, RESET_DOG} from '../action/dog'


function dog (state = [], action){
    switch (action.type){
        case 'ADD_DOG': return state.concat(action.dog)
        case 'RESET_DOG': return []
        default: return state
    }
}

export default dog