import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {CommentsType} from "./App";
import {Button, TextField} from "@material-ui/core";
import {Send} from "@material-ui/icons";

export type PostMessageType = {
    parent: CommentsType | null
    commentAdd: (parent: CommentsType | null, text: string) => void
}

function PostMessage({parent, commentAdd}: PostMessageType) {
    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onChangeTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value)
        setError('')
    }
    const callbackCommentAdd = () => {
        if (text.trim() !== '') {
            commentAdd(parent, text.trim())
            setText('')
        } else {
            setError('Введите текст!')
        }
        setText('')
    }
    const onKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.code === "Enter" && !e.shiftKey) {
            setText('')
            e.preventDefault()
            callbackCommentAdd()
        }
    }

    return (
        <div style={{padding: "10px"}}>
            <TextField
                id="outlined-textarea"
                label="Next message..."
                multiline
                value={text}
                autoFocus
                onChange={onChangeTextHandler}
                onKeyPress={onKeyEnter}
                error={!!error}
                helperText={error}
            />
            <Button color={"success"}
                    variant="contained"
                    onClick={callbackCommentAdd}
                    endIcon={<Send/>}
                    size={"small"}
            >
                Text
            </Button>
        </div>
    )
}

export default PostMessage;