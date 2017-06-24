import {
    BEGIN_FETCH, END_FETCH,
    BEGIN_EDIT, END_EDIT,
    BEGIN_CAPTURE, END_CAPTURE,
    CREATE_NEW
} from '../action/currentAnimal'

const init = {
    dogId: null,
    isLoading: false,
    isEditMode: true,
    isCapturing: false,
    name: null,
    photo_urls: [],
    views: 0,
    type: null,
    breed: null,
    gender: null,
    location: { lat: 13.7563, lng: 100.5018 },
    contact: null,
    description: null
}

const currentAnimal = (state = init, action) => {
    switch (action.type){
        case BEGIN_FETCH: return {...init, isLoading: true}
        case END_FETCH: return {...state, ...(action.detail)}
        case BEGIN_EDIT: return {...state, isEditMode: true}
        case END_EDIT: return {...state, isEditMode: false}
        case BEGIN_CAPTURE: return {...state, isCapturing: true}
        case END_CAPTURE: return {...state, isCapturing: false}
        case CREATE_NEW: return {...init}
        default: return state
    }
}

export default currentAnimal
