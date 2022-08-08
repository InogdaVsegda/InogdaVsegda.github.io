import React, { useEffect, useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({
  title,
  body,
  action,
  actionName
}) => {
  const [localTitle, setLocalTitle] = useState('');
  const [localBody, setLocalBody] = useState('');

  useEffect(() => {
    setLocalTitle(title)
    setLocalBody(body)
  }, [])

  return (
      <div>
        <MyInput 
          value={localTitle}
          onChange={e => setLocalTitle(e.target.value)}
          type="text" 
          placeholder="Title"/>
        <MyInput 
          value={localBody}
          onChange={e => setLocalBody(e.target.value)}
          type="text" 
          placeholder="Description"/>
        <MyButton onClick={() => {
          
          action(localTitle, localBody)
        }}>{actionName}</MyButton>
      </div>
  );
};

export default PostForm;