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

```javascript
Audit.addTracer('mongoose', { connectionString: 'mongodb://localhost:27017/db' });
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
        severity,
        what,
        subject,
        status,
        who,
        where,
        why,
        type,
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
