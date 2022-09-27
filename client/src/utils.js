import moment from "moment";

export function debounce(callee, timeoutMs) {
    return function perform(...args) {
        let previousCall = this.lastCall;

        this.lastCall = Date.now();

        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer);
        }

        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    };
}

export function formateDate(date) {
    return moment.unix(date).format("DD.MM.YY");
}
