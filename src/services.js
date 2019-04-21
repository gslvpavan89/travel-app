import model from "./model";
import Axios from "axios";
import clientOauth2 from "client-oauth2";
let services = {
  async fetchAccessToken() {
    if (services.checkIsTokenValid(model.authToken)) {
      return model.authToken;
    } else {
      let token = services.generateAuthToken();
      return token;
    }
    return model.authToken;
  },
  checkIsTokenValid: function(authToken) {
    if (authToken && authToken.expires > new Date()) {
      return true;
    }
    return false;
  },
  async generateAuthToken() {
    var travelAuth = new clientOauth2({
      clientId: "travel-api-client",
      clientSecret: "psw",
      accessTokenUri: "/oauth/token",
      authorizationUri: "/oauth/token",
      redirectUri: "http://localhost:8080/oauth/token",
      scopes: [""]
    });
    return await travelAuth.credentials.getToken();
  },

  fetchAirports: function(temp) {
    let token = this.fetchAccessToken();
    token.then(token => {
      let config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
      };
      Axios.get(model.apis.airportsUri, config)
        .then(res => {
          if (res && res.status == 200) {
            if (res && res.status == 200) {
              var data = res.data;
              var totalAirports = data.page.totalElements;
              var airports = data._embedded.locations;
              var list = [];
              airports.map(function(row) {
                list.push({
                  label: row.name,
                  value: row.code,
                  des: row.description
                });
              });
              model.airports = list;
              temp.setState({ sourceAirports: list, destAirports: list });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  fetchPagedAirports: function(temp, page, pageSize, sorted, filtered) {
    let mo = model;
    let token = this.fetchAccessToken();
    token.then(token => {
      let config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
      };
      let url = model.apis.airportsUri;
      page = page + 1;
      url += "?page=" + page;
      if (pageSize) url += "&size=" + pageSize;
      Axios.get(url, config)
        .then(res => {
          if (res && res.status == 200) {
            if (res && res.status == 200) {
              var data = res.data;
              var totalAirports = data.page.totalElements;
              var airports = data._embedded.locations;
              model.airports = airports;

              temp.setState({
                airports: airports,
                pages: Math.round(totalAirports / pageSize)
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  fetchFares: function(source, destination, caller) {
    let token = this.fetchAccessToken();
    token.then(token => {
      let config = {
        headers: { Authorization: `Bearer ${token.accessToken}` }
      };
      Axios.get("/fares/" + source.value + "/" + destination.value, config)
        .then(res => {
          if (res && res.status == 200) {
            let fare = res.data;
            caller.setState({ fare: fare.amount + fare.currency });
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  fetchMetrics: function(temp) {
    Axios.get("/trace")
      .then(res => {
        if (res && res.status == 200) {
          var results = res.data;
          if (results) {
            var total = 0,
              ok = 0,
              cErr = 0,
              sErr = 0;
            total = results.length;

            if (total > 0) {
              results.map(function(row) {
                var status = row.info.headers.response.status;

                if (status == 200) {
                  ok++;
                } else if (status >= 400 && status < 500) {
                  cErr++;
                } else if (status >= 500 && status < 600) {
                  sErr++;
                }
              });
              temp.setState({ total, ok, cErr, sErr });
            }
          }
          console.log(res);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default services;
