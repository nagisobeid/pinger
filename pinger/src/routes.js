import Api from './api'

export default {
  getStatus (site) {
    //return Api().get(`/status?site=${site.site}`)
    return Api().get(`/`)
  }
}