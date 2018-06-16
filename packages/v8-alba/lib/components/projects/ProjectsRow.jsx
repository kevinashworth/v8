import { Components, registerComponent, withCurrentUser, withDocument } from 'meteor/vulcan:core';
import React from 'react';
import { Link } from 'react-router';
import { Badge, Button } from 'reactstrap';
import moment from 'moment';
import { DATE_FORMAT_SHORT } from '../../modules/constants.js';
import Projects from '../../modules/projects/collection.js';

const ProjectsRow = ({loading, document, currentUser}) => {
  if (loading) {
    return (
      <tr></tr>
    )
  } else {
    const project = document;
    const displayDate = project.updatedAt ?
      "Last modified " + moment(project.updatedAt).format(DATE_FORMAT_SHORT) :
      "Created " + moment(project.createdAt).format(DATE_FORMAT_SHORT);

    var badgeColor = "danger";
    switch (project.status) {
      case "On Hiatus":
        badgeColor = "primary";
        break;
      case "Casting":
        badgeColor = "success";
        break;
      case "Ordered":
        badgeColor = "secondary";
        break;
      case "On Hold":
        badgeColor = "info";
        break;
      case "Shooting":
        badgeColor = "light";
        break;
      case "See Notes...":
        badgeColor = "dark";
        break;
      case "Pre-Prod.":
        badgeColor = "warning";
        break;
    }

    // TODO: a map or reduce version of this
    let fake_company = "TODO";
    // if (!project.castingCompany) {
    //   for (var i = 0; i < project.personnel.length; i++) {
    //     if (project.personnel[i].personnelTitle === "Casting Director")
    //       fake_company += (project.personnel[i].name.split(' ').slice(-1).join(' ') + "/");
    //   }
    //
    //   if (fake_company.length > 0) {
    //     fake_company = fake_company.slice(0, -1);
    //     fake_company += " Casting";
    //   } else {
    //     fake_company = "Unknown Casting Office";
    //   }
    // }

    return (
      <tr>
        <td><Link to={`/projects/${project._id}/${project.slug}`}>{project.projectTitle}</Link></td>
        <td>{project.projectType}</td>
        <td>{displayDate}</td>
        <td>{project.castingCompany ? project.castingCompany : fake_company}</td>
        <td>
          <Badge color={badgeColor}>{project.status}</Badge>
        </td>
        <td>{Projects.options.mutations.edit.check(currentUser, project) ?
          <Components.MyModalTrigger title="Edit Project" component={<Button>Edit</Button>}>
            <Components.ProjectsEditForm currentUser={currentUser} documentId={project._id} />
          </Components.MyModalTrigger>
          : null
        }</td>
      </tr>
    )}
}

const options = {
  collection: Projects,
  queryName: 'projectsSingleQuery',
  fragmentName: 'ProjectsSingleFragment',
};

registerComponent('ProjectsRow', ProjectsRow, withCurrentUser, [withDocument, options]);