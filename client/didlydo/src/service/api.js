import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000",
    headers: {
        "Content-Type" : "application/json"
    }
})

// GET:
// ----
export const getEvents = () => api.get('/api/events/')
export const getEvent = (id) =>  {return api.get(`/api/events/${id}`)
}

// POST:
// -----
export const addEvent = (e) => {
    return api.post('/api/events', e)}


export const addAttendee = (e, id) => {
    return api.post(`/api/events/${id}/attend`, e)
}

// PATCH:
// ------
export const isAvailable = (e, id) => {
    return api.patch(`/api/events/${id}/attend`, e)
}

// DELETE:
// -------

export const deleteEvent = (id) => {
    return api.delete(`/api/events/${id}/`)
}


export default api;

