import {BrowserWindow} from "electron";
import path from "path";
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

        this.mainWindow.webContents.on('media-started-playing', (e: any) => {
            console.log(this.mainWindow.webContents.getURL());
        });

        // this.mainWindow.on('ready-to-show', () => {
        //     this.mainWindow.show();
        // });

        this.mainWindow.on('closed', () => {
            this.mainWindow.close();
        });

    }
}

export default MainWindow;