import React, { useEffect } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

const SignInSimpleStart: React.FunctionComponent = () => {
    useEffect(() => {
        console.log("sing start =====================");
        microsoftTeams.initialize();
        // microsoftTeams.getContext(function (context) {
        //     // Generate random state string and store it, so we can verify it in the callback
        //     let state = `${Math.floor(1000 + Math.random() * 9000)}`; // _guid() is a helper function in the sample
        //     localStorage.setItem("simple.state", state);
        //     localStorage.removeItem("simple.error");
        //     // Go to the Azure AD authorization endpoint
        //     let queryParams = {
        //         client_id: "6164b37a-758d-4fff-ba84-b888e189396b",
        //         response_type: "id_token token",
        //         response_mode: "fragment",
        //         scope: "https://graph.microsoft.com/User.Read openid",
        //         redirect_uri: window.location.origin + "/signin-simple-end",
        //         nonce: `${Math.floor(1000 + Math.random() * 9000)}`,
        //         state: state,
        //         // The context object is populated by Teams; the loginHint attribute
        //         // is used as hinting information
        //         login_hint: context.loginHint,
        //     };

        //     let authorizeEndpoint = "https://login.microsoftonline.com/" + context.tid + "/oauth2/v2.0/authorize" + toQueryString(queryParams);
        //     console.log("authorizeEndpoint ============>")
        //     console.log(authorizeEndpoint);
        //     window.location.assign(authorizeEndpoint);
        // });
        let redirect_uri = window.location.origin + "/signin-simple-end";
        window.location.assign(`https://login.microsoftonline.com/09491004-e118-419c-b123-c712980d9db0/oauth2/v2.0/authorize?client_id=6164b37a-758d-4fff-ba84-b888e189396b&response_type=id_token token&redirect_uri=${redirect_uri}&scope=openid&response_mode=fragment&state=12345&nonce=678910`);

    });



    return (
        <></>
    );
};

function toQueryString(json) {
    return '?' +
        Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

export default SignInSimpleStart;