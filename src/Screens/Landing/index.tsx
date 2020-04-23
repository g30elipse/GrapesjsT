import React, { FC, useState } from 'react';
import Editor from '../../Components/Editor';
import { Button, Fab, Icon, Box, Typography, Dialog } from '@material-ui/core';
import { GrapeJsData } from '../../types';
import usePageCreator, { TPageData } from '../PageCreator';
import Preview from '../Preview';

const Landing: FC = () => {
    const [pages, setPages] = useState<TPageData[]>([]);
    const [preview, setPreview] = useState<{ open: boolean, data?: TPageData }>({ open: false })
    const { createPage, editPage, isEditing, Component } = usePageCreator((data: TPageData) => {
        console.log("is editing", isEditing, data)
        if (isEditing) {
            const updated = [...pages].map(p => p.name === data.name ? data : p)
            setPages(updated)
        }
        else {
            setPages([...pages, data])
        }
    })

    const handlePreview = (page: TPageData) => () => {
        setPreview({ open: true, data: page });
    }


    return (
        <div>
            <Fab color="primary" onClick={createPage}>
                new
            </Fab>

            <Box width="500px" mx="auto">
                <Typography gutterBottom variant="h5">PAGES</Typography>
                {pages.map((p, i) => (
                    <Box key={i} my={2} display="flex" flex={1}>
                        <Typography>{p.name}</Typography>
                        <Box flex={1} />
                        <Button variant="text" color="primary" onClick={handlePreview(p)}>Preview</Button>
                        <Button variant="text" color="primary" onClick={() => editPage(p)}>Edit</Button>
                    </Box>
                ))}
            </Box>


            <Dialog open={preview.open} fullScreen>
                {preview.data && (
                    <div>
                        <Button onClick={() => {
                            setPreview({ open: false });
                        }}>close</Button>
                        <Preview data={preview.data} />
                    </div>
                )}
            </Dialog>

            {Component}
        </div>
    )
}

export default Landing;