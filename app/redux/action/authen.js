export const SET_LOGGED_IN = 'SET_LOGGED_IN'

export const setLoggedIn = (logged_in) => {
    return {
        type: SET_LOGGED_IN,
        logged_in: logged_in
    }
}