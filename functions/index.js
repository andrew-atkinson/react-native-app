const functions = require('firebase-functions');
const core = require('cors')({origin: true})
const fs = require('fs')
const firebaseKeys = require('./firebase-keys.json')

const gcconfig = {
  projectId: firebaseKeys.projectId,
  keyFilename: 'places-private.json'
}
const gcs = require('@google-cloud/storage')(gcconfig)

const UUID = require('uuid-v4')

// // Create and Deploy Your First Cloud Functions //
// https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.storeImage = functions.https.onRequest((req, res) => {
    core(req, res, () => {
      const body = JSON.parse(req.body)
      fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', err => {
        console.log("filesync error:", err)
        return res.status(500).json({error: err})
      })
      const bucket = gcs.bucket(firebaseKeys.bucket)
      const uuid = UUID()
      bucket.upload('/tmp/uploaded-image.jpg', {
        uploadType: 'media',
        destination: '/places/' + uuid + '.jpg',
        metadata: {
          contentType: 'image/jpeg',
          firebaseDownloadStorageTokens: uuid
        }
      }, (err, file) => {
        if (!err) {
          res.status(201).json({
              imageUrl: "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + '/o/' + encodeURIComponent(file.name) + '?alt=media&token=' + uuid
            })
        } else {
          console.log('err', err)
          res.status(500).json({error: err})
        }
      })
    })
  });
