"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require("@nativescript/application");
var color_1 = require("@nativescript/core");
var CFAlertStyle;
(function (CFAlertStyle) {
    CFAlertStyle[CFAlertStyle["NOTIFICATION"] = 0] = "NOTIFICATION";
    CFAlertStyle[CFAlertStyle["ALERT"] = 1] = "ALERT";
    CFAlertStyle[CFAlertStyle["BOTTOM_SHEET"] = 2] = "BOTTOM_SHEET";
})(CFAlertStyle = exports.CFAlertStyle || (exports.CFAlertStyle = {}));
var CFAlertActionStyle;
(function (CFAlertActionStyle) {
    CFAlertActionStyle[CFAlertActionStyle["DEFAULT"] = 0] = "DEFAULT";
    CFAlertActionStyle[CFAlertActionStyle["NEGATIVE"] = 1] = "NEGATIVE";
    CFAlertActionStyle[CFAlertActionStyle["POSITIVE"] = 2] = "POSITIVE";
})(CFAlertActionStyle = exports.CFAlertActionStyle || (exports.CFAlertActionStyle = {}));
var CFAlertActionAlignment;
(function (CFAlertActionAlignment) {
    CFAlertActionAlignment[CFAlertActionAlignment["START"] = 0] = "START";
    CFAlertActionAlignment[CFAlertActionAlignment["END"] = 1] = "END";
    CFAlertActionAlignment[CFAlertActionAlignment["CENTER"] = 2] = "CENTER";
    CFAlertActionAlignment[CFAlertActionAlignment["JUSTIFIED"] = 3] = "JUSTIFIED";
})(CFAlertActionAlignment = exports.CFAlertActionAlignment || (exports.CFAlertActionAlignment = {}));
var CFAlertGravity;
(function (CFAlertGravity) {
    CFAlertGravity[CFAlertGravity["START"] = 0] = "START";
    CFAlertGravity[CFAlertGravity["CENTER_HORIZONTAL"] = 1] = "CENTER_HORIZONTAL";
    CFAlertGravity[CFAlertGravity["END"] = 2] = "END";
})(CFAlertGravity = exports.CFAlertGravity || (exports.CFAlertGravity = {}));
var Builder = com.crowdfire.cfalertdialog.CFAlertDialog.Builder;
var notificationStyle = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertStyle.NOTIFICATION;
var alertStyle = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertStyle.ALERT;
var bottomSheetStyle = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertStyle.BOTTOM_SHEET;
var styles = [notificationStyle, alertStyle, bottomSheetStyle];
var actionDefault = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertActionStyle.DEFAULT;
var actionNegative = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertActionStyle.NEGATIVE;
var actionPositive = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertActionStyle.POSITIVE;
var actionStyles = [actionDefault, actionNegative, actionPositive];
var alignStart = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertActionAlignment.START;
var alignEnd = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertActionAlignment.END;
var alignCenter = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertActionAlignment.CENTER;
var alignJustified = com.crowdfire.cfalertdialog.CFAlertDialog.CFAlertActionAlignment.JUSTIFIED;
var alignment = [alignStart, alignEnd, alignCenter, alignJustified];
var gravityStart = android.view.Gravity.START;
var gravityCenterHorizontal = android.view.Gravity.CENTER_HORIZONTAL;
var gravityEnd = android.view.Gravity.END;
var gravity = [gravityStart, gravityCenterHorizontal, gravityEnd];
var Listener = (function () {
    function Listener() {
    }
    Listener.prototype.onClick = function (dialog, which) {
        dialog.dismiss();
    };
    return Listener;
}());
var DEFAULT_DIALOG_OPTIONS = {
    dialogStyle: alertStyle,
    cancellable: true,
};
var CFAlertDialog = (function () {
    function CFAlertDialog() {
    }
    CFAlertDialog.prototype.show = function (options) {
        var _this = this;
        options = Object.assign({}, DEFAULT_DIALOG_OPTIONS, options);
        var builder = new Builder(app.android.foregroundActivity);
        if (typeof options.dialogStyle !== undefined) {
            builder.setDialogStyle(styles[options.dialogStyle]);
        }
        if (options.title)
            builder.setTitle(options.title);
        if (options.message)
            builder.setMessage(options.message);
        if (options.textAlignment !== undefined)
            builder.setTextGravity(gravity[options.textAlignment]);
        if (options.backgroundColor)
            builder.setBackgroundColor(new color_1.Color(options.backgroundColor).android);
        if (options.textColor)
            builder.setTextColor(new color_1.Color(options.textColor).android);
        builder.setCancelable(options.cancellable);
        if (options.headerView)
            builder.setHeaderView(options.headerView);
        if (options.footerView)
            builder.setFooterView(options.footerView);
        return new Promise(function (resolve, _) {
            if (options.buttons) {
                options.buttons.forEach(function (button) {
                    builder.addButton(button.text, button.textColor ? new color_1.Color(button.textColor).android : -1, button.backgroundColor ? new color_1.Color(button.backgroundColor).android : -1, actionStyles[button.buttonStyle], alignment[button.buttonAlignment], new android.content.DialogInterface.OnClickListener({
                        onClick: function (dialog, which) {
                            button.onClick(button.text);
                            dialog.dismiss();
                            resolve(button.text);
                        },
                    }));
                });
            }
            if (options.simpleList) {
                builder.setItems(options.simpleList.items, new android.content.DialogInterface.OnClickListener({
                    onClick: function (dialogInterface, index) {
                        options.simpleList.onClick(dialogInterface, index);
                        dialogInterface.dismiss();
                    },
                }));
            }
            if (options.singleChoiceList) {
                builder.setSingleChoiceItems(options.singleChoiceList.items, options.singleChoiceList.selectedItem, new android.content.DialogInterface.OnClickListener({
                    onClick: function (dialogInterface, index) {
                        options.singleChoiceList.onClick(dialogInterface, index);
                    },
                }));
            }
            if (options.multiChoiceList) {
                builder.setMultiChoiceItems(options.multiChoiceList.items, options.multiChoiceList.selectedItems, new android.content.DialogInterface.OnMultiChoiceClickListener({
                    onClick: function (dialogInterface, index, b) {
                        options.multiChoiceList.onClick(dialogInterface, index, b);
                    },
                }));
            }
            _this._alertDialog = builder.show();
            if (options.titleColor) {
                _this._alertDialog.setTitleColor(new color_1.Color(options.titleColor).android);
            }
            if (options.messageColor) {
                _this._alertDialog.setMessageColor(new color_1.Color(options.messageColor).android);
            }
            if (options.onDismiss) {
                _this._alertDialog.setOnDismissListener(new android.content.DialogInterface.OnDismissListener({
                    onDismiss: function () {
                        options.onDismiss();
                        resolve();
                    },
                }));
            }
        });
    };
    CFAlertDialog.prototype.dismiss = function (animated) {
        if (!this._alertDialog)
            return;
        try {
            this._alertDialog.dismiss();
        }
        catch (e) { }
    };
    return CFAlertDialog;
}());
exports.CFAlertDialog = CFAlertDialog;
//# sourceMappingURL=cfalert-dialog.android.js.map