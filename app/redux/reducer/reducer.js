import { combineReducers } from 'redux'

import script from './script'
import user from './user'
import animals from './animal'
import currentAnimal from './currentAnimal'
import authen from './authen'
import timeline from './timeline'
import notification from './notification'

export default combineReducers({
    script,
    user,
    animals,
    currentAnimal,
    authen,
    timeline,
    notification
}) 