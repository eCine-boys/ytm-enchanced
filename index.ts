import {app, session} from "electron";
import CreateWindow from "./src/main";
import path from "path";
import Events from "./src/providers/EventsProvider";
import ExtensionsProvider from "./src/providers/ExtensionsProvider";

app.on('ready', () => {
    const {mainWindow} = new CreateWindow();

    console.log(path.resolve(__dirname, "src", "extension", "enchanced-yt"))

    session.defaultSession.loadExtension(path.resolve(__dirname, "src", "extension", "enchanced-yt"))
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });

    // const extensionsProvider = new ExtensionsProvider(session.defaultSession);

    // new ExtensionsProvider(mainWindow);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});