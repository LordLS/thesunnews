import React, {useState} from 'react'
import { Button, Form, Grid, Header, Message, Segment, Icon, Input} from 'semantic-ui-react'
import { history } from '../helpers'
import { authenticationService } from '../services'
import { Redirect, NavLink } from 'react-router-dom'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        authenticationService.login(email, password)
        .then(res => {
            console.log(res.data)
                setLoading(true)
                history.push('/')
                window.location.reload(false)
                
            }).catch(err => {
                console.log(err.message)
                setError(err.message)
                setLoading(false)
            })
    }

    if (authenticationService.isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
      <Grid textAlign='center' style={{ height: '100vh' }}>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
          Log-in
          </Header>
          {error && <Message negative>
            The email or password you have entered isn't valid. Please check your credentials and try again.
             <p>{error}</p> 
             </Message> }
          <Form onSubmit={handleSubmit} size='large'>
            <Segment stacked>
              <Form.Input type='email' onChange={e => setEmail(e.target.value)} fluid icon='user' iconPosition='left' placeholder='E-mail address' value={email} />
              <Form.Input
                control={Input}
                onChange={e => setPassword(e.target.value)}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={password}
              />

              <Button loading={loading} disabled={loading} color='blue' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <NavLink to='/signup/'> <Icon name='signup' />Sign Up</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    )
    }

export default Login