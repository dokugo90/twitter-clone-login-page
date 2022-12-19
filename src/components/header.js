import React, { useState, useRef, useEffect } from "react"; 

export default function Header(props) {
    function CreateName() {
        this.date = new Date().getSeconds();
        this.len = props.username.length;
    }

    let dateTime = new CreateName().date;
    let userLength = new CreateName().len;

    return (
        <>
        <h1 className="text">{props.username} / {userLength}</h1>
        </>
    )
}