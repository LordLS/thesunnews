import React, {useEffect, useState} from 'react'
import {
    Container,
    Menu,
    Icon,
    Dropdown,
    Message
  } from 'semantic-ui-react';
import {authAxios, authenticationService} from '../services'
import {NavLink} from 'react-router-dom';
import {api} from '../helpers/api'
import {ProfileMenu} from '../components/DropdownMenu'
import { useMediaQuery } from 'react-responsive'


const Navbar = () => {
    const [user, setUser] = useState('')
    const [error, setError] = useState(null)
    const loginOut = () => {
        authenticationService.logout()
        window.location.reload(false)
    }
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    
    async function fetchData() {
      if(authenticationService.isAuthenticated){
      try {
          const res = await authAxios.get(api.auth.profile);
          setUser(res.data.results[0]);
      } catch (err) {
          setError(err.message)
      } }
    }

    useEffect(() => {
      if (authenticationService.isAuthenticated) {
        fetchData();
      }
    }, [])



    return (
    <div>
        <Menu fixed='top' inverted>
        <Container>
            <Menu.Item as={NavLink} to='/' header>
            The Sun News
            </Menu.Item>
            {isTabletOrMobile ? 
            <> 
                <Dropdown icon='bars' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to='/Sport'>Sport</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to='/World'>World</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to='/Business'>Business</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to='/Health'>Health</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to='/Politic'>Politic</Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
            
            </>
            
            :
            <>
            <Menu.Item as={NavLink} to='/Sport'>Sport</Menu.Item>
            <Menu.Item as={NavLink} to='/World'>World</Menu.Item>
            <Menu.Item as={NavLink} to='/Business'>Business</Menu.Item>
            </> }
            

            <Menu.Menu position='right'>
            {authenticationService.isAuthenticated ?
            <>
            
              <Menu.Item as={NavLink} to='/feed'>Feed</Menu.Item>
                <Dropdown text=' Profile ' icon='user outline' pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to='/userprofile' >My Profile</Dropdown.Item>
                    <Dropdown.Item onClick={loginOut} as='a'>Log out</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>Options</Dropdown.Header>
                    {user.is_writer && ProfileMenu.writer}
                  </Dropdown.Menu>
                  </Dropdown>
                  
            </>
            :
            <>
            <NavLink to='/login/'><Menu.Item as='li'><Icon name='user outline'/> Login </Menu.Item></NavLink>
            </>
            }
            </Menu.Menu>      
        </Container>
        </Menu>
        {error && <Message negative message={error.message}/>}
    </div>
)}

export default Navbar;