declare module '@zoomus/websdk';
declare module 'grapesjs';
declare module 'grapesjs-preset-webpage';
declare module 'grapesjs-preset-newsletter';

declare global {
    interface Window { $: any; jquery: any }
}


// NodeJS.ProcessEnv.NODE_ENV