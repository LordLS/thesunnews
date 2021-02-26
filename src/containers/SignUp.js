import React, {useState} from 'react'
import { Button, Form, Header, Segment, Message } from 'semantic-ui-react'
import { history } from '../helpers'
import { authenticationService } from '../services'
import { Redirect } from 'react-router-dom'





const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfPassword] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        authenticationService.signup(username, email, password, confirmPassword)
        .then(res => {
            console.log(res.data)
                history.push('/')
                window.location.reload(false)
                
            }).catch(err => {
                console.log(err.message)
                setError(err.message)
            })
    }

    if (authenticationService.isAuthenticated) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <Header color='blue' as='h1'>Sign up form</Header>
            {error && <Message color='red'> {error} </Message> }
        <Form onSubmit={handleSubmit}>
        <Segment stacked>
        <Form.Input  
            onChange={e => setUsername(e.target.value)} 
            fluid icon='user' 
            iconPosition='left' 
            placeholder='Username' 
            value={username} />

          <Form.Input  
            onChange={e => setEmail(e.target.value)} 
            type='email'
            fluid icon='at' 
            iconPosition='left' 
            placeholder='E-mail' 
            value={email} />

          <Form.Input
            onChange={e => setPassword(e.target.value)}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={password}
          />
          <Form.Input
            onChange={e => setConfPassword(e.target.value)}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Confirm password'
            type='password'
            value={confirmPassword}
          />

          <Button color='blue' fluid size='large'>
            Sign up
          </Button>
        </Segment>

      </Form>
      </div>
    )
    }

export default SignUp