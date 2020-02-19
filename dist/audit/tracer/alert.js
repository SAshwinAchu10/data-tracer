"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mail = require("@sendgrid/mail");
var Alert = /** @class */ (function () {
    function Alert(options) {
        this.options = options;
    }
    /**
     *
     * @param dataObject
     */
    Alert.prototype.emit = function (dataObject) {
        if (dataObject.severity.includes(this.options.type)) {
            if (this.options.provider == 'sendgrid') {
                mail.setApiKey(this.options.apiKey);
                var msg = {
                    to: this.options.mailTo,
                    from: this.options.from,
                    subject: this.options.subject,
                    text: JSON.stringify(dataObject),
                };
                mail.send(msg);
            }
        }
    };
    return Alert;
}());
exports.default = Alert;
