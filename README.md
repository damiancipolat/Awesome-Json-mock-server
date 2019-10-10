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
