'use client'

import { useState } from "react";

export function Button(){
    const [count, setCount] = useState(0);

    function handleClick(){
        setCount(count + 1);
    }

    return (
        <div>
            <button onClick={handleClick}>Count = {count}</button>
        </div>
    );
}