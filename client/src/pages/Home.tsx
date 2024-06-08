import { useTypeDispatch, useTypeSelector } from '../hooks/reduxHooks'
import { logout } from '../redux/actions/userActions'

const Home = () => {

  const { user } = useTypeSelector((state) => state.user)
  const dispatch = useTypeDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-serif '>Welcome User : {user?.username}</h1>
      <button onClick={handleLogout} className='border bg-red-500 text-white font-semibold px-4 py-2 rounded-md transform duration-300 hover:opacity-85'>Logout</button>
    </div>
  )
}

export default Home