import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('Token')) {
            setIsAuthenticated(true);
            if(location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
                navigate("/", {replace: false})
            }
        }
    } ,[location.pathname, navigate, setIsAuthenticated])

  return (
   null
  )
}

export default RefreshHandler