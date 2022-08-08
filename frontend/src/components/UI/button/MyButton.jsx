import React from "react";
import classes from './MyButton.module.css'
import cx from 'classnames';

const MyButton = ({light = false, children, ...props}) => {
    return (
        <button {...props} className={cx(classes.myBtn, props.className, light && classes.myBtn_light)}>
            {children}
        </button>
    );
};

export default MyButton;