import React, { useState } from "react";

function Practice(){

    const [formData, setFormData] = useState({
        name:"", 
        age:""
    });

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log("form submitted", formData)
        setFormData({
            name:"",
            age:"",
        })
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="enter" value={formData.name} name="name" onChange={handleChange}/>
                <input type="text" placeholder="enter age" value={formData.age} name="age" onChange={handleChange}/>
                <button type="submit">Submitt!!</button>
            </form>
        </>
    )
}


export default Practice;