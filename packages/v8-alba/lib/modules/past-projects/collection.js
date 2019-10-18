import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core'
import schema from './schema.js'

const PastProjects = createCollection({
  collectionName: 'PastProjects',
  typeName: 'PastProject',
  schema,
  resolvers: getDefaultResolvers('PastProjects'),
  mutations: getDefaultMutations('PastProjects')
})

export default PastProjects