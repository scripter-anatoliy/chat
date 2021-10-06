import React, {ChangeEvent, useEffect, useState} from 'react'
import {Comment} from "./Comment";
import PostMessage from "./PostMessage";

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
        text: 'Love this article!',
        author: 'john',
        children: null,
    },
    {
        id: 3,
        parentId: 1,
        text: 'Agreed! this article is great',
        author: 'kevin',
        children: null,
    },
    {
        id: 2,
        parentId: 1,
        text: 'What r u talking about this article is terrible...',
        author: 'james',
        children: null,
    },
    {
        id: 5,
        parentId: null,
        text: 'Sweet article! Nice job always high quality.',
        author: 'steve',
        children: null,
    },
    {
        id: 4,
        parentId: 2,
        text: 'come on, its a good article and u know it',
        author: 'sarah',
        children: null,
    },
    {
        id: 6,
        parentId: 5,
        text: 'agreed, solid content here for sure!',
        author: 'jeff',
        children: null,
    },
]

function createTree(list: CommentsType[]) {
    console.log(list)
    const map: { [key: string]: number } = {},
        roots = []

    for (let i = 0; i < list.length; i += 1) {
        map[list[i].id] = i // initialize the map
        list[i].children = [] // initialize the children
    }

    for (let i = 0; i < list.length; i += 1) {
        const node = list[i]
        if (node.parentId) {
            // if you have dangling branches check that map[node.parentId] exists
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


    const commentAdd = (parent: any, text: string, author: string) => {
        console.log(parent)
        const newComment = {
            id: comments.length + 1,
            parentId: parent && parent.id,
            text,
            author,
            children: [],
        };
        if (parent)
            parent.children.push(newComment)
        else {
            commentTree && setCommentTree([...commentTree, newComment])
        }
        comments.push({...newComment, children: null})
        localStorage["comments"] = JSON.stringify(comments)
    }

    useEffect(() => {
        let localStorageElement = localStorage["comments"];
        comments = localStorageElement ? JSON.parse(localStorageElement) : comments
        setCommentTree(createTree([...comments]))
    }, [])

    return (
        <div style={{fontFamily: 'sans-serif'}}>
            {toggle === null &&
            <PostMessage commentAdd={(...args) => {
                commentAdd(...args)
                rerender(ps => !ps)
            }} parent={null}/>
            }
            {!commentTree && "spinner"}
            {commentTree?.map((comment) => {
                return <Comment commentAdd={commentAdd} key={comment.id} comment={comment} toggle={toggle}
                                setToggle={setToggle}/>
            })}
        </div>
    )
}

export default App

