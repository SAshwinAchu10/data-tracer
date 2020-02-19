import mail = require('@sendgrid/mail');

export default class Alert {
    options: any;

    constructor(options: any) {
        this.options = options;
    }

    /**
     * 
     * @param dataObject 
     */
    emit(dataObject: any) {
        if (dataObject.severity.includes(this.options.type)) {
            if (this.options.provider == 'sendgrid') {
                mail.setApiKey(this.options.apiKey);
                const msg = {
                    to: this.options.mailTo,
                    from: this.options.from,
                    subject: this.options.subject,
                    text: JSON.stringify(dataObject),
                };
                mail.send(msg);
            }
        }
    }
}