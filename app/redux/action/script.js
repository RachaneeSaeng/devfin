
export const FBSDK_LOADED = 'FBSDK_LOADED'
export const GMAP_LOADED = 'GMAP_LOADED'
//we may need other script to load asynchronously

export const fbsdkLoaded = () => {
    return { type: FBSDK_LOADED }
}

export const gmapLoaded = () => {
    return { type: GMAP_LOADED }
}
