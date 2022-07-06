export type BusEvent = {
    id: string,
    data: any,
}

export type BusListener = (e: BusEvent) => void;

export default class EventBus {

    listeners: BusListener[] = []

    constructor() {
        if(process.env.NODE_ENV === 'development') {
            this.listeners.push(console.log);
            (globalThis as any).eventBus = this
        }
    }

    attach(listener: BusListener) {
        this.listeners.push(listener)
    }

    detach(listener: BusListener) {
        let index = this.listeners.indexOf(listener)
        if(index != -1) {
            this.listeners.splice(index, 1)
        }
    }

    post(msg: any) {
        this.listeners.forEach(listener => listener(msg))
    }

}
