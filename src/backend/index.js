const express = require('express')
const aws = require('aws-sdk')
const bluebird = require('bluebird')
const bodyParser = require('body-parser')

const PORT = process.env.APP_NODE_PORT || 8080
const BUCKET_NAME = process.env.BUCKET_NAME || 'aws-s3-upload-sample'

const app = express()
app.use(bodyParser())

const s3 = new aws.S3({
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
})

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/', (req, res) => {
  res.send('Hello upload sample!')
})

app.get('/upload/start', async (req, res) => {
  try {
    let params = {
      Bucket: BUCKET_NAME,
      Key: req.query.filename,
      ContentType: req.query.filetype
    }
    let createUploadPromise = bluebird.promisify(s3.createMultipartUpload.bind(s3))
    let uploadData = await createUploadPromise(params)
    res.json({ uploadId: uploadData.UploadId })
  } catch(e) {
    console.log(e)
  }
})

app.get('/upload/get-pre-signed-url', async (req, res) => {
  try {
    let params = {
      Bucket: BUCKET_NAME,
      Key: req.query.filename,
      PartNumber: req.query.partNumber,
      UploadId: req.query.uploadId
    }
    let uploadPartPromised = bluebird.promisify(s3.getSignedUrl.bind(s3))
    let presignedUrl = await uploadPartPromised('uploadPart', params)
    res.json({ presignedUrl })
  } catch(e) {
    console.log(e)
  }
})

app.post('/upload/complete', async (req, res) => {
  try {
    let params = {
      Bucket: BUCKET_NAME,
      Key: req.body.params.filename,
      MultipartUpload: {
        Parts: req.body.params.parts
      },
      UploadId: req.body.params.uploadId
    }
    let completeUploadPromise = bluebird.promisify(s3.completeMultipartUpload.bind(s3))
    let data = await completeUploadPromise(params)
    res.json(data)
  } catch(e) {
    console.log(e)
  }
})

app.listen(PORT, () => {
  console.log(`Sample upload app listening on port ${PORT}`)
})