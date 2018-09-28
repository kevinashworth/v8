import { registerComponent } from 'meteor/vulcan:core'
import React, { PureComponent } from 'react'
import {
  ButtonDropdown,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'
import _ from 'lodash'
import styled from 'styled-components'

// DropdownItemStatic: I simply copied pertinent-seeming styles generated by a DropdownItem, but there is no "flash" when you click
const DropdownItemStatic = styled.div`
  border-bottom: 1px solid #c2cfd6;
  padding: 10px 20px;
  white-space: nowrap;
`

// Set initial state. Just options I want to keep.
// See https://github.com/amannn/react-keep-state
let keptState = {
  projectTypeFilters: [
    { projectType: 'Feature Film', value: true },
    { projectType: 'Feature Film (LB)', value: true },
    { projectType: 'Feature Film (MLB)', value: true },
    { projectType: 'Feature Film (ULB)', value: true },
    { projectType: 'Pilot One Hour', value: true },
    { projectType: 'Pilot 1/2 Hour', value: true },
    { projectType: 'TV One Hour', value: true },
    { projectType: 'TV 1/2 Hour', value: true },
    { projectType: 'TV Daytime', value: true },
    { projectType: 'TV Mini-Series', value: true },
    { projectType: 'TV Movie', value: true },
    { projectType: 'New Media (SVOD)', value: true },
    { projectType: 'New Media (AVOD)', value: true },
    { projectType: 'New Media (<$50k)', value: true }
  ],
  projectStatusFilters: [
    { projectStatus: 'Casting', value: true },
    { projectStatus: 'On Hold', value: true },
    { projectStatus: 'Shooting', value: true },
    { projectStatus: 'On Hiatus', value: true },
    { projectStatus: 'See Notes', value: true },
    { projectStatus: 'Unknown', value: true },
    { projectStatus: 'Wrapped', value: true },
    { projectStatus: 'Canceled', value: true }
  ],
  projectUpdatedFilterList: [
    'One Day',
    'One Week',
    'Two Weeks',
    'One Month',
    'Two Months',
    'One Year'
  ],
  projectUpdatedFilter: 'One Month'
}

class ProjectFiltersState extends PureComponent {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.state = {
      dropdownOpen: new Array(3).fill(false),
      // Retrieve the last state
      ...keptState
    }

    console.log('ProjectFiltersState state:', this.state)
  }

  toggle (i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false) })
    this.setState({
      dropdownOpen: newArray
    })
  }

  handleInputChange (event) {
    const target = event.target
    const id = target.id
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    this.setState(prevState => {
      const i = _.findIndex(prevState[`${name}Filters`], { [name]: id })
      let newFilters = prevState[`${name}Filters`]
      newFilters[i].value = value
      return { [`${name}Filters`]: newFilters }
    })
  }

  // this happens to handle the Do Not Filter link as empty string, which should work
  handleOptionChange (event) {
    // eslint-disable-next-line no-console
    console.log('handleOptionChange:', event.target.id)
    this.setState({
      filterProjectsByLastUpdated: event.target.id
    })
    // this.context.updateCurrentValues({ filterProjectsByLastUpdated: event.target.id });
  }

  handleClick (event) {
    // eslint-disable-next-line no-console
    console.info('handleClick: An event was triggered: ', event.target)
  }

  // props.editMutation({
  //   documentId: this.props.currentUser._id,
  //   set: set,
  //   unset: {}
  // })
  // .then(/* success */)
  // .catch(/* error */);

  componentWillUnmount () {
    // Remember state for the next mount
    const { projectTypeFilters } = this.state
    keptState = {
      projectTypeFilters: projectTypeFilters
    }
  }

  render () {
    return (
      <div className='float-right'>
        <ButtonDropdown className='ml-2' isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0) }}>
          <DropdownToggle caret>
            Type
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter projects by type</DropdownItem>
            <DropdownItemStatic>
              {this.state.projectTypeFilters.map(project =>
                <CustomInput type='checkbox' name='projectType'
                  id={`${project.projectType}`} key={`${project.projectType}`} label={`${project.projectType}`}
                  checked={project.value} onChange={this.handleInputChange} />
              )}
            </DropdownItemStatic>
            <DropdownItem toggle={false}><a href='#' size='sm' color='primary'>Show All</a></DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown className='ml-2' isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1) }}>
          <DropdownToggle caret>
            Last updated
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter projects by last updated</DropdownItem>
            <DropdownItemStatic>
              {/* <CustomInput type="radio" name="lastupdated" id="filterProjectsByLastUpdatedOneDay" label="One Day"
                checked={this.state.filterProjectsByLastUpdated === 'filterProjectsByLastUpdatedOneDay'} onChange={this.handleOptionChange} />
              <CustomInput type="radio" name="lastupdated" id="filterProjectsByLastUpdatedOneWeek" label="One Week"
                checked={this.state.filterProjectsByLastUpdated === 'filterProjectsByLastUpdatedOneWeek'} onChange={this.handleOptionChange} />
              <CustomInput type="radio" name="lastupdated" id="filterProjectsByLastUpdatedTwoWeeks" label="Two Weeks"
                checked={this.state.filterProjectsByLastUpdated === 'filterProjectsByLastUpdatedTwoWeeks'} onChange={this.handleOptionChange} />
              <CustomInput type="radio" name="lastupdated" id="filterProjectsByLastUpdatedOneMonth" label="One Month"
                checked={this.state.filterProjectsByLastUpdated === 'filterProjectsByLastUpdatedOneMonth'} onChange={this.handleOptionChange} />
              <CustomInput type="radio" name="lastupdated" id="filterProjectsByLastUpdatedTwoMonths" label="Two Months"
                checked={this.state.filterProjectsByLastUpdated === 'filterProjectsByLastUpdatedTwoMonths'} onChange={this.handleOptionChange} />
              <CustomInput type="radio" name="lastupdated" id="filterProjectsByLastUpdatedOneYear" label="One Year"
                checked={this.state.filterProjectsByLastUpdated === 'filterProjectsByLastUpdatedOneYear'} onChange={this.handleOptionChange} /> */}
            </DropdownItemStatic>
            <DropdownItem toggle={false}><a onClick={this.handleOptionChange}>Do Not Filter by Last Updated</a></DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown className='ml-2' isOpen={this.state.dropdownOpen[2]} toggle={() => { this.toggle(2) }}>
          <DropdownToggle caret>
            Status
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter projects by status</DropdownItem>
            <DropdownItemStatic>
              {/* <CustomInput type="checkbox" id="filterProjectsByStatusCasting" label="Casting"
                checked={this.state.filterProjectsByStatusCasting} onChange={this.handleInputChange} />
              <CustomInput type="checkbox" id="filterProjectsByStatusOnHold" label="On Hold"
                checked={this.state.filterProjectsByStatusOnHold} onChange={this.handleInputChange} />
              <CustomInput type="checkbox" id="filterProjectsByStatusShooting" label="Shooting"
                checked={this.state.filterProjectsByStatusShooting} onChange={this.handleInputChange} />
              <CustomInput type="checkbox" id="filterProjectsByStatusOnHiatus" label="On Hiatus"
                checked={this.state.filterProjectsByStatusOnHiatus} onChange={this.handleInputChange} />
              <CustomInput type="checkbox" id="filterProjectsByStatusSeeNotes" label="See Notes"
                checked={this.state.filterProjectsByStatusSeeNotes} onChange={this.handleInputChange} />
              <CustomInput type="checkbox" id="filterProjectsByStatusUnknown" label="Unknown"
                checked={this.state.filterProjectsByStatusUnknown} onChange={this.handleInputChange} /> */}
            </DropdownItemStatic>
            <DropdownItem header>Inactive</DropdownItem>
            <DropdownItemStatic>
              {/* <CustomInput type="checkbox" id="filterProjectsByStatusWrapped" label="Wrapped"
                checked={this.state.filterProjectsByStatusWrapped} onChange={this.handleInputChange} />
              <CustomInput type="checkbox" id="filterProjectsByStatusCanceled" label="Canceled"
                checked={this.state.filterProjectsByStatusCanceled} onChange={this.handleInputChange} /> */}
            </DropdownItemStatic>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }
}

registerComponent('ProjectFiltersState', ProjectFiltersState)
