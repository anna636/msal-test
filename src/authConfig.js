export const msalConfig = {
  auth: {
    clientId: "7a8aa7f3-752b-494f-9480-0c5cd5ecabc9",
    authority:
      "https://login.microsoftonline.com/cd20e4c9-f82c-4d3e-9224-90f2bc4be1a0",
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};

export const graphConfig = {
  graphMeEndpoint: "http://localhost:8080/authentication",
};