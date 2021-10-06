import React, {ChangeEvent, useState} from "react";
import {CommentsType} from "./App";

export type PostMessageType = {
    parent: CommentsType | null
    commentAdd: (parent: any, text: string, author: string) => void
}


function PostMessage({parent, commentAdd}: PostMessageType) {
    const [text, setText] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
    }
    const onChangeAuthorHandler = (e:ChangeEvent<HTMLInputElement> ) => {
        setAuthor(e.currentTarget.value)
    }
    return (
        <div>
            <input value={author} onChange={onChangeAuthorHandler}/>
            <textarea value={text} onChange={onChangeTextHandler}/>
            <button onClick={() => {
                commentAdd(parent, text, author)
            }}>+
            </button>
        </div>

    )

}

export default PostMessage;