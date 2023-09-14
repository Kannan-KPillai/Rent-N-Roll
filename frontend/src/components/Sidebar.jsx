import {FaBars, FaTh, FaUserAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import '../App.css'



const Sidebar = ({children}) => {

    const menuItem = [
      {
        path:'/admin/home',
        name:'Users',
        icon:<FaUserAlt/>
      },
      {
        path:'/admin/owner',
        name:'Owners',
        icon: <FaUserAlt/>
      },
      {
        path:'/admi',
        name:'Dashboard',
        icon:<FaTh/>
      },
      {
        path:'/admin/category',
        name: 'Category',
        icon: <FaTh/>
      }
]
  return (
  <div className='container1'>
    <div  className='sidebar'>
        <div className="top_section">
            <h1  className='logo'>ADMIN</h1>
            
        </div>
        {
            menuItem.map((item, index)=>(
                <NavLink to={item.path} key={index} className='link' activeclassName='active' >
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">{item.name}</div>
                </NavLink>
            ))
        }
    </div>
    <main>{children}</main>
  </div>
  )
}

export default Sidebar
