import React from "react";
import c from "./Comment.module.css"
import PostMessage from "./PostMessage";
import {CommentsType} from "./App";

export type CommentPropsType = {
    comment: CommentsType
    commentAdd: (parent: any, text: string, author: string) => void
    toggle: null | number
    setToggle: (toggle: null | number)=>void

}

export function Comment({comment, toggle, setToggle, commentAdd}: CommentPropsType) {


    const nestedComments = (comment.children || []).map((comment: any) => {
        return <Comment key={comment.id}
                        commentAdd={commentAdd}
                        comment={comment} toggle={toggle}
                        setToggle={setToggle}
                        // type="child"
        />
    })

    return (
        <div className={c.wrapperComment} >
            <div className={c.commentAuthor}>
                {comment.author}
            </div>
            <div className={c.commentText}>{comment.text}</div>
            <button onClick={() => {
                console.log(comment)
                setToggle?.(comment.id)
            }}>+</button>
            {toggle === comment.id &&
                <PostMessage parent={comment} commentAdd={(...args) => {
                    commentAdd(...args)
                    setToggle(null)
                }
                } />
            // <div>
            //     <input />
            //     <textarea></textarea>
            //     <button onClick={()=>{
            //         comment.children.push({
            //             id: 8,
            //             parentId: comment.id,
            //             text: 'agreed, solid content here for sure!',
            //             author: 'jeff',
            //             children: [],
            //         })
            //         setToggle(null)
            //     }}>+</button>
            // </div>
            }

            {nestedComments}

        </div>
    )
}