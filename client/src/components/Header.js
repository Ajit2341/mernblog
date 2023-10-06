import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../Context/UserContext'

export default function Header() {

  // const [userName, setUserName] = useState(null);
  const{setuserInfo, userInfo} = useContext(userContext);

  const userName = userInfo?.userName;

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json()
        .then(userInfo => {
        //  setUserName(userInfo.userName)
        setuserInfo(userInfo)
        })
    })

  },[])



  function logout(){

    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST'
    })
   // setUserName(null)
   setuserInfo(null)

  }

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {userName && (
          <>
          <span>Hello, {userName}</span>
            <Link to='/create'>Create New Post</Link>
            <a onClick={logout}> Logout </a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </nav>
    </header>
  )

}