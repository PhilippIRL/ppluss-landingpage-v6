export default class EventBus {

    listeners = []

    attach(listener) {
        this.listeners.push(listener);
    }

    detach(listener) {
        this.listeners.splice(listener);
    }

    post(msg) {
        this.listeners.forEach(listener => listener(msg));
    }

}