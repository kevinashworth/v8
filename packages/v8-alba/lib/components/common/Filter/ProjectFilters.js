import { registerComponent } from 'meteor/vulcan:core'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  ButtonDropdown,
  ButtonGroup,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap'
import styled from 'styled-components'
import withFilters from '../../../modules/hocs/withFilters.js'

// DropdownItemStatic: I simply copied pertinent-seeming styles generated by a DropdownItem, but there is no "flash" when you click
const DropdownItemStatic = styled.div`
  border-bottom: 1px solid #c2cfd6;
  padding: 10px 20px;
  white-space: nowrap;
`

// Set initial state. Just options I want to keep.
// See https://github.com/amannn/react-keep-state
let keptState = {
  typeColor: 'secondary',
  updatedColor: 'secondary',
  statusColor: 'secondary',
  platformColor: 'secondary'
}

class ProjectFilters extends PureComponent {
  constructor (props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.handleClickProjectType = this.handleClickProjectType.bind(this)
    this.handleClickProjectStatus = this.handleClickProjectStatus.bind(this)
    this.handleClickProjectPlatform = this.handleClickProjectPlatform.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      dropdownOpen: new Array(4).fill(false),
      ...keptState
    }
  }

  componentWillUnmount () {
    // Remember state for the next mount
    keptState = {
      typeColor: this.state.typeColor,
      updatedColor: this.state.updatedColor,
      statusColor: this.state.statusColor,
      platformColor: this.state.platformColor
    }
  }

  toggle (i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false) })
    this.setState({
      dropdownOpen: newArray
    })
  }

  handleChange (event) {
    const i = parseInt(event.target.id, 10)
    if (event.target.name === 'project-type') {
      this.props.actions.toggleProjectTypeFilter(i)
      this.setState({ typeColor: 'danger' })
    }
    if (event.target.name === 'project-updated') {
      const all = event.target.labels[0].innerHTML.indexOf('All') !== -1
      this.props.actions.toggleProjectUpdatedFilter(i)
      if (all) {
        this.setState({ updatedColor: 'secondary' })
      } else {
        this.setState({ updatedColor: 'danger' })
      }
    }
    if (event.target.name === 'project-status') {
      this.props.actions.toggleProjectStatusFilter(i)
      this.setState({ statusColor: 'danger' })
    }
    if (event.target.name === 'project-platform') {
      this.props.actions.toggleProjectPlatformFilter(i)
      this.setState({ platformColor: 'danger' })
    }
  }

  // TODO: DRY these handlers below this line

  handleClickProjectType (event) {
    const all = event.target.innerHTML.indexOf('All') !== -1
    const film = event.target.innerHTML.indexOf('Film') !== -1
    const none = event.target.innerHTML.indexOf('None') !== -1
    const toggle = event.target.innerHTML.indexOf('Toggle') !== -1
    const tv = event.target.innerHTML.indexOf('TV') !== -1
    const length = this.props.projectTypeFilters.length
    if (toggle) {
      for (let i = 0; i < length; i++) {
        this.props.actions.toggleProjectTypeFilter(i)
      }
    } else if (all || none) {
      for (let i = 0; i < length; i++) {
        if ((this.props.projectTypeFilters[i].value && none) || (!this.props.projectTypeFilters[i].value && !none)) {
          this.props.actions.toggleProjectTypeFilter(i)
        }
      }
    } else if (film) {
      for (let i = 0; i < length; i++) {
        if (this.props.projectTypeFilters[i].projectType.indexOf('Film') !== -1) {
          this.props.actions.setProjectTypeFilter(i)
        } else {
          this.props.actions.clearProjectTypeFilter(i)
        }
      }
    } else if (tv) {
      for (let i = 0; i < length; i++) {
        if (this.props.projectTypeFilters[i].projectType.indexOf('TV') !== -1) {
          this.props.actions.setProjectTypeFilter(i)
        } else {
          this.props.actions.clearProjectTypeFilter(i)
        }
      }
    }
    if (all) {
      this.setState({ typeColor: 'secondary' })
    }
    if (none) {
      this.setState({ typeColor: 'danger' })
    }
  }

  handleClickProjectPlatform (event) {
    const all = event.target.innerHTML.indexOf('All') !== -1
    const none = event.target.innerHTML.indexOf('None') !== -1
    const toggle = event.target.innerHTML.indexOf('Toggle') !== -1
    const length = this.props.projectPlatformFilters.length
    if (toggle) {
      for (let i = 0; i < length; i++) {
        this.props.actions.toggleProjectPlatformFilter(i)
      }
    } else if (all || none) {
      for (let i = 0; i < length; i++) {
        if ((this.props.projectPlatformFilters[i].value && none) || (!this.props.projectPlatformFilters[i].value && !none)) {
          this.props.actions.toggleProjectPlatformFilter(i)
        }
      }
    }
    if (all) {
      this.setState({ platformColor: 'secondary' })
    }
    if (none) {
      this.setState({ platformColor: 'danger' })
    }
  }

  handleClickProjectStatus (event) {
    const all = event.target.innerHTML.indexOf('All') !== -1
    const none = event.target.innerHTML.indexOf('None') !== -1
    const active = event.target.innerHTML.indexOf('Active') !== -1
    const toggle = event.target.innerHTML.indexOf('Toggle') !== -1
    const length = this.props.projectStatusFilters.length
    if (toggle) {
      for (let i = 0; i < length; i++) {
        this.props.actions.toggleProjectStatusFilter(i)
      }
    } else if (active) {
      let i
      for (i = 0; i < length - 4; i++) { // Pre-Prod., Ordered, On Hiatus, On Hold are not considered Active
        this.props.actions.setProjectStatusFilter(i)
      }
      for (; i < length; i++) {
        this.props.actions.clearProjectStatusFilter(i)
      }
      this.setState({ statusColor: 'primary' })
    } else if (all || none) {
      for (let i = 0; i < length; i++) {
        if ((this.props.projectStatusFilters[i].value && none) || (!this.props.projectStatusFilters[i].value && !none)) {
          this.props.actions.toggleProjectStatusFilter(i)
        }
      }
    }
    if (all) {
      this.setState({ statusColor: 'secondary' })
    }
    if (none) {
      this.setState({ statusColor: 'danger' })
    }
  }

  render () {
    const { vertical } = this.props
    return (
      <div className={vertical ? '' : 'float-right'}>
        <ButtonGroup vertical={vertical}>
          <ButtonDropdown className={vertical ? 'mb-2' : 'ml-2'} isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0) }}>
            <DropdownToggle caret color={this.state.typeColor}>
            Type
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Filter projects by type</DropdownItem>
              <DropdownItemStatic>
                {this.props.projectTypeFilters.map((project, index) =>
                  <CustomInput type='checkbox' name='project-type'
                    id={`${index}-type`} key={`${project.projectType}`} label={`${project.projectType}`}
                    checked={project.value} onChange={this.handleChange} />
              )}
              </DropdownItemStatic>
              <DropdownItem onClick={this.handleClickProjectType} toggle={false}>Film</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectType} toggle={false}>TV</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectType} toggle={false}>All</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectType} toggle={false}>None</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectType} toggle={false}>Toggle</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown className={vertical ? 'mb-2' : 'ml-2'} isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1) }}>
            <DropdownToggle caret color={this.state.updatedColor}>
            Last updated
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Filter projects by last updated</DropdownItem>
              <DropdownItemStatic>
                {this.props.projectUpdatedFilters.map((filter, index) =>
                  <CustomInput type='radio' name='project-updated'
                    id={`${index}-updated`} key={`${filter.projectUpdated}`} label={`${filter.projectUpdated}`}
                    checked={filter.value} onChange={this.handleChange} />
              )}
              </DropdownItemStatic>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown className={vertical ? 'mb-2' : 'ml-2'} isOpen={this.state.dropdownOpen[2]} toggle={() => { this.toggle(2) }}>
            <DropdownToggle caret color={this.state.statusColor}>
            Status
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Filter projects by status</DropdownItem>
              <DropdownItemStatic>
                {this.props.projectStatusFilters.map((project, index) =>
                  <CustomInput type='checkbox' name='project-status'
                    id={`${index}-status`} key={`${project.projectStatus}`} label={`${project.projectStatus}`}
                    checked={project.value} onChange={this.handleChange} />
              )}
              </DropdownItemStatic>
              <DropdownItem onClick={this.handleClickProjectStatus} toggle={false}>All</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectStatus} toggle={false}>Active</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectStatus} toggle={false}>None</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectStatus} toggle={false}>Toggle</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
          <ButtonDropdown className={vertical ? 'mb-2' : 'ml-2'} isOpen={this.state.dropdownOpen[3]} toggle={() => { this.toggle(3) }}>
            <DropdownToggle caret color={this.state.platformColor}>
            Platform
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Filter projects by platform</DropdownItem>
              <DropdownItemStatic>
                {this.props.projectPlatformFilters.map((o, index) =>
                  <CustomInput type='checkbox' name='project-platform'
                    id={`${index}-platform`} key={`${o.projectPlatform}`} label={`${o.projectPlatform}`}
                    checked={o.value} onChange={this.handleChange} />
              )}
              </DropdownItemStatic>
              <DropdownItem onClick={this.handleClickProjectPlatform} toggle={false}>All</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectPlatform} toggle={false}>None</DropdownItem>
              <DropdownItem onClick={this.handleClickProjectPlatform} toggle={false}>Toggle</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </div>
    )
  }
}

ProjectFilters.propTypes = {
  vertical: PropTypes.bool
}

registerComponent('ProjectFilters', ProjectFilters, withFilters)
