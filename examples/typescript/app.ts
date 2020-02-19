import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { Audit, DataTracer} from 'data-tracer';


const port = process.env.PORT || 3000;
const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

Audit.addTracer('mongoose', { connectionString: 'mongodb://localhost:27017/db' })


DataTracer.configureAlert({
    'apiKey': 'abcdefghijklmnopqrstuvwxyz',
    'provider': 'sendgrid',
    'subject': `Error from ${'APP_NAME'}`,
    'from': 'achu10@live.in',
    'mailTo': 'achu10@live.in',
    'type': ['SEVERE'] 
});

app.use(
    '/',
    (req: Request, res: Response): Response => {
        return res.status(200).json('Hello World');
    }
);

app.get('/ping', function (req, res) {

    Audit.logEvent(
        'INFO',
        'Ping',
        'api was triggered',
        'Successful',
        undefined,
        'app.js',
        'to Check Server status',
        'Event',
        {}
    )
    res.json({ message: 'pong' })
})

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});
