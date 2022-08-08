import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyModal from "./UI/MyModal/MyModal";
import { useNavigate } from "react-router-dom";
import PostForm from "./PostForm";

const PostItem = (props) => {
    const router = useNavigate()
    const [modal, setModal] = useState(false)

    const { post, remove, update } = props;

    return (
    <div className="post">
        <div className="post__content">
          <strong>{post.title}</strong>
          <div>
          {post.body}
          </div>
        </div>
        <div className="post__btns">
          <MyButton onClick={() => router(`/posts/${post.id}`)}>
            Open
          </MyButton>
          <MyButton onClick={() => remove(post.id)}>
            Delete
          </MyButton>
          <MyButton onClick={() => setModal(true)}>
            Update
          </MyButton>

          <MyModal visible={modal} setVisible={setModal}>
            {/* {post.id} */}
            <PostForm
              title={post.title}
              body={post.body}
              action={async (title, body) => {
                await update(title, body, post.id)
              }}
              actionName="Update"
            />
          </MyModal>
        </div>
    </div>
    );
};

export default PostItem;