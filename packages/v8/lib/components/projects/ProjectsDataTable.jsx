import { Components, registerComponent, withAccess, withCurrentUser, withMulti } from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { BootstrapTable, ClearSearchButton, SearchField, TableHeaderColumn } from 'react-bootstrap-table'
import _ from 'lodash'
import moment from 'moment'
import { SIZE_PER_PAGE_LIST_SEED } from '../../modules/constants.js'
import { dateFormatter, renderShowsTotal, titleSortFunc } from '../../modules/helpers.js'
import Projects from '../../modules/projects/collection.js'
import withFilters from '../../modules/hocs/withFilters.js'

// Set initial state. Just options I want to keep.
// See https://github.com/amannn/react-keep-state
let keptState = {
  searchColor: 'btn-secondary',
  options: {
    defaultSearch: '',
    page: 1,
    sizePerPage: 50,
    sortName: 'updatedAt',
    sortOrder: 'desc'
  }
}

const AddButtonFooter = () => {
  return (
    <Card.Footer>
      <Components.ModalTrigger title='New Project' component={<Button variant='secondary'>Add a Project</Button>}>
        <Components.ProjectsNewForm />
      </Components.ModalTrigger>
    </Card.Footer>
  )
}

const ProjectsDataTable = (props) => {
  const [show, setShow] = useState(false)
  const [project, setProject] = useState(null)
  const [searchColor, setSearchColor] = useState(keptState.searchColor)
  const [options, setOptions] = useState(keptState.options)

  // Remember state for the next mount
  useEffect(() => {
    return () => {
      keptState = {
        searchColor,
        options
      }
    }
  })

  const createCustomClearButton = (onClick) => {
    return (
      <ClearSearchButton
        btnContextual={searchColor}
        className='btn-sm'
        onClick={e => handleClearButtonClick(onClick)}
      />
    )
  }

  const createCustomSearchField = ({ defaultValue }) => {
    if (defaultValue.length && searchColor !== 'btn-danger') {
      setSearchColor('btn-danger')
    } else if (defaultValue.length === 0 && searchColor !== 'btn-secondary') {
      setSearchColor('btn-secondary')
    }
    return (
      <SearchField defaultValue={defaultValue} />
    )
  }

  const handleClearButtonClick = (onClick) => {
    setSearchColor('btn-secondary')
    onClick()
  }

  const handleHide = () => {
    if (show) {
      setShow(false)
    }
  }

  const pageChangeHandler = (page, sizePerPage) => {
    setOptions(prevOptions => {
      return { ...prevOptions, page, sizePerPage }
    })
  }

  const rowClickHandler = (row, columnIndex, rowIndex, event) => {
    setProject(row)
    setShow(true)
  }

  const sortChangeHandler = (sortName, sortOrder) => {
    setOptions(prevOptions => {
      return { ...prevOptions, sortName, sortOrder }
    })
  }

  const searchChangeHandler = (searchText) => {
    setOptions(prevOptions => {
      return { ...prevOptions, defaultSearch: searchText }
    })
  }

  const sizePerPageListHandler = (sizePerPage) => {
    setOptions(prevOptions => {
      return { ...prevOptions, sizePerPage }
    })
  }

  const {
    count, currentUser, loadingMore, loadMore, networkStatus, results, totalCount,
    projectTypeFilters, projectStatusFilters, projectUpdatedFilters, projectPlatformFilters
  } = props

  const hasMore = results && (totalCount > results.length)
  var typeFilters = []
  projectTypeFilters.forEach(filter => {
    if (filter.value) { typeFilters.push(filter.projectType) }
  })
  var statusFilters = []
  projectStatusFilters.forEach(filter => {
    if (filter.value) { statusFilters.push(filter.projectStatus) }
  })
  var platformFilters = []
  projectPlatformFilters.forEach(filter => {
    if (filter.value) { platformFilters.push(filter.projectPlatform) }
  })

  const filteredResults = useMemo(
    () => {
      var momentNumber = 100
      var momentPeriod = 'years'
      projectUpdatedFilters.some(filter => {
        if (filter.value) {
          momentNumber = filter.momentNumber
          momentPeriod = filter.momentPeriod
          return true
        }
      })
      const newResults = _.filter(results, function (o) {
        const objectDate = moment(o.updatedAt ? o.updatedAt : o.createdAt)
        const dateToCompare = moment().subtract(momentNumber, momentPeriod).startOf('day')
        const displayThis = objectDate.isAfter(dateToCompare)
        return _.includes(statusFilters, o.status) &&
          _.includes(typeFilters, o.projectType) &&
          _.includes(platformFilters, o.platformType) &&
          displayThis
      })
      return newResults
    },
    [results, platformFilters, projectUpdatedFilters, typeFilters, statusFilters]
  )

  if (networkStatus !== 8 && networkStatus !== 7) {
    return (
      <div className='animated fadeIn'>
        <Card className='card-accent-danger'>
          <Card.Header>
            <i className='fa fa-camera' />Projects
          </Card.Header>
          <Card.Body>
            <Components.Loading />
          </Card.Body>
        </Card>
      </div>
    )
  }

  return (
    <div className='animated fadeIn'>
      <Components.HeadTags title='V8: Projects' />
      {project &&
        <Modal show={show} onHide={handleHide}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Link to={`/projects/${project._id}/${project.slug}`}>{project.projectTitle}</Link>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Components.ProjectModal document={project} />
          </Modal.Body>
        </Modal>}
      <Card className='card-accent-danger'>
        <Card.Header>
          <i className='fa fa-camera' />Projects
          <Components.ProjectFilters />
        </Card.Header>
        <Card.Body>
          <BootstrapTable
            bordered={false}
            condensed
            data={filteredResults}
            hover
            keyField='_id'
            options={{
              ...options,
              sortIndicator: true,
              paginationSize: 5,
              hidePageListOnlyOnePage: true,
              prePage: '‹',
              nextPage: '›',
              firstPage: '«',
              lastPage: '»',
              paginationShowsTotal: renderShowsTotal,
              paginationPosition: 'both',
              clearSearch: true,
              clearSearchBtn: createCustomClearButton,
              searchField: createCustomSearchField,
              onPageChange: pageChangeHandler,
              onRowClick: rowClickHandler,
              onSizePerPageList: sizePerPageListHandler,
              onSortChange: sortChangeHandler,
              onSearchChange: searchChangeHandler,
              sizePerPageList: SIZE_PER_PAGE_LIST_SEED.concat([{
                text: 'All', value: totalCount
              }])
            }}
            pagination
            search
            striped
            version='4'
          >
            <TableHeaderColumn
              dataField='projectTitle'
              dataSort
              dataFormat={(cell, row) => {
                return (
                  <Link to={`/projects/${row._id}/${row.slug}`}>
                    {cell}
                  </Link>
                )
              }}
              sortFunc={titleSortFunc}
              width='25%'
            >
              Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField='casting' dataSort>Casting</TableHeaderColumn>
            <TableHeaderColumn dataField='network' dataSort>Network</TableHeaderColumn>
            <TableHeaderColumn dataField='projectType' dataSort>Type</TableHeaderColumn>
            <TableHeaderColumn dataField='status' dataSort width='94px'>Status</TableHeaderColumn>
            <TableHeaderColumn dataField='updatedAt' dataSort dataFormat={dateFormatter} dataAlign='right' width='94px'>Updated</TableHeaderColumn>
            <TableHeaderColumn dataField='summary' hidden>Hidden</TableHeaderColumn>
            <TableHeaderColumn dataField='notes' hidden>Hidden</TableHeaderColumn>
            <TableHeaderColumn dataField='allContactNames' hidden>Hidden</TableHeaderColumn>
            <TableHeaderColumn dataField='allAddresses' hidden>Hidden</TableHeaderColumn>
          </BootstrapTable>
        </Card.Body>
        {hasMore &&
          <Card.Footer>
            {loadingMore
              ? <Components.Loading />
              : <Button onClick={e => { e.preventDefault(); loadMore() }}>Load More ({count}/{totalCount})</Button>}
          </Card.Footer>}
        {Users.canCreate({ collection: Projects, user: currentUser }) && <AddButtonFooter />}
      </Card>
    </div>
  )
}

const accessOptions = {
  groups: ['participants', 'admins'],
  redirect: '/welcome/new'
}

const multiOptions = {
  collection: Projects,
  fragmentName: 'ProjectsDataTableFragment',
  limit: 1000
}

registerComponent({
  name: 'ProjectsDataTable',
  component: ProjectsDataTable,
  hocs: [
    [withAccess, accessOptions],
    withCurrentUser,
    withFilters,
    [withMulti, multiOptions]
  ]
})
