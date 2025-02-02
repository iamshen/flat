import type { CheckboxChangeEvent } from "antd/lib/checkbox";

import "./index.less";

import React, { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Checkbox, Input, message, Radio } from "antd";
import { FlatPrefersColorScheme, AppearancePicker } from "flat-components";
import { UserSettingLayoutContainer } from "../UserSettingLayoutContainer";
import { FlatI18n, useLanguage, useTranslate } from "@netless/flat-i18n";

import { PreferencesStoreContext, GlobalStoreContext } from "../../components/StoreProvider";
import { uploadAvatar, UploadAvatar } from "./UploadAvatar";

enum SelectLanguage {
    Chinese,
    English,
}

export const GeneralSettingPage = observer(function GeneralSettingPage() {
    const globalStore = useContext(GlobalStoreContext);
    const preferencesStore = useContext(PreferencesStoreContext);

    const t = useTranslate();
    const language = useLanguage();

    const [name, setName] = useState(globalStore.userName || "");

    async function onUpload(file: File): Promise<void> {
        try {
            await uploadAvatar(file, t);
        } catch (error) {
            message.info(t("upload-avatar-failed"));
            throw error;
        }
    }

    function changeLanguage(event: CheckboxChangeEvent): void {
        const language: SelectLanguage = event.target.value;
        void FlatI18n.changeLanguage(language === SelectLanguage.Chinese ? "zh-CN" : "en");
    }

    const changeAppearance = (event: CheckboxChangeEvent): void => {
        const prefersColorScheme: FlatPrefersColorScheme = event.target.value;
        preferencesStore.updatePrefersColorScheme(prefersColorScheme);
    };

    return (
        <UserSettingLayoutContainer>
            <div className="general-setting-container">
                <div className="general-setting-user-profile">
                    <span className="general-setting-title">{t("user-profile")}</span>
                    <div className="general-setting-user-avatar-wrapper">
                        <span className="general-setting-subtitle">{t("avatar")}</span>
                        <UploadAvatar onUpload={onUpload} />
                    </div>
                    <div>
                        <span className="general-setting-subtitle">{t("username")}</span>
                        <Input
                            disabled={true}
                            id="username"
                            spellCheck={false}
                            value={name}
                            onChange={ev => setName(ev.currentTarget.value)}
                        />
                        {/* <ConfirmButtons onConfirm={changeUserName} /> */}
                    </div>
                    <div className="general-setting-binding-methods">
                        {/* <BindWeChat
                            globalStore={globalStore}
                            isBind={bindings.wechat}
                            onRefresh={refreshBindings}
                        />
                        <BindGitHub
                            globalStore={globalStore}
                            isBind={bindings.github}
                            onRefresh={refreshBindings}
                        /> */}
                    </div>
                </div>
                <div className="general-setting-select-language">
                    <span>{t("language-settings")}</span>
                    <Radio.Group
                        defaultValue={
                            language === "zh-CN" ? SelectLanguage.Chinese : SelectLanguage.English
                        }
                        onChange={changeLanguage}
                    >
                        <Radio value={SelectLanguage.Chinese}>
                            <span className="radio-item-inner">{t("chinese")}</span>
                        </Radio>
                        <Radio disabled={true} value={SelectLanguage.English}>
                            <span className="radio-item-inner">English</span>
                        </Radio>
                    </Radio.Group>
                </div>
                <div className="general-setting-appearance-picker-container">
                    <span>{t("app-appearance-setting")}</span>
                    <AppearancePicker
                        changeAppearance={changeAppearance}
                        value={preferencesStore.prefersColorScheme}
                    />
                </div>
                <div className="general-setting-join-options-box">
                    <div className="general-setting-join-options">{t("join-options")}</div>
                    <Checkbox
                        checked={preferencesStore.autoMicOn}
                        onClick={() =>
                            preferencesStore.updateAutoMicOn(!preferencesStore.autoMicOn)
                        }
                    >
                        {t("turn-on-the-microphone")}
                    </Checkbox>
                    <Checkbox
                        checked={preferencesStore.autoCameraOn}
                        onClick={() =>
                            preferencesStore.updateAutoCameraOn(!preferencesStore.autoCameraOn)
                        }
                    >
                        {t("turn-on-the-camera")}
                    </Checkbox>
                </div>
                <div className="general-setting-device-test-box">
                    <div className="general-setting-checkbox-title">{t("device-test-option")}</div>
                    <Checkbox
                        checked={!globalStore.isTurnOffDeviceTest}
                        onClick={globalStore.toggleDeviceTest}
                    >
                        <span className="checkbox-item-inner">{t("turn-on-device-test")}</span>
                    </Checkbox>
                </div>
                <div className="general-setting-recording-box">
                    <div className="general-setting-checkbox-title">
                        {t("recording-settings.title")}
                    </div>
                    <Checkbox
                        checked={preferencesStore.autoRecording}
                        onClick={preferencesStore.toggleAutoRecording}
                    >
                        <span className="checkbox-item-inner">
                            {t("recording-settings.auto-recording")}
                        </span>
                    </Checkbox>
                </div>
                <div className="general-setting-recording-box">
                    <div className="general-setting-checkbox-title">
                        {t("whiteboard-settings.title")}
                    </div>
                    <Checkbox
                        checked={preferencesStore.strokeTail}
                        onClick={preferencesStore.toggleStrokeTail}
                    >
                        <span className="checkbox-item-inner">
                            {t("whiteboard-settings.pencil-tail")}
                        </span>
                    </Checkbox>
                </div>
                {/* <div className="general-setting-user-account">
                    <span className="general-setting-title">{t("delete-account")}</span>
                    <div>
                        <Button danger onClick={removeAccount}>
                            {t("delete-account")}
                        </Button>
                    </div>
                </div> */}
            </div>
        </UserSettingLayoutContainer>
    );
});

export default GeneralSettingPage;
