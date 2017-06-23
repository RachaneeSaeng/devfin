import { combineReducers } from 'redux'

import script from './script'
import user from './user'
import animals from './animal'

export default combineReducers({
    script,
    user,
    animals,
}) 