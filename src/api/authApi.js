import axios from 'axios'

export const getUser = () => axios.get('/auth/user')

export const loginApi = (body) => axios.post('/auth/login', body)

export const signupApi = (body) => axios.post('/auth/signup', body)

export const deleteUserApi = (id) => axios.delete(`/auth/delete/${id}`)