/// <reference types="cypress" />

/**
 * Update Projects to test packages/octave/lib/server/projects/callbacks
 *
 * Reminder: Use keyword `function`, not arrow function, to access `this.items.foo`
 */

const clear = Cypress.LocalStorage.clear
const doNotClearLocalStorage = () => { }

describe('Projects Update', () => {
  before(() => {
    Cypress.LocalStorage.clear = doNotClearLocalStorage
    cy.downloadTriad()
    cy.resetTriad()
    cy.stubAlgolia()
    cy.readyForCypress()
    cy.login()
    cy.getTestingCollection('contacts')
    cy.getTestingCollection('offices')
    cy.getTestingCollection('projects')
  })

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('meteor_login_token')
    cy.fixture('output/callback-testing/testing-contacts.json').as('testingContacts')
    cy.fixture('output/callback-testing/testing-offices.json').as('testingOffices')
    cy.fixture('output/callback-testing/testing-projects.json').as('testingProjects')
  })

  it('reorder the contacts and offices on a 2-contact-2-office project', function () {
    const project = Cypress._.find(this.testingProjects, { projectTitle: 'INDONESIA' })
    const project2 = Cypress._.find(this.testingProjects, { projectTitle: 'THAILAND' })
    const contact1 = Cypress._.find(this.testingContacts, { displayName: 'COBBIE CHATER' })
    const contact2 = Cypress._.find(this.testingContacts, { displayName: 'SHANE SAVINS' })
    const office1 = Cypress._.find(this.testingOffices, { displayName: 'SKIMIA CASTING' })
    const office2 = Cypress._.find(this.testingOffices, { displayName: 'KAZIO CASTING' })
    const log = Cypress.log({
      name: 'reorder',
      displayName: 'REORDER ON A PROJECT',
      message: ['Using react-sortable-hoc to reorder contacts and offices on a project'],
      autoEnd: false
    })
    // verify all 5 items before
    cy.visit('/projects')
    cy.get(`a[href$=${project.slug}][data-cy=projects-link]`, { log: false }).click()
    cy.get('[data-cy=project-header]', { log: false }).contains(project.projectTitle)
    cy.get('[data-cy=contact-link]').should('have.length', 2)
    cy.get('[data-cy=contact-link]').first().should('contain', contact1.displayName)
    cy.get('[data-cy=contact-link]').last().should('contain', contact2.displayName)
    cy.get('[data-cy=office-link]').should('have.length', 2)
    cy.get('[data-cy=office-link]').first().should('contain', office1.displayName)
    cy.get('[data-cy=office-link]').last().should('contain', office2.displayName)
    const verifyRemainingItems = () => {
      cy.visit('/contacts')
      cy.get(`a[href$=${contact1.slug}][data-cy=contacts-link]`, { log: false }).click()
      cy.get('[data-cy=contact-header]', { log: false }).contains(contact1.displayName)
      cy.get('[data-cy=project-link]').should('have.length', 1)
      cy.get('[data-cy=project-link]').should('contain', project.projectTitle)
      cy.get('[data-cy=office-link]').should('have.length', 1)
      cy.get('[data-cy=office-link]').should('contain', office1.displayName)
      cy.visit('/contacts')
      cy.get(`a[href$=${contact2.slug}][data-cy=contacts-link]`, { log: false }).click()
      cy.get('[data-cy=contact-header]', { log: false }).contains(contact2.displayName)
      cy.get('[data-cy=project-link]').should('have.length', 2)
      cy.get('[data-cy=project-link]').first().should('contain', project2.projectTitle)
      cy.get('[data-cy=project-link]').last().should('contain', project.projectTitle)
      cy.get('[data-cy=office-link]').should('have.length', 1)
      cy.get('[data-cy=office-link]').should('contain', office2.displayName)
      cy.visit('/offices')
      cy.get(`a[href$=${office1.slug}][data-cy=offices-link]`, { log: false }).click()
      cy.get('[data-cy=office-header]', { log: false }).contains(office1.displayName)
      cy.get('[data-cy=contact-link]').should('have.length', 1)
      cy.expectInnerText('[data-cy=contact-link]', contact1.displayName)
      cy.get('[data-cy=project-link]').should('not.exist')
      cy.visit('/offices')
      cy.get(`a[href$=${office2.slug}][data-cy=offices-link]`, { log: false }).click()
      cy.get('[data-cy=office-header]', { log: false }).contains(office2.displayName)
      cy.get('[data-cy=contact-link]').should('have.length', 1)
      cy.expectInnerText('[data-cy=contact-link]', contact2.displayName)
      cy.get('[data-cy=project-link]').should('have.length', 2)
      cy.get('[data-cy=project-link]').first().should('contain', project.projectTitle)
      cy.get('[data-cy=project-link]').last().should('contain', project2.projectTitle)
    }
    verifyRemainingItems()
    log.snapshot()

    // edit
    cy.visit('/projects')
    cy.get(`a[href$=${project.slug}][data-cy=projects-link]`, { log: false }).click()
    cy.get('[data-cy=project-header]', { log: false }).contains(project.projectTitle)
    cy.get('[data-cy=edit-button]').click({ force: true })
    cy.get('.form-section-contacts').within(() => {
      cy.waitForContactOptions()
      cy.get('[data-cy=drag-handle-0]').type(' {downarrow} ', { force: true })
    })
    cy.get('.form-section-offices').within(() => {
      cy.waitForOfficeOptions()
      cy.get('[data-cy=drag-handle-0]').type(' {downarrow} ', { force: true })
    })
    cy.get('.form-submit > button').click()
    cy.get('[data-cy=project-header]', { log: false }).contains(project.projectTitle)

    // verify all 5 items after - first/last on project should change, nothing else
    cy.get('[data-cy=contact-link]').should('have.length', 2)
    cy.get('[data-cy=contact-link]').last().should('contain', contact1.displayName)
    cy.get('[data-cy=contact-link]').first().should('contain', contact2.displayName)
    cy.get('[data-cy=office-link]').should('have.length', 2)
    cy.get('[data-cy=office-link]').last().should('contain', office1.displayName)
    cy.get('[data-cy=office-link]').first().should('contain', office2.displayName)
    verifyRemainingItems()
    log.snapshot()
    cy.percySnapshot()

    log.end()
  })

  it('contacts on a project: add, delete, and update titles', {
    retries: {
      runMode: 0,
      openMode: 0
    }
  }, function () {
    const project = Cypress._.find(this.testingProjects, { projectTitle: 'SWEDEN' })
    const contact0 = Cypress._.find(this.testingContacts, { displayName: 'ADELIND ARONOW' })
    const contact1 = Cypress._.find(this.testingContacts, { displayName: 'PANDORA PAFFLEY' })
    const contact2 = Cypress._.find(this.testingContacts, { displayName: 'BRODIE BYRON' })
    const contact3 = Cypress._.find(this.testingContacts, { displayName: 'SHANE SAVINS' })
    const NEW_TITLE = 'Intern'
    const log = Cypress.log({
      name: 'c on a p',
      displayName: 'CONTACTS ON A PROJECT',
      message: 'Test handleAddContacts, handleRemoveContacts, handleUpdateContacts',
      autoEnd: false
    })

    // verify all 5 items before
    cy.goTo('projects', project)
    cy.get('[data-cy=project-header]', { log: false }).contains(project.projectTitle)
    cy.get('[data-cy=contact-link]').should('have.length', 3)
    cy.get('[data-cy=contact-link]').first().should('contain', contact0.displayName)
    cy.get('[data-cy=contact-link]').last().should('contain', contact2.displayName)
    cy.goTo('contacts', contact0)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact0.displayName)
    cy.get('[data-cy=title-for-project]').should('not.exist')
    cy.get('[data-cy=project-link]').should('contain', project.projectTitle)
    cy.goTo('contacts', contact1)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact1.displayName)
    cy.get('[data-cy=project-link]').should('contain', project.projectTitle)
    cy.goTo('contacts', contact2)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact2.displayName)
    cy.get('[data-cy=project-link]').should('contain', project.projectTitle)
    cy.goTo('contacts', contact3)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact3.displayName)
    cy.get('[data-cy=project-link]').should('not.contain', project.projectTitle)
    log.snapshot()

    // edit
    cy.goTo('projects', project)
    cy.get('[data-cy=project-header]', { log: false }).contains(project.projectTitle, { log: false })
    cy.edit()
    cy.get('.form-section-contacts').within(() => {
      cy.waitForContactOptions()
      cy.clickRedRemoveButton(2)
      cy.clickGreenAddButton()
      cy.selectContactAndTitle(contact0.displayName, NEW_TITLE, 0)
      cy.selectContactAndTitle(contact3.displayName, contact3.title, 3) // note to self: despite deletion, this is #contactId3 not #contactId2 in SmartForm
    })
    cy.submit()
    cy.get('[data-cy=project-header]', { log: false }).contains(project.projectTitle, { log: false })

    // verify all 5 items after
    cy.get('[data-cy=contact-link]').should('have.length', 3)
    cy.get('[data-cy=contact-link]').first().should('contain', contact0.displayName)
    cy.get('[data-cy=contact-link]').last().should('contain', contact3.displayName)
    cy.goTo('contacts', contact0)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact0.displayName)
    cy.get('[data-cy=project-link]').should('contain', project.projectTitle)
    cy.get('[data-cy=title-for-project]').should('contain', NEW_TITLE)
    cy.goTo('contacts', contact1)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact1.displayName)
    cy.get('[data-cy=project-link]').should('contain', project.projectTitle)
    cy.goTo('contacts', contact2)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact2.displayName)
    cy.get('[data-cy=project-link]').should('not.exist')
    cy.goTo('contacts', contact3)
    cy.get('[data-cy=contact-header]', { log: false }).contains(contact3.displayName)
    cy.get('[data-cy=project-link]').should('contain', project.projectTitle)

    log.end()
  })

  after(() => {
    Cypress.LocalStorage.clear = clear
  })
})
