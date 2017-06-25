import {SET_NOTI_COUNT} from '../action/notification'

function notification (state = 0, action) {
    switch (action.type) {         
        case 'SET_NOTI_COUNT': return action.noticount   
        default: return state
    }
}

export default notification