import api from '@/api'
import { createClient } from '@/api/client'

describe('api', () => {
  describe('/client.js', () => {
    it('should create a new axios client', () => {
      const client = createClient()
      expect(client).toBeDefined()
    })
  })

  describe('/index.js', () => {
    describe('.getFieldOptions()', () => {
      it('should load unique fields', async () => {
        const result = await api.getFieldOptions('results')
        expect(result).toBeDefined()
      })

      it('gracefully fail', async () => {
        const result = await api.getFieldOptions('invalidField') /*?*/
        expect(result.error).toBeDefined()
      })
    })
    describe('.normalizeAndGroupOptions()', () => {
      it('should return consolidated options', () => {
        const input = ['tavern', 'TAVERN/ 1006', 'TAVERN-LIQUOR', 'TAVERN/LIQUOR']
        const expected = {
          tavern: ['tavern', 'TAVERN/ 1006'],
          'tavern liquor': ['TAVERN-LIQUOR', 'TAVERN/LIQUOR'],
        }
        const result = api.utils.normalizeAndGroupOptions(input)
        expect(result).toMatchObject(expected)
      })
    })
  })
})
