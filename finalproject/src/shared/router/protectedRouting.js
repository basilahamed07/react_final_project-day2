import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRouting = ({Component}) => {
      
    const nav = useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem("user")){
           nav("/login");
        }
    },[])
    useEffect(()=>{
        if(!sessionStorage.getItem("admin")){
           nav("/adminlogin");
        }
    },[])
   
    return (
        <div>
            <Component></Component>
           
        </div>
    )
}

export default ProtectedRouting