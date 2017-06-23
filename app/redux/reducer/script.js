import { FBSDK_LOADED, GMAP_LOADED } from '../action/script'

const init = {
    fb: false,
    google: false,
}

function script(state = init, action){
    switch (action.type){
        case FBSDK_LOADED:
            return {...state, fb: true }
        case GMAP_LOADED:
            return {...state, google: true }
        default:
            return state
    }
}

export default script