import { ChatMsg, KickOut } from "flat-components";

export interface ClassroomReplayEventData {
    "new-message": ChatMsg;
    "kicking-user": KickOut;
}
