declare module '@zoomus/websdk';
declare module 'grapesjs';
declare module 'grapesjs-preset-webpage';

declare global {
    interface Window { $: any; jquery: any }
}


// NodeJS.ProcessEnv.NODE_ENV