import React, { useEffect, useState } from 'react'
import { Theme, Button, AppBar, Toolbar, Box } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';
import gjsConfig from './config';
import { GrapesjsEditor, GrapeJsData } from '../../types';


interface EditorProps {
    data?: GrapeJsData
    id: string
    onSave?: (data: GrapeJsData) => void
}




// let editor: GrapesjsEditor | null = null
const Editor: React.FC<EditorProps> = (props) => {
    const { id } = props;
    const { data } = props;
    const classes = useStyles();
    const [editor, setEditor] = useState<GrapesjsEditor | null>(null)

    useEffect(() => {
        const _editor = gjsConfig.initEditor(id, data, props.onSave)
        // editor = gjsConfig.initEditor(id, data, props.onSave)
        setEditor(_editor)
        _editor.setComponents(data?.html)
        _editor.setStyle(data?.css)
        console.log("editor data", _editor.getHtml())

    }, [])

    return (
        <div id={id} />
    )
}

const useStyles = makeStyles((theme: Theme) => createStyles({

}))

export default Editor