import axios from 'axios'

const client = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data.data
    })
  },
  getContacts () {
    return this.execute('get', '/contacts')
  },
  getContact (id) {
    return this.execute('get', `/contacts/${id}`)
  },
  createContact (data) {
    return this.execute('post', '/contacts', data)
  },
  updateContact (id, data) {
    return this.execute('put', `/contacts/${id}`, data)
  },
  deleteContact (id) {
    return this.execute('delete', `/contacts/${id}`)
  }
}