import { createClient } from './client'

const client = createClient()

export const getFieldOptions = field => {
  return client
    .request({
      params: {
        $select: field,
        $group: field,
      },
    })
    .then(resp => {
      return resp.data.map(i => i[field])
    })
    .catch(err => {
      const resp = err.response
      return {
        resp,
        status: resp.status,
        statusText: resp.statusText,
        error: {
          message: resp.data.message,
          code: resp.data.errorCode,
          data: resp.data.data,
        },
      }
    })
}

/**
 * Normalizes and maps fields to a common, searchable field
 * @param {String[]} options - The options returned by the API
 * @return {Object}
 */
export const getCombinedOptions = options => {
  const mapping = {}
  options.forEach(
    /** @param {String} opt */ opt => {
      // 1008 - CHILDERN'S /SERVICE FACILITY
      const normal = opt /*?*/
        // 1008/children's /service facility
        .toLowerCase()
        // 1008 children's  service facility
        .replace(/[/\-_]/g, ' ') /*?*/
        // 1008 children's service facility
        .replace(/\s+/g, ' ') /*?*/
        //  childrens service facility
        .replace(/[^a-z\s]/g, '')
        // childrens service facility
        .trim()
      mapping[normal] = mapping[normal] || []
      mapping[normal].push(opt)
    }
  )
  return mapping
}

//let opts = getFieldOptions('facility_type') /*?*/
// getCombinedOptions(opts)

export default {
  createClient,
  getFieldOptions,
  getCombinedOptions,
}
