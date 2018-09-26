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
import withContactFilters from '../../../modules/filters/withContactFilters.js';

// DropdownItemStatic: I simply copied pertinent-seeming styles generated by a DropdownItem, but there is no "flash" when you click
const DropdownItemStatic = styled.div`
  border-bottom: 1px solid #c2cfd6;
  padding: 10px 20px;
  white-space: nowrap;
`;

class ContactFilters extends PureComponent {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleClickContactTitle = this.handleClickContactTitle.bind(this);
    this.handleClickContactLocation = this.handleClickContactLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      dropdownOpen: new Array(3).fill(false),
      titleColor: 'secondary',
      updatedColor: 'secondary',
      locationColor: 'secondary'
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
    if (event.target.name === 'contactTitle') {
      this.props.actions.toggleContactTitleFilter(i);
      this.setState({ titleColor: 'danger' });
    }
    if (event.target.name === 'contactUpdated') {
      const all = event.target.labels[0].innerHTML.indexOf("All") !== -1;
      this.props.actions.toggleContactUpdatedFilter(i);
      if (all) {
        this.setState({ updatedColor: 'secondary' });
      } else {
        this.setState({ updatedColor: 'danger' });
      }
    }
    if (event.target.name === 'contactLocation') {
      this.props.actions.toggleContactLocationFilter(i);
      this.setState({ locationColor: 'danger' });
    }
  }

  handleClickContactTitle(event) {
    const all = event.target.innerHTML.indexOf("All") !== -1;
    const none = event.target.innerHTML.indexOf("None") !== -1;
    const length = this.props.contactTitleFilters.length;
    var i;
    if (event.target.innerHTML.indexOf("Toggle") !== -1) {
      for (i = 0; i < length; i++) {
        this.props.actions.toggleContactTitleFilter(i);
      }
    } else {
      for (i = 0; i < length; i++) {
        if ((this.props.contactTitleFilters[i].value && none) || (!this.props.contactTitleFilters[i].value && !none)) {
          this.props.actions.toggleContactTitleFilter(i);
        }
      }
    }
    if (all) {
      this.setState({ titleColor: 'secondary' });
    }
  }

  // TODO: DRY these two handlers above and below this line

  handleClickContactLocation(event) {
    const all = event.target.innerHTML.indexOf("All") !== -1;
    const none = event.target.innerHTML.indexOf("None") !== -1;
    const length = this.props.contactLocationFilters.length;
    var i;
    if (event.target.innerHTML.indexOf("Toggle") !== -1) {
      for (i = 0; i < length; i++) {
        this.props.actions.toggleContactLocationFilter(i);
      }
    } else {
      for (i = 0; i < length; i++) {
        if ((this.props.contactLocationFilters[i].value && none) || (!this.props.contactLocationFilters[i].value && !none)) {
          this.props.actions.toggleContactLocationFilter(i);
        }
      }
    }
    if (all) {
      this.setState({ locationColor: 'secondary' });
    }
  }

  render() {
    return (
      <div className="float-right">
        <ButtonDropdown className="ml-2" isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggle(0)}}>
          <DropdownToggle caret color={this.state.titleColor}>
            Title
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter contacts by title</DropdownItem>
            <DropdownItemStatic>
              {this.props.contactTitleFilters.map((contact, index) =>
                <CustomInput type="checkbox" name="contactTitle"
                  id={`${index}-type`} key={`${contact.contactTitle}`} label={`${contact.contactTitle}`}
                  checked={contact.value} onChange={this.handleChange} />
              )}
            </DropdownItemStatic>
            <DropdownItem onClick={this.handleClickContactTitle} toggle={false}>All</DropdownItem>
            <DropdownItem onClick={this.handleClickContactTitle} toggle={false}>None</DropdownItem>
            <DropdownItem onClick={this.handleClickContactTitle} toggle={false}>Toggle</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown className="ml-2" isOpen={this.state.dropdownOpen[1]} toggle={() => {this.toggle(1)}}>
          <DropdownToggle caret color={this.state.updatedColor}>
            Last updated
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter contacts by last updated</DropdownItem>
            <DropdownItemStatic>
              {this.props.contactUpdatedFilters.map((filter, index) =>
                <CustomInput type="radio" name="contactUpdated"
                  id={`${index}-updated`} key={`${filter.contactUpdated}`} label={`${filter.contactUpdated}`}
                  checked={filter.value} onChange={this.handleChange} />
              )}
            </DropdownItemStatic>
          </DropdownMenu>
        </ButtonDropdown>
        <ButtonDropdown className="ml-2" isOpen={this.state.dropdownOpen[2]} toggle={() => {this.toggle(2)}}>
          <DropdownToggle caret color={this.state.locationColor}>
            Location
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Filter contacts by location</DropdownItem>
            <DropdownItemStatic>
              {this.props.contactLocationFilters.map((contact, index) =>
                <CustomInput type="checkbox" name="contactLocation"
                  id={`${index}-status`} key={`${contact.contactLocation}`} label={`${contact.contactLocation}`}
                  checked={contact.value} onChange={this.handleChange} />
              )}
            </DropdownItemStatic>
            <DropdownItem onClick={this.handleClickContactLocation} toggle={false}>All</DropdownItem>
            <DropdownItem onClick={this.handleClickContactLocation} toggle={false}>None</DropdownItem>
            <DropdownItem onClick={this.handleClickContactLocation} toggle={false}>Toggle</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}

registerComponent('ContactFilters', ContactFilters, withContactFilters);
