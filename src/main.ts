import {BrowserWindow} from "electron";
import path from "path";
import NotificationProvider from "./providers/NotificationProvider";
import EventsProvider from "./providers/EventsProvider";
import LoggerProvider from "./providers/LoggerProvider";
class MainWindow {
    public mainWindow: BrowserWindow;

    constructor() {
        this.mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                preload: path.resolve(__dirname, "preload.js")
            },
            center: true,
            backgroundColor: '#333',
            title: 'Youtube Music Enchanced',
            autoHideMenuBar: true,
            show: false,
        });

        this.mainWindow.loadURL("https://music.youtube.com/");
        this.mainWindow.maximize();

        this.mainWindow.eventNames().forEach((event: any) => {
            this.mainWindow.on(event, (...args) => {
                LoggerProvider('EVENT', `${event} ${args}`);
                EventsProvider.getInstance().emit(event, args);
            });
        });

        this.mainWindow.webContents.eventNames().forEach((event: any) => {
            this.mainWindow.on(event, (...args) => {
                LoggerProvider('EVENT', `${event} ${args}`);
                EventsProvider.getInstance().emit(event, args);
            });
        });

        this.mainWindow.webContents.on('media-started-playing', (e: any) => {
            // if(this.mainWindow.isFocused()) return;

            let [NTitle, NBody] = ["Tocando agora", this.mainWindow.getTitle()];

            NotificationProvider.showNotification(NTitle, NBody);

            console.log(this.mainWindow.webContents.getURL());
        });

        this.mainWindow.on('ready-to-show', () => {
            this.mainWindow.show();
        })
    }
}

export default MainWindow;