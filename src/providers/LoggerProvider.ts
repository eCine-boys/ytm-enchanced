
export default (...args: any[]) => {
    const [event, ...rest] = args;
    
    console.log(`${new Date().toUTCString()} | ${event}`, ...rest);
}