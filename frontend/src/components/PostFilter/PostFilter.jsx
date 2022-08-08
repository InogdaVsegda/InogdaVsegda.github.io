import React from "react";
import cl from "./PostFilter.module.css"
import MyInput from "../UI/input/MyInput";
import MySelect from "../UI/select/MySelect";

const PostFilter = ({filter, setFilter, limit, setLimit}) => {
    return (
        <div>
            <MyInput
            className={cl.postfilter__search}
            value={filter.query}
            onChange={e => setFilter({...filter, query: e.target.value})}
            placeholder="Search..."
            />
            <MySelect
            value={filter.sort}
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            defaultValue="Sort by"
            options={[
                {value: 'title', name: 'Name'},
                {value: 'body', name: 'Description'}
            ]}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(Number(value))}
                defaultValue="Number of elements per page"
                options={[
                {value:5, name: '5'},
                {value:10, name: '10'},
                {value:25, name: '25'},
                {value:-1, name: 'Show all'},
                ]}
            />
        </div>
    )
}

export default PostFilter;