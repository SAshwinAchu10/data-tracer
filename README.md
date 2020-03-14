# Data Tracer

[![N|Solid](https://video.oznoz.com/media/brands/property_logo/1421940829_S1_AlienMonkeys_logo.png)]()


#### Installation

```javascript
$ npm i data-tracer
```


##### Import 
```javascript
import { Audit, DataTracer } from 'data-tracer';
```


##### Instantiate Tracer

#### Mongoose
```javascript
Audit.addTracer('mongoose', { connectionString: 'mongodb://localhost:27017/db', appName: 'Apple-Rest' });
```


#### Mongo Aggregation Query
```javascript
import { Audit } from 'data-tracer';


app.get('/audits', async (req: any, res: any) => {
      let query: any = req.query;
      if (query['page'] == undefined) query['page'] = 1;
      if (query['limit'] == undefined) query['limit'] = 10;
      let q: any =
        query['q'] == undefined
          ? [{}]
          : [
            { when: { $regex: `${query['q']}`, $options: 'i' } },
            { what: { $regex: `${query['q']}`, $options: 'i' } },
            { type: { $regex: `${query['q']}`, $options: 'i' } },
            { where: { $regex: `${query['q']}`, $options: 'i' } },
            { why: { $regex: `${query['q']}`, $options: 'i' } },
          ];
      return Audit.aggregate([
        {
          $facet: {
            audits: [
              {
                $match: {
                  type: { $in: JSON.parse(query['type']) },
                  createdAt: {
                    $gte: new Date(query['startDate']),
                    $lte: new Date(query['endDate']),
                  },
                  $or: JSON.parse(JSON.stringify(q)),
                },
              },
              { $limit: parseInt(query['limit']) },
              { $skip: (query['page'] - 1) * query['limit'] },
            ],
            apps: [
              {
                $group: {
                  _id: null,
                  apps: { $addToSet: "$appName" }
                }
              }, { "$unset": ["_id"] }
            ]
          },
        },
      ]).then((result: any) => res.json({ data: result }));
    });
```


#### MySQL

```javascript
Audit.addTracer('mysql', { host: 'localhost', user: 'root', 'password': 'root', database: 'myDB' });
```

##### Instantiate Mail Alerts  (Optional)

```javascript
DataTracer.configureAlert({
    'apiKey': 'abcdefghijklmnopqrstuvwxyz',
    'provider': 'sendgrid',
    'subject': `Error from ${APP_NAME}`,
    'from': 'achu10@live.in',
    'mailTo': 'achu10@live.in',
    'type': ['SEVERE']  // Severity types to trigger email
});
```

##### Sample usage

###### Definition

```javascript
    Audit.logEvent(
        type,
        what,
        subject,
        status,
        who,
        where,
        why,
        is,
        meta
    );
```

###### Example

```javascript
    Audit.logEvent(
        'INFO',
        'Ping',
        'api was triggered',
        'Successful',
        undefined,
        'app.js',
        'to Check Server status',
        'Event',
        {
            'key1': value,
            'key2': [
                {
                  'key21': 'value21'
                }
            ]
        }
    )
```
----------
    
### Examples
 * [Typescript Example](https://github.com/SAshwinAchu10/data-tracer/tree/master/examples/typescript)
 * [ReactJS Example](https://github.com/SAshwinAchu10/data-tracer/tree/master/examples/react) - WIP
 * [Javascript Example](https://github.com/SAshwinAchu10/data-tracer/tree/master/examples/javascript)


 ### Screenshot


[![N|Solid](https://github.com/SAshwinAchu10/data-tracer/blob/master/docs/1.png)](https://github.com/SAshwinAchu10/data-tracer/blob/master/docs/1.png)



### Roadmap [WIP]

 * Local file logging
 * Dashboard UI
 * QL for filtering Audit Events, Logs
 * Plugins like console, authorization etc.
 * ELK Integration
 * Monitoring
 * Tracing
 * etc...
