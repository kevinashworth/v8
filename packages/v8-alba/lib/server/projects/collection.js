import { extendCollection } from 'meteor/vulcan:core'
import { Projects } from '../../modules/projects/collection.js'
import {
  ProjectEditUpdateAlgoliaBefore,
  ProjectCreateSaveToAlgolia,
  ProjectEditUpdateContacts,
  ProjectCreateUpdateContacts,
  ProjectEditUpdateOfficeBefore,
  ProjectCreateUpdateOfficeAfter,
  ProjectCreateUpdateStatisticsAfter,
  ProjectEditUpdateStatusAfter
} from './callbacks/index.js'

extendCollection(Projects, {
  callbacks: {
    create: {
      after: [ProjectCreateSaveToAlgolia, ProjectCreateUpdateContacts, ProjectCreateUpdateOfficeAfter, ProjectCreateUpdateStatisticsAfter]
    },
    update: {
      after: [ProjectEditUpdateContacts, ProjectEditUpdateStatusAfter],
      before: [ProjectEditUpdateAlgoliaBefore, ProjectEditUpdateOfficeBefore]
    }
  }
})