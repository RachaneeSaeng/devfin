export const ADD_ANIMAL = 'ADD_ANIMAL'
export const RESET_ANIMAL = 'RESET_ANIMAL'
export const SET_ANIMAL = 'SET_ANIMAL'

export const addAnimal = (animal) => {
    return {
        type: ADD_ANIMAL,
        animal: animal,
    }
}

export const resetAnimal = (animal) => {
    return {
        type: RESET_ANIMAL,
    }
}

export const setAnimal = (animals) => {
    return {
        type: SET_ANIMAL,
        animal: animals
    }
}