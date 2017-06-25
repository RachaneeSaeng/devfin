export const BEGIN_FETCH = 'BEGIN_FETCH'
export const BEGIN_EDIT = 'BEGIN_EDIT'
export const BEGIN_CAPTURE = 'BEGIN_CAPTURE'
export const END_FETCH = 'END_FETCH'
export const END_EDIT = 'END_EDIT'
export const END_CAPTURE = 'END_CAPTURE'
export const CREATE_NEW = 'CREATE_NEW'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const ERROR = 'FETCH_ANIMAL_ERROR'


export const beginFetch = () => { return { type: BEGIN_FETCH } }
export const beginEdit = () => { return { type: BEGIN_EDIT } }
export const beginCapture = () => { return { type: BEGIN_CAPTURE } }
export const endFetch = (detail) => { return { type: END_FETCH, detail } }
export const endEdit = () => { return { type: END_EDIT } }
export const endCapture = () => { return { type: END_CAPTURE } }
export const createNew = () => { return { type: CREATE_NEW } }
export const updateLocation = (geo) => {return {type: UPDATE_LOCATION, geo}}
export const error = (reason) => { return { type: ERROR, reason}}
