import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-blue-500",
    textColor = "text-white",
    className = "",
    ...props // for passing additional props
}){
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} type={type} {...props}>
            {children}
        </button>
    );
}

export default Button