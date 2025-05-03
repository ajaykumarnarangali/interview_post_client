import { Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import Signup from './page/Signup'
import Signin from './page/Signin'
import ProtectedRoute from './component/ProtectedRoute'
import Home from './page/Home';
import Addpost from './page/Addpost'
import Userposts from './page/Userposts'
import Editpost from './page/Editpost'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path='/user-posts' element={<Userposts />} />
          <Route path='/add-post' element={<Addpost />} />
          <Route path='/edit-post/:id' element={<Editpost />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  )
}

export default App
