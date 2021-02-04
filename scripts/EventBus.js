export default class EventBus {

    listeners = [console.log]

    attach(listener) {
        this.listeners.push(listener);
    }

    detach(listener) {
        let index = this.listeners.indexOf(listener);
        if(index != -1) {
            this.listeners.splice(index, 1);
        }
    }

    post(msg) {
        this.listeners.forEach(listener => listener(msg));
    }

}