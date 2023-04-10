export interface WebsocketMessage{
    type: WebsocketMessageType;
    id: number;
    data: any;
    
}
export enum WebsocketMessageType{
    AUTH = 0,
    KEY_DOWN = 1,
    KEY_UP = 2,
    KEY = 3,
    // relative
    MOUSE_MOVE = 4,
    MOUSE_DOWN = 5,
    MOUSE_UP = 6,
    MOUSE_CLICK = 7,
    MOUSE_DOUBLE_CLICK = 8,
    MOUSE_WHEEL = 9,
    MOUSE_MOVE_ABSOLUTE = 10,
    // 防止设备关闭adb和rndis以后找不到，加一个命令执行的功能
    EXECUTE_SYSTEM_COMMAND_ON_DEVICE = 999,
}