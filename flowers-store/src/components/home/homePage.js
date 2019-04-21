import React, { Component } from 'react'
import Auth from '../../utils/auth'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class HomePage extends Component {
  render () {
    const isAdmin = Auth.isUserAdmin()
    const isAuthenticated = Auth.isUserAuthenticated()

    let headingText, secondLinkName, secondLinkPath
    if (isAdmin) {
      headingText = ', ' + Auth.getUsername()
      secondLinkName = 'View pending orders'
      secondLinkPath = '/admin/orders'
    } else if (isAuthenticated) {
      headingText = ', ' + Auth.getUsername()
      secondLinkName = 'View your orders'
      secondLinkPath = '/orders'
    } else {
      headingText = ''
      secondLinkName = 'Register'
      secondLinkPath = '/register'
    }
  
      return (
        <div className='welcome-wrapper'>
            <div className='welcome'>
              <h1>Welcome to the Flowerstore{headingText} !</h1>
              {!isAuthenticated && <p>Your favourite flowers are here. Register now and choose from our store.</p>}
              <p>
              <Link to='/store' className='welcome'>Go To Store</Link>
               <Link to={secondLinkPath}>{secondLinkName}</Link>
              </p>
            </div>
        </div>
      )
    }
}

function mapStateToProps (state) {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(HomePage)