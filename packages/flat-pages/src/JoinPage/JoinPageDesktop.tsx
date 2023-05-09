/* eslint react/jsx-no-target-blank: off */
import logoSVG from "./icons/logov2.svg";
import downloadSVG from "./icons/download.svg";
import joinSVG from "./icons/join.svg";

import React, { useMemo } from "react";
import { Avatar, Button } from "antd";
import { useTranslate } from "@netless/flat-i18n";

import { RouteNameType, usePushHistory } from "../utils/routes";
import { FLAT_DOWNLOAD_URL } from "../constants/process";

export interface JoinPageDesktopProps {
    isLogin: boolean;
    avatar: string;
    roomUUID: string;
    privacyURL: string;
    serviceURL: string;
    joinRoom: () => void;
}

export default function JoinPageDesktop({
    isLogin,
    avatar,
    roomUUID,
    joinRoom,
}: JoinPageDesktopProps): React.ReactElement {
    const t = useTranslate();
    const pushHistory = usePushHistory();

    const url = useMemo(() => `x-agora-flat-client://joinRoom?roomUUID=${roomUUID}`, [roomUUID]);
    joinRoom();
    return (
        <div className="join-page-container">
            {/* <iframe height="0" src={url} style={{ display: "none" }} title="[hidden]" width="0" /> */}
            <div className="join-page-header-container">
                <img alt="app logo" src={logoSVG} />
                {isLogin ? (
                    <Avatar
                        className="join-page-header-avatar"
                        icon={<img src={avatar} />}
                        size={32}
                    />
                ) : (
                    <div
                        className="join-page-header-btn"
                        onClick={() => {
                            if (roomUUID) {
                                sessionStorage.setItem("roomUUID", roomUUID);
                                pushHistory(RouteNameType.LoginPage, { utm_source: "tencent" });
                            }
                        }}
                    >
                        {t("login")}
                    </div>
                )}
            </div>
            <div className="join-page-content-container">
                <div className="join-page-content-title">{t("select-the-way-to-join-room")}</div>
                <div className="join-page-content-btn-container">
                    <Button
                        className="join-page-content-btn"
                        onClick={() => window.open(FLAT_DOWNLOAD_URL, "_blank")}
                    >
                        <img alt="download icon" src={downloadSVG} />
                        <div className="join-page-content-text-container">
                            <div className="join-page-content-text">
                                {t("download-desktop-application")}
                            </div>
                            <span className="join-page-content-sub-text">
                                {t("download-desktop-application-tips")}
                            </span>
                        </div>
                    </Button>
                    <Button className="join-page-content-btn" onClick={joinRoom}>
                        <img alt="join icon" src={joinSVG} />
                        <div className="join-page-content-text-container">
                            <div className="join-page-content-text">
                                {t("web-version-join-room")}
                            </div>
                            <span className="join-page-content-sub-text">
                                {t("web-version-join-room-tips")}
                            </span>
                        </div>
                    </Button>
                </div>
                <div className="join-page-content-divider">
                    <span>{t("or")}</span>
                </div>
                <div className="join-page-content-container-open-flat">
                    <span>{t("already-installed-tips")}</span>
                    <a href={url}>{t("open-now")}</a>
                </div>
            </div>
        </div>
    );
}
