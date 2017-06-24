import {
    BEGIN_FETCH, END_FETCH,
    BEGIN_EDIT, END_EDIT,
    BEGIN_CAPTURE, END_CAPTURE,
    CREATE_NEW, ERROR
} from '../action/currentAnimal'

const init = {
    isLoading: false,
    isEditMode: true,
    isCapturing: false,
    error: null,
    animalId: null,
    animalName: null,
    animalType: null,
    photo_urls: [],
    views: 0,
    breed: null,
    gender: null,
    geo: { lat: 13.7563, lng: 100.5018 },
    location: null,
    status: null,
    contact: null,
    description: null,
    owner: null,
}

const currentAnimal = (state = init, action) => {
    switch (action.type){
        case BEGIN_FETCH: return {...init, isLoading: true}
        case END_FETCH: return {...state, ...(action.detail), isLoading: false, isEditMode: false, isCapturing: false}
        case BEGIN_EDIT: return {...state, isEditMode: true}
        case END_EDIT: return {...state, isEditMode: false, isCapturing: false}
        case BEGIN_CAPTURE: return {...state, isCapturing: true, isPicking: false}
        case END_CAPTURE: return {...state, isCapturing: false}
        case CREATE_NEW: return {...init}
        case ERROR: return {...init, error: action.reason}
        default: return state
    }
}

export default currentAnimal
