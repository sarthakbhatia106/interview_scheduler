import { API } from "../../backend";
//category calls
export const createMeeting = (userId, token, meeting) => {
  return fetch(`${API}meeting/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(meeting)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};