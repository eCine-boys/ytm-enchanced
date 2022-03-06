import {BrowserWindow, Session} from "electron";
import Logger from "./LoggerProvider";
import path from "path";
import fs from "fs";

class ExtensionsLoader {
    constructor(session: Session) {
        this.loadExtensions(session);
    }

    public async loadExtensions(session: Session) {
        const extensionsPath = path.resolve(__dirname, "..", 'extension');
        const extensions = fs.readdirSync(extensionsPath);

        for await(const extension of extensions) {
            try {
                const ext = await session.loadExtension(path.resolve(extensionsPath, extension));
                
                if(ext && ext.name)  {
                    Logger("INFO", `${ext.name} loaded`);
                } else {
                    Logger("ERROR", `${extension} not loaded`);
                }
            } catch (err: any) {
                Logger("ERROR", `${extension} failed to load\n${err.Message || err}`);
            }
        }
    }
}

export default ExtensionsLoader;