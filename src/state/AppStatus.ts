export default interface AppStatus {
    message?:string;
    statusModalOpen:boolean;
    status:string;
}

enum ModalType {
    NONE = 1,
    NORMAL = 2,
    ERROR = 3
}