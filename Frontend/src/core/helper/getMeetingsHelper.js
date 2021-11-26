
const { API } = require("../../backend");

export const getMeetings = (userId, token) => {
    return fetch(`${API}/meetings/user/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch((err) => {
            return err
        })
}


export const deleteMeeting = (userId, token, meetingId) => {
    return fetch(`${API}/meeting/${meetingId}/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json
        })
        .catch((err) => {
            return err
        })
}