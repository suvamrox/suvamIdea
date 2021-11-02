import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Text, Button } from "@fluentui/react-northstar";
import * as microsoftTeams from "@microsoft/teams-js";
import { useTranslation } from 'react-i18next';
import "../../styles/signin.css";

const SignInPage: React.FunctionComponent<RouteComponentProps> = props => {
    const localize = useTranslation().t;
    const errorMessage = "Please sign in to continue.";

    function onSignIn() {
        console.log("sing in page");
        microsoftTeams.initialize();
        // window.location.assign('https://login.microsoftonline.com/09491004-e118-419c-b123-c712980d9db0/oauth2/v2.0/authorize?client_id=6164b37a-758d-4fff-ba84-b888e189396b&response_type=id_token&redirect_uri=https://suvamrnd.azurewebsites.net/signin-simple-end&scope=openid&response_mode=fragment&state=12345&nonce=678910');
        microsoftTeams.authentication.authenticate({
            url: window.location.origin + "/signin-simple-start",
            successCallback: (result) => {
                console.log("Login succeeded!");
                console.log(result);
                let id = localStorage.getItem("simple.result") || "";
                console.log(JSON.parse(id).idToken);
                window.location.href = "/discover";
            },
            failureCallback: (reason) => {
                console.log("Login failed: " + reason);
                console.log(localStorage.getItem("simple.error"));
                // window.location.href = "/errorpage";
            }
        });
    }

    return (
        <div className="sign-in-content-container">
            <div>
            </div>
            <Text
                content={errorMessage}
                size="medium"
            />
            <div className="space"></div>
            <Button content={localize("signInText")} primary className="sign-in-button" onClick={onSignIn} />
        </div>
    );
};

export default SignInPage;
