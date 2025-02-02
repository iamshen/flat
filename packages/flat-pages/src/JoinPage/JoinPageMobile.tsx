import logoSVG from "./icons/logo-sm.svg";
import openInBrowserSVG from "./icons/open-in-browser.svg";

import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslate } from "@netless/flat-i18n";
import { FLAT_DOWNLOAD_URL } from "../constants/process";
import { isWeChatBrowser } from "../utils/user-agent";

export interface JoinPageMobileProps {
    roomUUID: string;
    privacyURL: string;
    serviceURL: string;
}

export default function JoinPageMobile({ roomUUID }: JoinPageMobileProps): React.ReactElement {
    const t = useTranslate();

    const url = useMemo(() => `x-agora-flat-client://joinRoom?roomUUID=${roomUUID}`, [roomUUID]);

    const openApp = useCallback(() => {
        window.location.href = url;
    }, [url]);

    const download = (): void => {
        window.location.href = FLAT_DOWNLOAD_URL;
    };

    useEffect(() => {
        openApp();
    }, [openApp]);

    return (
        <div className="join-page-mobile-container">
            <iframe
                height="0"
                src={url}
                style={{ display: "none" }}
                title={`join ${t("app-name")}`}
                width="0"
            />
            <div className="join-page-mobile-effect"></div>
            <div className="join-page-mobile-header">
                <div className="join-page-mobile-app-icon">
                    <img alt="flat-logo" src={logoSVG} />
                </div>
            </div>
            <div className="join-page-mobile-big-btns">
                <button className="join-page-mobile-big-btn" onClick={openApp}>
                    {t("open")} {t("app-name")}
                </button>
                <button className="join-page-mobile-big-btn secondary" onClick={download}>
                    {t("download")} {t("app-name")}
                </button>
            </div>
            {/* <div className="join-page-mobile-footer">
                <a href={privacyURL} rel="noreferrer" target="_blank">
                    {t("privacy-agreement")}
                </a>
                <span>｜</span>
                <a href={serviceURL} rel="noreferrer" target="_blank">
                    {t("service-policy")}
                </a>
            </div> */}
            {isWeChatBrowser && (
                <div className="join-page-mobile-wechat-overlay">
                    <img alt="[open-in-browser]" src={openInBrowserSVG} />
                    <strong>{t("open-in-browser")}</strong>
                </div>
            )}
        </div>
    );
}
