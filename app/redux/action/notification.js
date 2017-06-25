export const SET_NOTI_COUNT = 'SET_NOTI_COUNT'

export const setNotiCount = (count) => {
    return {
        type: SET_NOTI_COUNT,
        noticount: count
    }
}