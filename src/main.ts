import {BrowserWindow} from "electron";
import path from "path";
import fs from "fs";
import DiscordRPCProvider from "./providers/DiscordRPCProvider";
class MainWindow {
    public mainWindow: BrowserWindow;
    private discord?: DiscordRPCProvider;

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

        // Inject custom CSS/JS when page loads
        this.mainWindow.webContents.on('did-finish-load', () => {
            const assetsPath = path.resolve(__dirname, 'assets');
            const cssPath = path.join(assetsPath, 'custom.css');
            if (fs.existsSync(cssPath)) {
                this.mainWindow.webContents.insertCSS(fs.readFileSync(cssPath, 'utf8'));
            }
            const jsPath = path.join(assetsPath, 'custom.js');
            if (fs.existsSync(jsPath)) {
                this.mainWindow.webContents.executeJavaScript(fs.readFileSync(jsPath, 'utf8'));
            }
        });

        // Setup Discord Rich Presence if client id provided
        const clientId = process.env.DISCORD_CLIENT_ID;
        if (clientId) {
            this.discord = new DiscordRPCProvider(clientId);
        }

        (this.mainWindow.webContents as any).on('media-started-playing', async () => {
            try {
                const info = await this.mainWindow.webContents.executeJavaScript(`(() => {
                    const title = document.querySelector('ytmusic-player-bar .title')?.textContent || '';
                    const artist = document.querySelector('ytmusic-player-bar .byline')?.textContent || '';
                    return { title, artist };
                })();`);
                if (info?.title) {
                    this.discord?.setActivity(info.title, info.artist);
                }
            } catch (err) {
                console.error('Failed to update Discord RPC', err);
            }
        });

        // this.mainWindow.on('ready-to-show', () => {
        //     this.mainWindow.show();
        // });

    }
}

export default MainWindow;
