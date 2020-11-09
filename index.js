import { App } from '@tinyhttp/app'
import { logger } from '@tinyhttp/logger'
import bodyParser from 'body-parser'
import supabase from './db.js';
import moment from 'moment';

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
        if (req.headers.authkey !== process.env.AUTH_KEY) {
            res.status(403).send();
        } else {
            const cleaning = req.body;
            const date = moment().format('YYYY-MM-DDTHH:mm:ss')
            const { data: lastCleaning }= await supabase
                .from('cleanings')
                .select('*')
                .order('completionDate', { ascending: false })
                .limit(1);
            if (!moment(lastCleaning[0].completionDate).isBefore(moment().add(2, 'hours'))) {
                await supabase
                    .from('cleanings')
                    .insert([
                        { completionDate: date, ...cleaning }
                    ])
                res.status(201).send();
            } else {
                res.status(401).send();
            }
        }
    })
    .get('/cleanings', async (req, res) => {
        if (req.headers.authkey !== process.env.AUTH_KEY) {
            res.status(403).send();
        } else {
            let { data: cleanings, error } = await supabase
            .from('cleanings')
                .select('*')
            res.status(200).send(JSON.stringify(cleanings));
        }
    })
    .delete("/cleanings/:id", async (req, res) => {
        if (req.headers.authkey !== process.env.AUTH_KEY) {
            res.status(403).send();
        } else {
            let deleted = await supabase
                .from('cleanings')
                .delete()
                .eq('id', req.params.id)
        
            res.status(200).send();
        }
    })
    .listen(process.env.PORT || 5000)