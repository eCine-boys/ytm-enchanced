import {Notification} from "electron";

class NotificationProvider {
    static showNotification(title: string, body: string): void {
        new Notification({title, body}).show();
    }

    static processWarningNotification(title: string, body: string): void {
        return new Notification({title, body, icon: "../assets/warning.png"}).show();
    }
}

export default NotificationProvider;