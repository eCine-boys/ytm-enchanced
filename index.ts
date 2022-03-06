import {app, session} from "electron";
import CreateWindow from "./src/main";
import Events from "./src/providers/EventsProvider";
import ExtensionsProvider from "./src/providers/ExtensionsProvider";
import isDev from "electron-is-dev";

const instanceEvents = Events.getInstance();

app.on('ready', () => {
    const {mainWindow} = new CreateWindow();
    new ExtensionsProvider(session.defaultSession);

    Events.getInstance().on('show', () => {
        mainWindow.webContents.openDevTools();
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});