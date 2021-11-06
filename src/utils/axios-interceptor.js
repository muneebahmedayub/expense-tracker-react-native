import axios from 'axios'
import store from '../redux/store'
import { logout } from '../redux/actions/authActions'
import { Alert } from 'react-native'

const axiosInterceptor = () => {
    const baseUrl = 'https://muneeb-expense-tracker.herokuapp.com/'
    // const baseUrl = 'http://localhost:5000'

    axios.defaults.baseURL = baseUrl
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.interceptors.response.use(
        async (response) => {
            if (response.status >= 200 && response.status <= 300) {
                return response.data
            }
        },
        (error) => {
            const { response, request } = error

            if (response) {
                if (response.status >= 400 && response.status <= 500) {
                    Alert.alert(response.data?.error)
                    if (response.status === 401) {
                        store.dispatch(logout())
                    }
                    return null
                }
            }
            else if (request) {
                Alert.alert('Request failed please try again')
                return null
            }
            return Promise.reject(error)
        }
    )
}

export default axiosInterceptor