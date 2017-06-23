import { combineReducers } from 'redux'

import script from './script'
import user from './user'
import dogs from './dog'

export default combineReducers({
    script,
    user,
    dogs,
}) 