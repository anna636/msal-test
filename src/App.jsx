import logo from './logo.svg';
import './App.css';
import { PageLayout } from "./components/PageLayout"
import {AuthenticatedTemplate,UnauthenticatedTemplate,useMsal,} from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { loginRequest } from "./authConfig";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import "@ingka/svg-icon/dist/style.css";
import "@ingka/button/dist/style.css";
import "@ingka/carousel/dist/style.css";
import "@ingka/tabs/dist/style.css";
import "@ingka/focus/dist/style.css";
import Application from './components/TabsList'



function ProfileContent() {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

  const name = accounts[0] && accounts[0].name;
  console.log(accounts[0].homeAccountId);

    function RequestProfileData() {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance.acquireTokenSilent(request).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        }).catch((e) => {
            instance.acquireTokenPopup(request).then((response) => {
                callMsGraph(response.accessToken).then(response => setGraphData(response));
            });
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
        }
        <p>tabs</p>
        <Application/>
        
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
