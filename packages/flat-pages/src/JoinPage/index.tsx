import "./style.less";

import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useLanguage } from "@netless/flat-i18n";
import { useWindowSize } from "react-use";

import { RouteNameType, RouteParams, usePushHistory } from "../utils/routes";
import { GlobalStoreContext, PageStoreContext } from "../components/StoreProvider";
import { loginCheck } from "@netless/flat-server-api";
import { joinRoomHandler } from "../utils/join-room-handler";
import { PRIVACY_URL, PRIVACY_URL_CN, SERVICE_URL, SERVICE_URL_CN } from "../constants/process";
import JoinPageDesktop from "./JoinPageDesktop";
import JoinPageMobile from "./JoinPageMobile";
// import { NEED_BINDING_PHONE } from "../constants/config";

export const JoinPage = observer(function JoinPage() {
    const language = useLanguage();
    const pushHistory = usePushHistory();
    const globalStore = useContext(GlobalStoreContext);
    const pageStore = useContext(PageStoreContext);
    const [isLogin, setIsLogin] = useState(false);
    const { width } = useWindowSize(1080);

    const params = useParams<RouteParams<RouteNameType.ReplayPage>>();
    const { roomUUID } = params;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => pageStore.configure(), []);

    useEffect(() => {
        async function checkLogin(): Promise<void> {
            const token = globalStore.userInfo?.token;
            if (token) {
                try {
                    await loginCheck();
                    setIsLogin(true);
                } catch (e) {
                    console.error(e);
                }
            }
            // 已登录的用户直接进入
            void JoinDirectRoom(token);
        }
        console.log("JoinPage useEffect checkLogin>>>");
        void checkLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function JoinDirectRoom(token: string | undefined): Promise<void> {
        if (token) {
            if (roomUUID) {
                pushHistory(RouteNameType.DevicesTestPage, { roomUUID });
            }
        } else {
            sessionStorage.setItem("roomUUID", roomUUID);
            pushHistory(RouteNameType.LoginPage, { utm_source: "tencent" });
        }
    }

    async function joinRoom(): Promise<void> {
        if (isLogin && roomUUID) {
            if (window.isElectron) {
                await joinRoomHandler(roomUUID, pushHistory);
            } else {
                pushHistory(RouteNameType.DevicesTestPage, { roomUUID });
            }
        } else {
            sessionStorage.setItem("roomUUID", roomUUID);
            pushHistory(RouteNameType.LoginPage, { utm_source: "tencent" });
        }
    }

    const isMobile = width <= 480;

    const privacyURL = language.startsWith("zh") ? PRIVACY_URL_CN : PRIVACY_URL;
    const serviceURL = language.startsWith("zh") ? SERVICE_URL_CN : SERVICE_URL;
    return (
        <div>
            {isMobile ? (
                <JoinPageMobile
                    privacyURL={privacyURL}
                    roomUUID={roomUUID}
                    serviceURL={serviceURL}
                />
            ) : (
                <JoinPageDesktop
                    avatar={globalStore.userInfo?.avatar ?? ""}
                    isLogin={isLogin}
                    joinRoom={joinRoom}
                    privacyURL={privacyURL}
                    roomUUID={roomUUID}
                    serviceURL={serviceURL}
                />
            )}
        </div>
    );
});

export default JoinPage;
