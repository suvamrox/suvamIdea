import React, { useEffect } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

const SignInSimpleEnd: React.FunctionComponent = () => {
    // Parse hash parameters into key-value pairs
    function getHashParameters() {
        const hashParams: any = {};
        window.location.hash.substr(1).split("&").forEach(function (item) {
            let s = item.split("="),
                k = s[0],
                v = s[1] && decodeURIComponent(s[1]);
            hashParams[k] = v;
        });
        return hashParams;
    }

    useEffect(() => {
        console.log("sing end =====================");
        microsoftTeams.initialize();
        // Split the key-value pairs passed from Azure AD
        // getHashParameters is a helper function that parses the arguments sent
        // to the callback URL by Azure AD after the authorization call
        let hashParams = getHashParameters();
        if (hashParams["error"]) {
            // Authentication/authorization failed
            console.log('Authentication/authorization failed');
            localStorage.setItem("simple.error", JSON.stringify(hashParams));
            microsoftTeams.authentication.notifyFailure(hashParams["error"]);
        } else if (hashParams["id_token"]) {
            // Get the stored state parameter and compare with incoming state
            console.log('Get the stored state parameter and compare with incoming state');
            let expectedState = localStorage.getItem("simple.state");
            if ("12345" !== hashParams["state"]) {
                // State does not match, report error
                localStorage.setItem("simple.error", JSON.stringify(hashParams));
                microsoftTeams.authentication.notifyFailure("StateDoesNotMatch");
            } else {
                console.log('Success -- return token information to the parent page.');
                // Success -- return token information to the parent page.
                // Use localStorage to avoid passing the token via notifySuccess; instead we send the item key.
                let key = "simple.result";
                localStorage.setItem(key, JSON.stringify({
                    idToken: hashParams["id_token"],
                    accessToken: hashParams["access_token"],
                    // tokenType: hashParams["token_type"],
                    // expiresIn: hashParams["expires_in"]
                }));
                microsoftTeams.authentication.notifySuccess(JSON.stringify({
                    idToken: hashParams["id_token"],
                    accessToken: hashParams["access_token"],
                    // tokenType: hashParams["token_type"],
                    // expiresIn: hashParams["expires_in"]
                }));
            }
        } else {
            // Unexpected condition: hash does not contain error or access_token parameter
            localStorage.setItem("simple.error", JSON.stringify(hashParams));
            microsoftTeams.authentication.notifyFailure("UnexpectedFailure");
        }
        console.log(getHashParameters());
    });

    return (
        <></>
    );
};

export default SignInSimpleEnd;