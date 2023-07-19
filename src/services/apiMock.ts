import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const axiosInstance = axios.create()

const mock = new MockAdapter(axiosInstance)

mock.onGet('/dashboard').reply(200, {
  users: [{ id: 1, name: 'John', email: 'john@gmail.com' }],
})

mock.onPatch(/\/volunteer\/completed\/([^/]+)$/).reply(200, () => {
  return 'Success'
})

export default axiosInstance
