import React, { useEffect } from 'react'
import { Theme } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { TPageData } from './PageCreator'

interface PreviewProps {
    data: TPageData
}

const Preview: React.FC<PreviewProps> = (props) => {
    const { data } = props;
    const classes = useStyles(data.data.css)()

    useEffect(() => {
        console.log("css", data.data.css)
        var style = document.createElement('style');
        style.innerHTML = data.data.css;
        document.head.appendChild(style);
    }, [])

    return (
        <div className={classes.root}>
            <div dangerouslySetInnerHTML={{ __html: data.data.html }} />
        </div>
    )
}

const useStyles = (css: string) => makeStyles((theme: Theme) => createStyles({
    root: {

    }
}))

export default Preview