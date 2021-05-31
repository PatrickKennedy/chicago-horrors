import axios from 'axios'

export const createClient = () => {
  return axios.create({
    baseURL: 'https://data.cityofchicago.org/resource/cwig-ma7x.json',
    timeout: 2500,
    headers: {
      'X-App-Token': 'LCQ6YR03g5AhmvsOkYfPGeSiL',
    },
  })
}
