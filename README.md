# Data Tracer

[![N|Solid](https://video.oznoz.com/media/brands/property_logo/1421940829_S1_AlienMonkeys_logo.png)]()



#### Installation

`$ npm i data-tracer`


##### Instantiate

`Audit.addTracer('mongoose', { connectionString: 'mongodb://localhost:27017/ashwin' })`


##### Import 

`let Audit = require('data-tracer')`


##### Sample usage



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


----------
    
### Examples
 * [Javascript Example](https://github.com/SAshwinAchu10/data-tracer/tree/master/examples/javascript) 

 * [Typescript Example](https://github.com/SAshwinAchu10/data-tracer/tree/master/examples/typescript)

 * [ReactJS Example](https://github.com/SAshwinAchu10/data-tracer/tree/master/examples/react)