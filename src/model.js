let model = {
  authToken: {},
  authCredentials: {
    client_id: "travel-api-client",
    secret: "psw",
    grant_type: "client_credentials"
  },
  airports: [],
  apis: {
    airportsUri: process.env.airports || "/airports",
    fareUri: process.env.fares || "/fares",
    httpTraceUri: process.env.httpTrace || "/trace",
    authTokenUri: process.env.authUri || "/oauth/token"
  }
};

export default model;
