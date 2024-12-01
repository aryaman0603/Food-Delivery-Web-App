import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const Sidebar = () => {

    const [color,setColor] = useState("");

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' onClick={()=>setColor("Add Items")} className={color==="Add Items"?"sidebar-active":"sidebar-option"}>
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' onClick={()=>setColor("List Items")} className={color==="List Items"?"sidebar-active":"sidebar-option"}>
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' onClick={()=>setColor("Orders")} className={color==="Orders"?"sidebar-active":"sidebar-option"}>
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar