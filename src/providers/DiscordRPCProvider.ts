import RPC from 'discord-rpc';

class DiscordRPCProvider {
    private rpc: RPC.Client;
    private ready: Promise<void>;

    constructor(clientId: string) {
        this.rpc = new RPC.Client({ transport: 'ipc' });
        this.ready = this.rpc.login({ clientId }).then(() => undefined).catch(err => {
            console.error('Discord RPC login failed', err);
        });
    }

    public async setActivity(details: string, state: string) {
        await this.ready;
        try {
            this.rpc.setActivity({
                details,
                state,
                largeImageKey: 'enchanced',
                largeImageText: 'YT Music Enchanced'
            });
        } catch (err) {
            console.error('Discord RPC setActivity error', err);
        }
    }
}

export default DiscordRPCProvider;
