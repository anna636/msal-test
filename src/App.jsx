import logo from './logo.svg';
import './App.css';
import { PageLayout } from "./components/PageLayout"
import {AuthenticatedTemplate,UnauthenticatedTemplate,useMsal,} from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { loginRequest } from "./authConfig";


function ProfileContent() {
  const proxy = "http://localhost:8080";
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

  const name = accounts[0] && accounts[0].name;
  
  const postNewBid = async (e) => {
    e.preventDefault()
    try {
       let response = await fetch(proxy);
    console.log(await response.json());

    return response;
    }
    catch (e) {
      console.log(e)
    }
   
  };

  const authenticate = async (e) => {
    console.log("acces token in auth is ", accessToken)
    e.preventDefault()
     let response = await fetch(proxy + "/authentication", {
       method: "GET",
       headers: {
         Authorization: `oauth-bearer ${accessToken}`,
         "Content-type": "application/json; charset=UTF-8",
       },
     });
     console.log(await response.json());

     return response;
  }
 

  
  function RequestAccessToken() {

     
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
          setAccessToken(response.accessToken);
          
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response.accessToken);
          
            });
        });
    }

    return (
      <>
        <h5 className="card-title">Welcome {name}</h5>
        {accessToken ? (
          <>
            <p>Access Token Acquired!</p>
            <button onClick={(e) => postNewBid(e)}>Send request</button>
            <button onClick={(e) => authenticate(e)}>Send authenticated request</button>
          </>
        ) : (
          <Button variant="secondary" onClick={RequestAccessToken}>
            Request Access Token
          </Button>
        )}
      </>
    );
};


function App() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <p>You are signed in!</p>
        <ProfileContent />
       
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}

export default App;
