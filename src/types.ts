export interface GrapesjsEditor {
    getConfig: Function
    getHtml: Function
    getCss: Function
    getStyle: Function
    setStyle: Function
    getJs: Function
    setComponents: Function
    Keymaps: any
    getComponents: Function
    getWrapper: Function
    load: Function
    store: Function
    Commands: any
    Panels: any
}


export interface GrapeJsData {
    style: Array<Record<string, any>>
    components: Array<any>
    css: string
    html: string
}