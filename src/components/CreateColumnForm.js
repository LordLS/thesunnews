import React, {useState } from 'react'
import {
  Button,
  Form,
  Header,
} from 'semantic-ui-react'
import {authAxios} from '../services'
import {history} from '../helpers/history'
import {api} from '../helpers/api'
import Message from '../components/Message'



const CreateColumnForm = () => {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    function handleFormSubmit(e) {
        e.preventDefault();
        authAxios.post(api.pub.list, {
            headers: {
                "Content-Type": "multipart/form-data"
            }}).then(res => {
                setLoading(true)
                history.push('/')
                window.location.reload(false)
                console.log(res)
            }).catch(err => {
                console.log(err)
                setError(err)
            })
    }

    return(
        <div>
            <Header as='h2'>Create Column Form</Header>
            {error && <Message danger message={error.message} />}
            <div style={{textAlign: 'left'}}>
                <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <label>Column Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
                </Form.Field>
                <Button primary loading={loading} disabled={loading} fluid type='submit'>Submit</Button>
                </Form>
        </div>       
    </div>
    )
}



export default CreateColumnForm
