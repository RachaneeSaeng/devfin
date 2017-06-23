export const ADD_DOG = 'ADD_DOG'
export const RESET_DOG = 'RESET_DOG'
export const SET_DOG = 'SET_DOG'

export const addDog = (dog) => {
    return {
        type: ADD_DOG,
        dog: dog,
    }
}

export const resetDog = (dog) => {
    return {
        type: RESET_DOG,
    }
}

export const setDog = (dogs) => {
    return {
        type: SET_DOG,
        dog: dogs
    }
}