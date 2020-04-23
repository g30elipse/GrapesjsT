import React, { useState } from 'react'
import { Theme, Dialog, AppBar, Toolbar, Box, Button, TextField, DialogContent, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { GrapeJsData } from '../../types'
import Editor from '../../Components/Editor'


const DEFAULT_DATA: TPageData = {
    name: '',
    data: {
        components: [],
        css: '',
        html: '',
        style: []
    }
}

export interface TPageData {
    name: string
    data: GrapeJsData
}

const usePageCreator = (onSave?: (data: TPageData) => void) => {

    const [open, setOpen] = useState(false);
    const openDialoog = () => setOpen(true)
    const closeDialog = () => setOpen(false)
    const [page, setPage] = useState<TPageData>({ ...DEFAULT_DATA })
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');

    const createPage = () => {
        setIsEditing(false)
        setPage({ ...DEFAULT_DATA })
        openDialoog();
    }

    const editPage = (data: TPageData) => {
        setIsEditing(true)
        setPage({ ...data });
        openDialoog()
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPage({
            ...page,
            name: e.target.value,
        })
    }

    const handleClose = () => {
        setError('')
        if (!page.name) {
            setError("Name is required")
            return;
        }
        if (onSave) {
            onSave(page);
        }
        closeDialog();
        setPage(DEFAULT_DATA)
    }

    const handleSave = (data: GrapeJsData) => {
        setPage({ ...page, data })
    }


    return {
        isEditing,
        createPage,
        editPage,
        Component: (
            <Dialog open={open} fullScreen>
                <AppBar>
                    <Toolbar>
                        <TextField value={page.name || ''} label="Page name" onChange={handleNameChange} />
                        <Typography color="error">{error}</Typography>
                        <Box flex={1} />
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </Toolbar>
                </AppBar>
                <Box pt={8}>
                    {open && (
                        <Editor id="editor-qjs" data={page.data} onSave={handleSave} />
                    )}
                </Box>
            </Dialog>
        )
    }
}




export default usePageCreator