import {ADD_ANIMAL, RESET_ANIMAL} from '../action/animal'

function animal (state = [], action){
    switch (action.type){
        case 'ADD_ANIMAL': return state.concat(action.animal)
        case 'RESET_ANIMAL': return []
        default: return state
    }
}

export default animal