import React from "react";
import cl from "./PostList.module.css"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "../PostItem";

const PostList = ({posts, title, remove, update}) => {

    if (!posts.length) {
        return (
        <h1 className={cl.postlist__title}>
            Posts not found!
        </h1>
        )
    }

    // let number = 0;

    return (
        <div>
            <h1 className={cl.postlist__title}>
                {title}
            </h1>
            <TransitionGroup className={cl.postlist}>
                {posts.map((post, index) => {
                    return <CSSTransition
                        key={index}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem remove={remove} update={update} number={post.id} post={post} />
                    </CSSTransition>
                }
                )}
            </TransitionGroup>
            
        </div>
    );
};

export default PostList;