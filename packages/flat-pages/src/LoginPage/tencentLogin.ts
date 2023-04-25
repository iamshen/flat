import { v4 as uuidv4 } from "uuid";
import { LoginExecutor } from "./utils";
import { errorTips } from "flat-components";
import { FLAT_SERVER_LOGIN, setAuthUUID } from "@netless/flat-server-api";
import { TENCENT_OAUTH } from "../constants/process";

export const tencentLogin: LoginExecutor = () => {
    const authUUID = uuidv4();

    void (async () => {
        try {
            await setAuthUUID(authUUID);
        } catch (err) {
            errorTips(err);
            return;
        }

        window.location.href = getOAuthURL(authUUID, FLAT_SERVER_LOGIN.TENCENT_CALLBACK);
    })();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
};

export function getOAuthURL(authUUID: string, redirect_uri: string): string {
    const redirectURL = encodeURIComponent(redirect_uri);
    return `https://sso.qq.com/open/oauth2/authorize?response_type=code&appid=${TENCENT_OAUTH.CLIENT_ID}&redirect_uri=${redirectURL}&state=${authUUID}`;
}
