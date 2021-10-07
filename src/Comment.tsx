import React from "react";
import c from "./Comment.module.css"
import PostMessage from "./PostMessage";
import {CommentsType} from "./App";
import {Button, Grid, Paper} from "@material-ui/core";
import {Reply} from "@material-ui/icons";

export type CommentPropsType = {
    comment: CommentsType
    commentAdd: (parent: CommentsType | null, text: string) => void
    toggle: null | number
    setToggle: (toggle: null | number) => void
}

export function Comment({comment, toggle, setToggle, commentAdd}: CommentPropsType) {

    const nestedComments = (comment.children || []).map((comment: CommentsType) => {
        return (
            <Comment key={comment.id}
                     commentAdd={commentAdd}
                     comment={comment} toggle={toggle}
                     setToggle={setToggle}
            />
        )
    })

    return (
        <div className={c.wrapperComment}>
            <div className={c.commentAuthor}>
                {comment.author}
            </div>
            <div className={c.commentText}>{comment.text}</div>
            {toggle !== comment.id
                ?
                <Button onClick={() => setToggle?.(comment.id)}
                        color={"primary"}
                        variant="contained"
                        endIcon={<Reply/>}
                        size={"small"}
                >
                    reply
                </Button>
                :
                <Button onClick={() => setToggle?.(null)}
                        color={"secondary"}
                        variant="contained"
                        size={"small"}
                >
                    cancel
                </Button>
            }
            <Grid item>
                {toggle === comment.id &&
                <PostMessage parent={comment}
                             commentAdd={(...args) => {
                                 commentAdd(...args)
                                 setToggle(null)
                             }
                             }
                />
                }
                <div className={c.commentText}>
                    <Paper elevation={2} style={{paddingRight: '20px'}}>
                        {nestedComments}
                    </Paper>
                </div>
            </Grid>
        </div>
    )
}