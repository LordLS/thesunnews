import React, { useState, useEffect } from 'react'
import {authAxios, authenticationService} from '../services'
import { Card, Icon, Placeholder} from 'semantic-ui-react'
import {api} from '../helpers/api'
import { Redirect } from 'react-router-dom'
import {Message } from 'semantic-ui-react'


const UserProfile = () => {
    const [user, setUser] = useState()
    const [error, setError] = useState()

    async function fetchData() {
        try {
            await authAxios.get(api.auth.profile)
            .then(res => setUser(res.data.results[0]))
        } catch (err) {
            setError(err.message)
        } 
      };
    
  useEffect(() => {
      if(authenticationService.isAuthenticated){
        fetchData();
      }
  }, [])

  if (authenticationService.isAuthenticated === false) {
    return <Redirect to='/'/>
}
  return (
    <div style={{textAlign: 'left'}}>
        <h2>My Profile</h2>
        <Card>
            {user ?
            <>
            <Card.Content>
            <Card.Header>{user.email}</Card.Header>
            <Card.Meta>
                <span className='date'> Status:
                    {user.is_reader && (
                        <> Reader <Icon name='check' /> </>
                    )}
                    {user.is_writer && (
                        <> Writer <Icon name='check' /> </>)}
                    {user.is_moderator && (
                        <>Moderator <Icon name='check' /> </>
                    )}
                    {user.is_coordinator && (
                        <>Coordinator <Icon name='check' /> </>
                    )}
                </span>
                    </Card.Meta>
                     </Card.Content>
                        <Card.Content extra>
                <Icon name='user' />
                Active
            </Card.Content>
            </>
        :
        <Placeholder>
        <Card.Content>
            <Card.Header><Placeholder.Line/></Card.Header>
            <Card.Meta>
                <Placeholder.Line/>
                <Placeholder.Line/>
                    </Card.Meta>
                     </Card.Content>
                        <Card.Content extra>
                <Placeholder.Line/>
            </Card.Content>
        </Placeholder> 
        }
  </Card>

  {error && <Message negative> {error} </Message>}
  </div>
  )
}

export default UserProfile