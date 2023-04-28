import "./style.less";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { LoginButtonProviderType } from "flat-components";
import { LoginDisposer } from "./utils";
import { githubLogin } from "./githubLogin";
import { agoraLogin } from "./agoraLogin";
import { googleLogin } from "./googleLogin";
import { RouteNameType, RouteParams, usePushHistory, useURLParams } from "../utils/routes";
import { GlobalStoreContext, WindowsSystemBtnContext } from "../components/StoreProvider";
import { joinRoomHandler } from "../utils/join-room-handler";
import { useSafePromise } from "../utils/hooks/lifecycle";
import { NEED_BINDING_PHONE } from "../constants/config";
import { loginCheck, LoginProcessResult } from "@netless/flat-server-api";
import { saveJWTToken } from "../utils/use-login-check";
import { tencentLogin } from "./tencentLogin";
import { useParams } from "react-router-dom";
import React from "react";

export const LoginPage = observer(function LoginPage() {
    const pushHistory = usePushHistory();
    const globalStore = useContext(GlobalStoreContext);
    const windowsBtn = useContext(WindowsSystemBtnContext);
    const loginDisposer = useRef<LoginDisposer>();

    const [redirectURL] = useState(() =>
        new URLSearchParams(window.location.search).get("redirect"),
    );
    const [roomUUID] = useState(() => sessionStorage.getItem("roomUUID"));

    const sp = useSafePromise();
    const urlParams1 = useURLParams();
    const urlParams2 = useParams<RouteParams<RouteNameType.LoginPage>>();
    const [, setLoginResult_] = useState<LoginProcessResult | null>(null);
    const urlParams = Object.assign(urlParams1, urlParams2);

    useEffect(() => {
        return () => {
            if (loginDisposer.current) {
                loginDisposer.current();
                loginDisposer.current = void 0;
            }
            sessionStorage.clear();
        };
    }, []);

    const setLoginResult = useCallback(
        (userInfo: LoginProcessResult | null) => {
            globalStore.updateUserInfo(userInfo);
            setLoginResult_(userInfo);
            if (userInfo) {
                pushHistory(RouteNameType.HomePage);
            }
        },
        [globalStore, pushHistory],
    );

    const onLoginResult = useCallback(
        async (authData: LoginProcessResult) => {
            globalStore.updateUserInfo(authData);
            saveJWTToken(authData.token);
            if (NEED_BINDING_PHONE && !authData.hasPhone) {
                setLoginResult(authData);
                return;
            }
            if (redirectURL) {
                window.location.href = redirectURL;
                return;
            }
            if (!roomUUID) {
                pushHistory(RouteNameType.HomePage);
                return;
            }
            if (globalStore.isTurnOffDeviceTest || window.isElectron) {
                await joinRoomHandler(roomUUID, pushHistory);
            } else {
                pushHistory(RouteNameType.DevicesTestPage, { roomUUID });
            }
        },
        [globalStore, pushHistory, redirectURL, roomUUID, setLoginResult],
    );

    const handleLogin = useCallback(
        (loginChannel: LoginButtonProviderType) => {
            if (loginDisposer.current) {
                loginDisposer.current();
                loginDisposer.current = void 0;
            }
            console.log("loginChannel>>>", loginChannel);
            switch (loginChannel) {
                case "tencent": {
                    tencentLogin(onLoginResult);
                    return;
                }
                case "agora": {
                    agoraLogin(onLoginResult);
                    return;
                }
                case "github": {
                    loginDisposer.current = githubLogin(onLoginResult, windowsBtn);
                    return;
                }
                case "google": {
                    loginDisposer.current = googleLogin(onLoginResult, windowsBtn);
                    return;
                }
                default: {
                    return;
                }
            }
        },
        [onLoginResult, windowsBtn],
    );

    useEffect(() => {
        console.log("urlParams>>>", urlParams.utm_source);
        if (urlParams.utm_source === "agora") {
            handleLogin("agora");
        }
        if (urlParams.utm_source === "tencent") {
            handleLogin("tencent");
        }
    }, [handleLogin, urlParams.utm_source]);

    useEffect(() => {
        // Get login info through loginCheck().
        // But we don't want to goto home page if already logged in.
        // Instead, if we have `hasPhone: false`, we should show the binding phone page.
        const checkNormalLogin = async (): Promise<void> => {
            const userInfo = await sp(loginCheck(urlParams.token));
            if (NEED_BINDING_PHONE && !userInfo.hasPhone) {
                setLoginResult(userInfo);
            }
        };

        checkNormalLogin().catch(error => {
            // no handling required
            console.warn(error);
        });
    }, [globalStore, setLoginResult, sp, urlParams, urlParams.token]);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return (
        <div>
            <p>你需要登录</p>
        </div>
    );
});

export default LoginPage;
