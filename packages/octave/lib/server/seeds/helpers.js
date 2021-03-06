const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const error = chalk.bold.red
const success = chalk.bold.green

const key = encodeURIComponent('8631d820')
const project = encodeURIComponent('Octave')

function generate (schema) {
  const url = 'https://api.mockaroo.com/api/generate.csv' +
    '?key=' + key +
    '&fields=' + encodeURIComponent(JSON.stringify(schema.columns))
  fetch(url, {
    method: 'post'
  }).then(res => {
    if (res.ok) {
      console.log(success(schema.name, 'generate success'))
      console.log('Mockaroo API response:')
      console.dir(res)
    } else {
      console.log(error('generate error:', res.statusText))
      console.dir(res)
    }
  })
}

function uploadFile (datasetName, filePath) {
  const filename = encodeURIComponent(path.basename(filePath))
  fetch(`https://api.mockaroo.com/api/datasets/${encodeURIComponent(datasetName)}?key=8631d820&filename=${filename}&project=${project}`, {
    method: 'post',
    body: fs.readFileSync(filePath),
    headers: {
      'content-type': 'text/csv'
    }
  }).then(res => {
    if (res.ok) {
      console.log(success(datasetName, 'upload success'))
      console.log('Mockaroo API response:')
      console.dir(res)
    } else {
      console.log(error('upload error:', res.statusText))
    }
  })
}

function upload (datasetName, data) {
  fetch(`https://api.mockaroo.com/api/datasets/${encodeURIComponent(datasetName)}?key=8631d820&filename=${datasetName}.csv&project=${project}`, {
    method: 'post',
    body: data,
    headers: {
      'content-type': 'text/csv'
    }
  }).then(res => {
    if (res.ok) {
      console.log(success(datasetName, 'upload success'))
      console.log('Mockaroo API response:')
      console.dir(res)
    } else {
      console.log(error('upload error:', res.statusText))
    }
  })
}

function destroy (name, path) {
  fetch(`https://api.mockaroo.com/api/datasets/${encodeURIComponent(name)}?key=8631d820`, {
    method: 'delete'
  }).then(res => {
    if (res.ok) {
      console.log(success(res))
    } else {
      console.log(error('destroy error:', res.statusText))
    }
  })
}

module.exports = {
  destroy,
  generate,
  upload,
  uploadFile
}
