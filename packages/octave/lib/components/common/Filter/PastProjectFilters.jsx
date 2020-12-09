import { registerComponent } from 'meteor/vulcan:core'
import { getActions } from 'meteor/vulcan:redux'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import FormCheck from 'react-bootstrap/FormCheck'
import DropdownItem from './DropdownItem'
import ToggleButtons from './ToggleButtons'
import { getCheckboxVariant, getRadioVariant, handleAllNoneToggle } from './utils'

const PastProjectFilters = () => {
  const getStatusFilters = (state) => state.pastProjectStatusFilters
  const statusFilters = useSelector(getStatusFilters)
  const statusVariant = useSelector(createSelector(getStatusFilters, getCheckboxVariant))

  const getTypeFilters = (state) => state.pastProjectTypeFilters
  const typeFilters = useSelector(getTypeFilters)
  const typeVariant = useSelector(createSelector(getTypeFilters, getCheckboxVariant))

  const getUpdatedFilters = (state) => state.pastProjectUpdatedFilters
  const updatedFilters = useSelector(getUpdatedFilters)
  const updatedVariant = useSelector(createSelector(getUpdatedFilters, getRadioVariant))

  const dispatch = useDispatch()
  const actions = getActions()

  const handleChange = (event) => {
    const i = parseInt(event.target.id, 10)
    switch (event.target.name) {
      case 'project-status':
        dispatch(actions.togglePastProjectStatusFilter(i))
        break
      case 'project-type':
        dispatch(actions.togglePastProjectTypeFilter(i))
        break
      case 'project-updated':
        dispatch(actions.togglePastProjectUpdatedFilter(i))
        break
    }
  }

  const handleClickProjectType = (event) => {
    const all = event.target.innerHTML.indexOf('All') !== -1
    const film = event.target.innerHTML.indexOf('Film') !== -1
    const none = event.target.innerHTML.indexOf('None') !== -1
    const toggle = event.target.innerHTML.indexOf('Toggle') !== -1
    const tv = event.target.innerHTML.indexOf('TV') !== -1
    const length = typeFilters.length
    if (toggle) {
      for (let i = 0; i < length; i++) {
        dispatch(actions.togglePastProjectTypeFilter(i))
      }
    } else if (all || none) {
      for (let i = 0; i < length; i++) {
        if ((none && typeFilters[i].value) || (all && !typeFilters[i].value)) {
          dispatch(actions.togglePastProjectTypeFilter(i))
        }
      }
    } else if (film) {
      for (let i = 0; i < length; i++) {
        if (typeFilters[i].projectType.indexOf('Film') !== -1) {
          dispatch(actions.setPastProjectTypeFilter(i))
        } else {
          dispatch(actions.clearPastProjectTypeFilter(i))
        }
      }
    } else if (tv) {
      for (let i = 0; i < length; i++) {
        if (typeFilters[i].projectType.indexOf('TV') !== -1) {
          dispatch(actions.setPastProjectTypeFilter(i))
        } else {
          dispatch(actions.clearPastProjectTypeFilter(i))
        }
      }
    }
  }

  const handleClickProjectStatus = (event) => {
    handleAllNoneToggle(event, statusFilters, dispatch, actions.togglePastProjectStatusFilter)
  }

  return (
    <div className='float-right'>
      <ButtonGroup>
        <Dropdown as={ButtonGroup} className='ml-2'>
          <Dropdown.Toggle id='dropdown-type' variant={typeVariant}>
            Type
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>Filter projects by type</Dropdown.Header>
            <DropdownItem>
              {typeFilters.map((project, index) =>
                <FormCheck
                  checked={project.value}
                  custom
                  id={`${index}-type`}
                  key={`${project.projectType}`}
                  label={`${project.projectType}`}
                  name='project-type'
                  onChange={handleChange}
                />
              )}
              <ToggleButtons buttons={['Film', 'TV', 'All', 'None', 'Toggle']} onClickHandler={handleClickProjectType} />
            </DropdownItem>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup} className='ml-2'>
          <Dropdown.Toggle id='dropdown-updated' variant={updatedVariant}>
            Last updated
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>Filter projects by last updated</Dropdown.Header>
            <DropdownItem>
              {updatedFilters.map((filter, index) =>
                <FormCheck
                  checked={filter.value}
                  custom
                  id={`${index}-updated`}
                  key={`${filter.updated}`}
                  label={`${filter.updated}`}
                  name='project-updated'
                  onChange={handleChange}
                  type='radio'
                />
              )}
            </DropdownItem>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown as={ButtonGroup} className='ml-2'>
          <Dropdown.Toggle id='dropdown-status' variant={statusVariant}>
            Status
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>Filter projects by status</Dropdown.Header>
            <DropdownItem>
              {statusFilters.map((project, index) =>
                <FormCheck
                  checked={project.value}
                  custom
                  id={`${index}-status`}
                  key={`${project.pastProjectStatus}`}
                  label={`${project.pastProjectStatus}`}
                  name='project-status'
                  onChange={handleChange}
                />
              )}
              <ToggleButtons onClickHandler={handleClickProjectStatus} />
            </DropdownItem>
          </Dropdown.Menu>
        </Dropdown>

      </ButtonGroup>
    </div>
  )
}

registerComponent('PastProjectFilters', React.memo(PastProjectFilters))
