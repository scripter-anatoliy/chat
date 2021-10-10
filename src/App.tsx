import React, {useEffect, useState} from 'react'
import {Comment} from './Comment';
import PostMessage from './PostMessage';
import {Box, Container, Grid, LinearProgress, Paper} from '@material-ui/core';

export type CommentsType = {
    id: number,
    parentId: null | number,
    text: string,
    author: string,
    children: null | CommentsType[],
}

let comments: CommentsType[] = [
    {
        id: 1,
        parentId: null,
        text: 'Всем привет! Как дела?',
        author: 'Антон',
        children: null,
    },
    {
        id: 3,
        parentId: 1,
        text: 'Привет! нормально, сам как?',
        author: 'Евгений',
        children: null,
    },
    {
        id: 2,
        parentId: 1,
        text: 'Хай! Норм, только дел много...',
        author: 'Сергей',
        children: null,
    },
    {
        id: 5,
        parentId: null,
        text: 'Как тестовое? все в порядке?',
        author: 'Владимир',
        children: null,
    },
    {
        id: 4,
        parentId: 2,
        text: 'Какие дела? отдыхать тоже надо)',
        author: 'Надежда',
        children: null,
    },
    {
        id: 6,
        parentId: 5,
        text: 'Да, нормально! ',
        author: 'Александр',
        children: null,
    },
]

function createTree(list: CommentsType[]) {
    const map: { [key: string]: number } = {},
        roots = []

    for (let i = 0; i < list.length; i += 1) {
        map[list[i].id] = i // инициализировать map
        list[i].children = [] // инициализировать children
    }

    for (let i = 0; i < list.length; i += 1) {
        const node = list[i]
        if (node.parentId) {
            list[map[node.parentId]].children!.push(node)
        } else {
            roots.push(node)
        }
    }
    return roots
}

function App() {
    const [toggle, setToggle] = useState<null | number>(null)
    const [commentTree, setCommentTree] = useState<null | CommentsType[]>(null)
    const [, rerender] = useState(false)

    const commentAdd = (parent: CommentsType | null, text: string) => {
        const newComment = {
            id: comments.length + 1,
            parentId: parent && parent.id,
            text,
            author: 'Анатолий',
            children: [],
        };
        if (parent)
            parent.children!.push(newComment)
        else {
            commentTree && setCommentTree([...commentTree, newComment])
        }
        comments.push({...newComment, children: null})
        localStorage['comments'] = JSON.stringify(comments)
    }

    useEffect(() => {
        let localStorageElement = localStorage['comments'];
        comments = localStorageElement ? JSON.parse(localStorageElement) : comments
        setCommentTree(createTree([...comments]))
    }, [])

    return (
        <Container>
            <Grid container>
                {toggle === null &&
                <PostMessage commentAdd={(...args) => {
                    commentAdd(...args)
                    rerender(ps => !ps)
                }} parent={null}/>
                }
            </Grid>
            <Grid container style={{padding: '20px'}} spacing={2}>
                {!commentTree &&
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                }
                {commentTree?.map((comment) => {
                    return <Grid item style={{flex: '1 1 25%'}}>
                        <Paper elevation={3}
                               style={{padding: '20px', maxHeight: '500px', overflowY: 'auto',}}>
                            <Comment commentAdd={commentAdd}
                                     key={comment.id}
                                     comment={comment}
                                     toggle={toggle}
                                     setToggle={setToggle}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </Container>
    )
}

export default App

