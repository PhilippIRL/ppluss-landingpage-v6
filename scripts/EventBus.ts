export type BusEvent = {

    id: string,

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    
}

export type BusListener = (e: BusEvent) => void;

export default class EventBus {

    listeners: BusListener[] = []

    constructor() {
        if(process.env.NODE_ENV === 'development') {
            this.listeners.push(console.log);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    post(msg: BusEvent) {
        this.listeners.forEach(listener => listener(msg))
    }

}
