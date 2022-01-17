"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frame = require("@nativescript/core/ui/frame").Frame;
var color_1 = require("@nativescript/core");
var CFAlertStyle;

(function (CFAlertStyle) {
    CFAlertStyle[CFAlertStyle["ALERT"] = 0] = "ALERT";
    CFAlertStyle[CFAlertStyle["BOTTOM_SHEET"] = 1] = "BOTTOM_SHEET";
    CFAlertStyle[CFAlertStyle["NOTIFICATION"] = 2] = "NOTIFICATION";
})(CFAlertStyle = exports.CFAlertStyle || (exports.CFAlertStyle = {}));
var CFAlertActionStyle;
(function (CFAlertActionStyle) {
    CFAlertActionStyle[CFAlertActionStyle["POSITIVE"] = 0] = "POSITIVE";
    CFAlertActionStyle[CFAlertActionStyle["DEFAULT"] = 1] = "DEFAULT";
    CFAlertActionStyle[CFAlertActionStyle["NEGATIVE"] = 2] = "NEGATIVE";
})(CFAlertActionStyle = exports.CFAlertActionStyle || (exports.CFAlertActionStyle = {}));
var CFAlertActionAlignment;
(function (CFAlertActionAlignment) {
    CFAlertActionAlignment[CFAlertActionAlignment["JUSTIFIED"] = 0] = "JUSTIFIED";
    CFAlertActionAlignment[CFAlertActionAlignment["END"] = 1] = "END";
    CFAlertActionAlignment[CFAlertActionAlignment["START"] = 2] = "START";
    CFAlertActionAlignment[CFAlertActionAlignment["CENTER"] = 3] = "CENTER";
})(CFAlertActionAlignment = exports.CFAlertActionAlignment || (exports.CFAlertActionAlignment = {}));
var CFAlertGravity;
(function (CFAlertGravity) {
    CFAlertGravity[CFAlertGravity["START"] = 0] = "START";
    CFAlertGravity[CFAlertGravity["CENTER_HORIZONTAL"] = 1] = "CENTER_HORIZONTAL";
    CFAlertGravity[CFAlertGravity["END"] = 2] = "END";
})(CFAlertGravity = exports.CFAlertGravity || (exports.CFAlertGravity = {}));
var DEFAULT_DIALOG_OPTIONS = {
    dialogStyle: CFAlertStyle.ALERT,
    title: '',
    titleColor: 'black',
    messageColor: 'black',
    cancellable: true,
};
var CFAlertDialog = (function () {
    function CFAlertDialog() {
    }
    CFAlertDialog.prototype.show = function (options) {
        var _this = this;
        options = Object.assign({}, DEFAULT_DIALOG_OPTIONS, options);
        options.titleColor = new color_1.Color(options.titleColor).ios;
        options.messageColor = new color_1.Color(options.messageColor).ios;
        if (typeof options.textAlignment === undefined)
            options.textAlignment = CFAlertGravity.START;
        var viewController = frame.topmost().currentPage.ios;
        return new Promise(function (resolve, _) {
            if (options.simpleList || options.singleChoiceList || options.multiChoiceList) {
                alert('Lists are not available on iOS.');
                resolve('Lists are not available on iOS.');
                return;
            }
            _this._alertController = CFAlertViewController.alloc().initWithTitleTitleColorMessageMessageColorTextAlignmentPreferredStyleHeaderViewFooterViewDidDismissAlertHandler(options.title, options.titleColor, options.message, options.messageColor, options.textAlignment, options.dialogStyle, options.headerView, options.footerView, function () {
                if (options.onDismiss)
                    options.onDismiss();
                resolve();
            });
            _this._alertController.shouldDismissOnBackgroundTap = options.cancellable;
            _this._alertController.backgroundStyle = options.backgroundBlur
                ? CFAlertControllerBackgroundStyle.Blur
                : CFAlertControllerBackgroundStyle.Plain;
            if (options.backgroundColor)
                _this._alertController.backgroundColor = new color_1.Color(options.backgroundColor).ios;
            _this._addActions(options.buttons, resolve);
            viewController.presentViewControllerAnimatedCompletion(_this._alertController, true, null);
        });
    };
    CFAlertDialog.prototype.dismiss = function (animated) {
        if (!this._alertController)
            return;
        try {
            this._alertController.dismissAlertWithAnimationCompletion(animated, function () { });
        }
        catch (e) { }
    };
    CFAlertDialog.prototype._addActions = function (buttons, resolve) {
        var _this = this;
        if (buttons === void 0) { buttons = []; }
        buttons.forEach(function (btnOpts) {
            if (!btnOpts.buttonAlignment)
                btnOpts.buttonAlignment = CFAlertActionAlignment.JUSTIFIED;
            if (btnOpts.textColor)
                btnOpts.textColor = new color_1.Color(btnOpts.textColor).ios;
            if (btnOpts.backgroundColor)
                btnOpts.backgroundColor = new color_1.Color(btnOpts.backgroundColor).ios;
            var btn = CFAlertAction.alloc().initWithTitleStyleAlignmentBackgroundColorTextColorHandler(btnOpts.text, btnOpts.buttonStyle, btnOpts.buttonAlignment, btnOpts.backgroundColor, btnOpts.textColor, function (action) {
                btnOpts.onClick(action.title);
                resolve(action.title);
            });
            _this._alertController.addAction(btn);
        });
    };
    return CFAlertDialog;
}());
exports.CFAlertDialog = CFAlertDialog;
//# sourceMappingURL=cfalert-dialog.ios.js.map