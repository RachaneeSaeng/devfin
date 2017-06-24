export const UPDATE_TIMELINE = 'UPDATE_TIMELINE'

export const updateTimeline = (timeline) => {
    return {
        type: UPDATE_TIMELINE,
        timeline: timeline
    }
}