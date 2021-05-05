import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/NavMenu.module.css'
import MenuIcon from '@material-ui/icons/Menu'

export default class NavMenu extends Component {
  render() {
    return <>
      <nav className={style.NavMenu}>
        <label htmlFor={style.expandNav} className={style.menuButton}><MenuIcon/></label>
        <div className={style.logo}><Link to="/">Faktury</Link></div>
        <input type="checkbox" id={style.expandNav}/>
        <ol>
          <li><Link to="/">Main</Link></li>
          <li><Link to="#">nav1</Link></li>
          <li><Link to="#">nav2</Link></li>
          <li><Link to="#">nav3</Link></li>
          <li><Link to="#">nav4</Link></li>
        </ol>
      </nav>
      <div style={{paddingBottom: '3.5rem'}}></div>
    </>
  }
}
