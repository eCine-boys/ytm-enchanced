import {EventEmitter} from "events";

class EventsProvider extends EventEmitter {
    private static instance: EventsProvider;

    private constructor() {
        super();
    }

    static getInstance(): EventsProvider {
        if (!EventsProvider.instance) {
            EventsProvider.instance = new EventsProvider();
        }
        return EventsProvider.instance;
    }
}

export default EventsProvider;