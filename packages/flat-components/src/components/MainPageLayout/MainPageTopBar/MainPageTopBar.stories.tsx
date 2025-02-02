/* eslint react/display-name: off */
import { Meta, Story } from "@storybook/react";
import React, { PropsWithChildren } from "react";
import { MainPageTopBar, MainPageTopBarProps } from ".";

import { SVGTcEducation, SVGHomeOutlined, SVGSetting } from "../../FlatIcons";

const storyMeta: Meta = {
    title: "MainPageLayout/MainPageTopBar",
    component: MainPageTopBar,
    parameters: {
        layout: "fullscreen",
    },
};

export default storyMeta;

/**
 * TODO: we forget set i18n in current file!!!
 */

export const Overview: Story<PropsWithChildren<MainPageTopBarProps>> = args => (
    <div className="vh-100 pa3">
        <MainPageTopBar {...args} />
    </div>
);
Overview.args = {
    popMenu: [
        {
            key: "userConfig",
            icon: () => <SVGSetting />,
            title: "个人设置",
            route: "/config",
        },
        {
            key: "tcEducation",
            icon: () => <SVGTcEducation />,
            title: "腾讯教育号",
            route: "/github",
        },
        {
            key: "logout",
            icon: () => <SVGTcEducation className="red" />,
            title: <span className="red">退出登录</span>,
            route: "/logout",
        },
    ],
    children: <SVGTcEducation />,
    topBarMenu: [
        { key: "github", icon: <SVGTcEducation />, route: "/github" },
        { key: "home", icon: <SVGHomeOutlined />, route: "/home" },
    ],
    activeKeys: ["home"],
    avatarSrc: "http://placekitten.com/200/200",
    userName: "Test ultra long user name",
};
Overview.argTypes = {
    activeKeys: {
        control: {
            type: "multi-select",
            options: ["home", "cloudStorage", "deviceCheck"],
        },
    },
};
