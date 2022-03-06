import {app, session} from "electron";
import CreateWindow from "./src/main";
import Events from "./src/providers/EventsProvider";
import ExtensionsProvider from "./src/providers/ExtensionsProvider";

const instanceEvents = Events.getInstance();

app.on('ready', () => {
    const {mainWindow} = new CreateWindow();
    new ExtensionsProvider(session.defaultSession);

    instanceEvents.on('extensions-loaded', () => {
        mainWindow.show();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});