import { Connectors, createMutator, deleteMutator } from 'meteor/vulcan:core'
import _ from 'lodash'
import Offices from '../../offices/collection.js'
import Projects from '../../projects/collection.js'
import PastProjects from '../collection.js'
import { ACTIVE_PROJECT_STATUSES_ARRAY } from '../../constants.js'

// if the new status is now an active project, create a new project then remove this past-project
// if the new project is created and matches (TODO: matches what, exactly?), delete current

export async function PastProjectUpdateStatusAsync ({ currentUser, document, oldDocument }) {
  const newStatusIsActive = _.includes(ACTIVE_PROJECT_STATUSES_ARRAY, document.status)

  const createNewProject = async () => {
    try {
      return await createMutator({
        collection: Projects,
        document,
        currentUser,
        validate: false
      })
    } catch (e) {
      console.group('Error in createNewProject:')
      console.error(e)
      console.groupEnd()
    }
  }

  const deletePastProject = async () => {
    try {
      return await deleteMutator({
        collection: PastProjects,
        documentId: document._id,
        currentUser,
        validate: false
      })
    } catch (err) {
      console.error('error in deletePastProject:', err)
    }
  }

  if (newStatusIsActive) {
    const newProject = (await createNewProject()).data

    if (newProject.projectTitle === document.projectTitle) {
      await deletePastProject()
    }

    if (document.castingOfficeId) {
      let pastProjects = []
      let projects = []
      const office = Offices.findOne(document.castingOfficeId)
      if (office.pastProjects && office.pastProjects.length) {
        pastProjects = office.pastProjects
        _.remove(pastProjects, function (p) {
          return p._id === document._id
        })
      }
      if (office.projects && office.projects.length) {
        projects = office.projects
      }
      projects.push({ projectId: newProject._id })
      Connectors.update(Offices, document.castingOfficeId, {
        $set: {
          pastProjects,
          projects,
          updatedAt: new Date()
        }
      })
    }
  }
}