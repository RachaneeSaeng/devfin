import {UPDATE_TIMELINE} from '../action/timeline'

function timeline (state = null, action){
    switch (action.type){
        case 'UPDATE_TIMELINE': return action.timeline     
        default: return state
    }
}

export default timeline