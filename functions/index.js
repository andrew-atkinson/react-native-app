const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const fs = require('fs')
const firebaseKeys = require('./firebase-keys.json')

const admin = require('firebase-admin')

const gcconfig = {
  projectId: firebaseKeys.projectId,
  keyFilename: 'private-key.json'
}
const gcs = require('@google-cloud/storage')(gcconfig)
const UUID = require('uuid/v4')

admin.initializeApp({
  credential: admin.credential.cert(require('./private-key.json')),
  databaseURL: 'https://react-native-places.firebaseio.com'
})

exports.storeImage = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      res.status(403).json({ error: 'unauthorized' })
      return
    }

    const idToken = req.headers.authorization.split('Bearer ')[1]

    admin.auth().verifyIdToken(idToken)
      .then(() => {
        const body = JSON.parse(req.body)
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', (err) => res.status(500).json({error: err}))
        const bucket = gcs.bucket('react-native-places.appspot.com')
        const uuid = UUID()
        return bucket.upload('/tmp/uploaded-image.jpg', {
          uploadType: 'media',
          destination: `/places/${uuid}.jpg`,
          metadata: {
            contentType: 'image/jpeg',
            firebaseDownloadStorageTokens: uuid
          }
        }, (err, file) => {
          if (!err) {
            res.status(201).json({
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${uuid}`,
              imagePath: `/places/${uuid}.jpg`
            })
          } else {
            res.status(500).json({ error: err })
          }
        })
      })
      .catch((err) => {
        res.status(403).json({ error: 'Unauthorized', err })
      })
  })
})

exports.deleteImage = functions.database.ref('/places/{placeId}').onDelete(e => {
  const imagePath = e.val().imagePath
  const bucket = gcs.bucket('react-native-places.appspot.com')
  return bucket.file(imagePath).delete()
})
