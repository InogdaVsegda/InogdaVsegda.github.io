import cx from "classnames";
import React from "react";
import classes from './MyInput.module.css'

const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} {...props} className={cx (classes.MyInput, props.className)} />
    );
});

export default MyInput;