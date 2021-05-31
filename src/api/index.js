import { createClient } from './client'

const client = createClient()

export const joinFuzzyTerms = fields =>
  Object.entries(fields).map(([field, values]) => {
    let term = ''
    term += `${field} in (`
    term += values.map(value => `"${value}"`).join(', ')
    term += ')'
    return term
  })

export const joinTextTerms = fields =>
  Object.entries(fields).map(([field, value]) => {
    let term = ''
    term += `${field} like '%${value}%'`
    return term
  })

export const search = ({ fuzzy, exact, text }) => {
  let $where = ''
  $where += [...joinFuzzyTerms(fuzzy), ...joinTextTerms(text)].join(' AND ')

  return client
    .request({
      params: {
        $where,
        ...exact,
        $order: 'inspection_date DESC',
        $limit: 250,
      },
    })
    .then(resp => {
      return resp
    })
}

export const getInspection = id => {
  return client
    .request({
      params: {
        inspection_id: id,
      },
    })
    .then(resp => {
      return resp
    })
}

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
export const normalizeAndGroupOptions = options => {
  const mapping = {}
  options.forEach(
    /** @param {String} opt */ opt => {
      if (typeof opt !== 'string') return
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
  utils: { normalizeAndGroupOptions },
}
