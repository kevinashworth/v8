import { registerComponent } from "meteor/vulcan:core";
import React, { PureComponent } from 'react';
import {
  ButtonDropdown,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import styled from 'styled-components';
import withFilters from '../../../modules/withFilters.js';

// DropdownItemStatic: I simply copied pertinent-seeming styles generated by a DropdownItem, but there is no "flash" when you click
const DropdownItemStatic = styled.div`
  border-bottom: 1px solid #c2cfd6;
  padding: 10px 20px;
  white-space: nowrap;
`;

class ProjectFiltersWrapped extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleClickProjectType = this.handleClickProjectType.bind(this);
    this.handleClickProjectStatus = this.handleClickProjectStatus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      dropdownOpen: new Array(3).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray
    });
  }

  handleChange(event) {
    const i = parseInt(event.target.id, 10);
    if (event.target.name === 'projectType')
      this.props.actions.toggleProjectTypeFilter(i);
    if (event.target.name === 'projectStatus')
      this.props.actions.toggleProjectStatusFilter(i);
    if (event.target.name === 'projectUpdated')
      this.props.actions.toggleProjectUpdatedFilter(i);
  }

  handleClickProjectType(event) {
    // const all = event.target.innerHTML.indexOf("All") !== -1;
    const none = event.target.innerHTML.indexOf("None") !== -1;
    const length = this.props.projectTypeFilters.length;
    var i;
    if (event.target.innerHTML.indexOf("Toggle") !== -1) {
      for (i = 0; i < length; i++) {
        this.props.actions.toggleProjectTypeFilter(i);
      }
    } else {
      for (i = 0; i < length; i++) {
        if ((this.props.projectTypeFilters[i].value && none) || (!this.props.projectTypeFilters[i].value && !none)) {
          this.props.actions.toggleProjectTypeFilter(i);
        }
      }
    }
  }

  // TODO: DRY these two handlers above and below this line

  handleClickProjectStatus(event) {
    const none = event.target.innerHTML.indexOf("None") !== -1;
    const length = this.props.projectStatusFilters.length;
    var i;
    if (event.target.innerHTML.indexOf("Toggle") !== -1) {
      for (i = 0; i < length; i++) {
        this.props.actions.toggleProjectStatusFilter(i);
      }
    } else {
      for (i = 0; i < length; i++) {
        if ((this.props.projectStatusFilters[i].value && none) || (!this.props.projectStatusFilters[i].value && !none)) {
          this.props.actions.toggleProjectStatusFilter(i);
        }
      }
    }
  }

  render() {
    return (
      <div className="float-right">
        <ButtonDropdown className="ml-2" isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggle(0)}}>
          <DropdownToggle caret>
            Type
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter projects by type</DropdownItem>
            <DropdownItemStatic>
              {this.props.projectTypeFilters.map((project, index) =>
                <CustomInput type="checkbox" name="projectType"
                  id={`${index}-type`} key={`${project.projectType}`} label={`${project.projectType}`}
                  checked={project.value} onChange={this.handleChange} />
              )}
            </DropdownItemStatic>
            <DropdownItem onClick={this.handleClickProjectType} toggle={false}>All</DropdownItem>
            <DropdownItem onClick={this.handleClickProjectType} toggle={false}>None</DropdownItem>
            <DropdownItem onClick={this.handleClickProjectType} toggle={false}>Toggle</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown className="ml-2" isOpen={this.state.dropdownOpen[1]} toggle={() => {this.toggle(1)}}>
          <DropdownToggle caret>
            Last updated
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter projects by last updated</DropdownItem>
            <DropdownItemStatic>
              {this.props.projectUpdatedFilters.map((filter, index) =>
                <CustomInput type="radio" name="projectUpdated"
                  id={`${index}-updated`} key={`${filter.projectUpdated}`} label={`${filter.projectUpdated}`}
                  checked={filter.value} onChange={this.handleChange} />
              )}
            </DropdownItemStatic>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown className="ml-2" isOpen={this.state.dropdownOpen[2]} toggle={() => {this.toggle(2)}}>
          <DropdownToggle caret>
            Status
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter projects by status</DropdownItem>
            <DropdownItemStatic>
              {this.props.projectStatusFilters.map((project, index) =>
                <CustomInput type="checkbox" name="projectStatus"
                  id={`${index}-status`} key={`${project.projectStatus}`} label={`${project.projectStatus}`}
                  checked={project.value} onChange={this.handleChange} />
              )}
            </DropdownItemStatic>
            <DropdownItem onClick={this.handleClickProjectStatus} toggle={false}>All</DropdownItem>
            <DropdownItem onClick={this.handleClickProjectStatus} toggle={false}>None</DropdownItem>
            <DropdownItem onClick={this.handleClickProjectStatus} toggle={false}>Toggle</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

registerComponent('ProjectFiltersWrapped', ProjectFiltersWrapped, withFilters);
