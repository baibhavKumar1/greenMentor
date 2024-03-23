import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Tasks from '../Pages/Tasks'
import Profile from '../Pages/Profile'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/tasks' element={<Tasks/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes