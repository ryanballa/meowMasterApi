import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import bodyParser from 'body-parser'

import firebase from './db.js';

const app = new App({
    onError: (err, req, res) => {
        res.status(500).send({
          message: err.message,
        })
      },
})

app
    .use(logger())
    .use(bodyParser.json())
    .post('/cleanings', async (req, res) => {
        const cleaning = req.body;
        await firebase.firestore().collection('cleanings').add({completionDate: firebase.firestore.FieldValue.serverTimestamp(), ...cleaning });
        res.status(201).send();
        })
    .get('/cleanings', async (req, res) => {
        const snapshot = await firebase.firestore().collection('cleanings').get();
        let cleanings = [];
        snapshot.forEach(doc => {
        let id = doc.id;
        let data = doc.data();
        cleanings.push({id, ...data});
        });
        res.status(200).send(JSON.stringify(cleanings));
    })
    .delete("/cleanings/:id", async (req, res) => {
        console.log(req.params.id);
        await
        firebase.firestore().collection('cleanings').doc(req.params.id).delete();
        
        res.status(200).send();
    })
    .listen(3000)