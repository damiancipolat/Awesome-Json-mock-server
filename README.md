# Awesome JSON mock server
This project is to provide a mock server to accompany the development of a website or a mobile application. It allows you to create a functional api-rest server quickly and only by changing configurations.

#### Configuration / Run

Set server port, go to /config/default.json
```json
{"port":3000}
```

To install:
```sh
$ npm install
```

To run:
```sh
$ npm start
```

#### MOCKS

To customize the mock to provide the server with data, change the file /mocks/base.json.

#### Format:
This is the file format, is divided in models and routes.

```json
{
  "models":{...},
  "routes":[...]
}
```
- **MODELS**:
Are the responses to be used in the api rest server, an example is the next:

```json
{
  "models":{
    "dogs":[
      {
        "name":"chispas",
        "country":"england",
        "colour":"brown"
      },
      {
        "name":"billy",
        "country":"usa",
        "colour":"gray"
      }      
    ]
  }
}
```

- **ROUTES**:
This sections are the differents routes of the api rest, there are 3 differents way to handle a response.

- RANDOM: Match url vs model and get some random response.
```json
{
  "routes":[
    {
      "type":"GET",
      "path":"/matrix",
      "response":{
        "model":"dogs:0"
      }
    }
  ]
}
```

- DIRECT: Match route vs model.

```json
{
  "routes":[
    {
      "type":"GET",
      "path":"/matrix",
      "response":{
        "model":"dogs:0"
      }
    }
  ]
}
```

- MATCH: Match route vs model.

```json
{
  "routes":[
    {
      "type":"GET",
      "path":"/matrix",
      "response":{
        "model":"dogs:0"
      }
    }
  ]
}
