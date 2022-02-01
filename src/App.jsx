import logo from './logo.svg';
import './App.css';
import { PageLayout } from "./components/PageLayout"
import {AuthenticatedTemplate,UnauthenticatedTemplate,useMsal,} from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { loginRequest } from "./authConfig";


function ProfileContent() {
    const { instance, accounts, inProgress } = useMsal();
    const [accessToken, setAccessToken] = useState(null);

  const name = accounts[0] && accounts[0].name;
  

 

    function RequestAccessToken() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
          setAccessToken(response.accessToken);
          console.log("Your token is ", response.accessToken)
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response.accessToken);
               console.log("Your token is ", response.accessToken);
            });
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {accessToken ? 
                <p>Access Token Acquired!</p>
                :
                <Button variant="secondary" onClick={RequestAccessToken}>Request Access Token</Button>
            }
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
