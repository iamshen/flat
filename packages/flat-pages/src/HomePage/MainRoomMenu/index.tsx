import "./MainRoomMenu.less";

import React, { FC, useContext } from "react";
import { Col, Row } from "antd";
import { GlobalStoreContext } from "../../components/StoreProvider";
import { RouteNameType, usePushHistory } from "../../utils/routes";
import { JoinRoomBox } from "./JoinRoomBox";
import { joinRoomHandler } from "../../utils/join-room-handler";

export const MainRoomMenu: FC = () => {
    const globalStore = useContext(GlobalStoreContext);
    const pushHistory = usePushHistory();

    const onJoinRoom = async (roomUUID: string): Promise<void> => {
        if (globalStore.isTurnOffDeviceTest || window.isElectron) {
            await joinRoomHandler(roomUUID, pushHistory);
        } else {
            pushHistory(RouteNameType.DevicesTestPage, { roomUUID });
        }
    };

    return (
        <div className="main-room-menu-container">
            <Row gutter={16}>
                <Col span={6}>
                    <JoinRoomBox onJoinRoom={onJoinRoom} />
                </Col>
            </Row>
        </div>
    );
};

export default MainRoomMenu;
