export declare enum CFAlertStyle {
    ALERT = 0,
    BOTTOM_SHEET = 1,
    NOTIFICATION = 2,
}
export declare enum CFAlertActionStyle {
    POSITIVE = 0,
    DEFAULT = 1,
    NEGATIVE = 2,
}
export declare enum CFAlertActionAlignment {
    JUSTIFIED = 0,
    END = 1,
    START = 2,
    CENTER = 3,
}
export declare enum CFAlertGravity {
    START = 0,
    CENTER_HORIZONTAL = 1,
    END = 2,
}
export interface DialogOptions {
    dialogStyle: CFAlertStyle;
    title: string;
    titleColor?: string;
    message?: string;
    messageColor?: string;
    textColor?: string;
    textAlignment?: CFAlertGravity;
    backgroundColor?: string;
    backgroundBlur?: boolean;
    cancellable?: boolean;
    headerView?: any;
    footerView?: any;
    onDismiss?: Function;
    buttons?: [{
        text: string;
        buttonStyle: CFAlertActionStyle;
        buttonAlignment?: CFAlertActionAlignment;
        textColor?: string;
        backgroundColor?: string;
        onClick: Function;
    }];
    simpleList?: any;
    singleChoiceList?: any;
    multiChoiceList?: any;
}
export declare class CFAlertDialog {
    private _alertController;
    show(options: DialogOptions): Promise<{}>;
    dismiss(animated: boolean): void;
    private _addActions(buttons, resolve);
}
