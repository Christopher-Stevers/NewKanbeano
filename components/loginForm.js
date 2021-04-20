
import React from 'react'
import { useState } from 'react'
export default function LoginForm() {
   const [name, updateName]=useState("")
    const logger=(e)=>{
        e.preventDefault()
        console.log(name)
    }
    const grabName=(e)=>{
    updateName(e.target.value)
    }

    return(<div><span>Please Enter your username</span><form><input onChange={grabName} type="string"></input><input type="submit" onClick={logger}></input></form></div>)
}