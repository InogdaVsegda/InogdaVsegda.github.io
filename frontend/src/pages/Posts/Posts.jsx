import React, { useEffect, useState } from "react";
import cl from "./Posts.module.css"
import PostList from "../../components/PostList/PostList";
import PostForm from "../../components/PostForm";
import PostFilter from "../../components/PostFilter/PostFilter";
import MyModal from "../../components/UI/MyModal/MyModal";
import MyButton from "../../components/UI/button/MyButton";
import { usePaginatedPosts, usePosts } from "../../hooks/usePosts";
import PostService from "../../API/PostService";
import Loader from "../../components/UI/loader/Loader";
import { useFetching } from "../../hooks/useFetching";
import { getPageCount } from "../../utils/pages";
import Pagination from "../../components/UI/pagination/Pagination";
 
function Posts() {
  const [posts, setPosts] = useState([])
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const paginatedResults = usePaginatedPosts(sortedAndSearchedPosts, page, limit);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit = 10, page = 1) => {
    const response = await PostService.getAll(limit, page);

    setPosts([...posts, ...response]);

    setTotalPages(getPageCount(response.length, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    
  }, [page, limit])

  const createPost = async (newPost) => {
    const response = await PostService.createPost(newPost);
    setPosts([...posts, newPost])
    setModal(false)
    return response;
  }

  const removePost = async (postId) => {
    const response = await PostService.deletePost(postId);
    setPosts(posts.filter(post => post.id !== postId));
    return response;
  };

  const updatePost = async (newTitle, newBody, postId) => {
    
    const response = await PostService.updatePost({ title: newTitle, body: newBody, id: postId });
    return response;
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton light className={cl.create__btn} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm action={createPost} actionName="Create post"/>
      </MyModal>
      
      {/* <hr style={{margin: '15px 0'}}/> */}
      <PostFilter
        filter={filter}
        setFilter={setFilter}
        limit={limit}
        setLimit={setLimit}
      />
      

      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }

      <PostList remove={removePost} update={updatePost} posts={paginatedResults} title={'All popular articles'}/>

      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
      }
        
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
} 

export default Posts;