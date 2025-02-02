import "./style.less";

import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { MainRoomMenu } from "./MainRoomMenu";
import { MainRoomListPanel } from "./MainRoomListPanel";
import { MainRoomHistoryPanel } from "./MainRoomHistoryPanel";
import { useLoginCheck } from "../utils/use-login-check";
import { PageStoreContext } from "../components/StoreProvider";
import { AppUpgradeModal } from "../components/AppUpgradeModal";

export const HomePage = observer(function HomePage() {
    const pageStore = useContext(PageStoreContext);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => pageStore.configure(), []);

    const isLogin = useLoginCheck();
    console.log("HomePage Check Login>>>", isLogin);
    return (
        <div className="homepage-layout-horizontal-container">
            <MainRoomMenu />
            <div className="homepage-layout-horizontal-content">
                <MainRoomListPanel isLogin={isLogin} />
                <MainRoomHistoryPanel isLogin={isLogin} />
            </div>
            <AppUpgradeModal />
        </div>
    );
});

export default HomePage;
