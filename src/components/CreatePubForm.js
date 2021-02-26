import React, { useRef, useState, useEffect } from 'react'
import {
  Button,
  Form,
  Header,
  Message
} from 'semantic-ui-react'
import {history} from '../helpers/history'
import {api} from '../helpers/api'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import {authenticationService, authAxios} from '../services'
import 'react-markdown-editor-lite/lib/index.css';
import { Redirect } from 'react-router-dom'



const mdParser = new MarkdownIt(/* Markdown-it options */);

const CreatePubForm = () => {
    const [isWriter, setIsWriter] = useState(true)
    const [choiceSections, setChoiceSections] = useState()
    const [title, setTitle] = useState('')
    const [section, setSection] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [thumbnail, setThumbnail] = useState('')
    const fileInputRef = useRef()


    async function fetchData() {
        setLoading(true);
        try {
            const res = await authAxios.get(`${api.pub.base}createpub/`);
            setChoiceSections(res.data.results[0].available_sections)
            setIsWriter(res.data.results[0].is_writer)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        } 
      }

    useEffect(() => {
        if(authenticationService.isAuthenticated){
          fetchData()
        }
    }, [])  

    function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData()
        formData.append('thumbnail', thumbnail)
        formData.append('title', title)
        formData.append('content', content)
        formData.append('section', section)
        authAxios.post(api.pub.list, formData, {
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

    function handleEditorChange({html, text}) { 
        setContent(text)  
      }

    if (isWriter === false){
        return <Redirect to='/'/>
    }

    return(
        <div>
            <Header as='h2'>Create Publication Form</Header>
            {error && 
            <Message negative>
                <Message.Header>There was some errors with your submission</Message.Header>
                {error.message}
                </Message>}
            <div style={{textAlign: 'left'}}>
                <Form onSubmit={handleFormSubmit}>
                <Form.Field value={section} onChange={e=> setSection(e.target.value)} label='Section' control='select'>
                    <option value=''>---</option>
                    {choiceSections && choiceSections.map(x => <option key={x} value={x}>{x}</option> )}
                </Form.Field>
                <Form.Field>
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                <label>Content</label>
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                        />
                </Form.Field>
                <Form.Field>
                    {thumbnail?<input disabled value={thumbnail.name}/>:''}
                    <Button type='button'onClick={() => fileInputRef.current.click()} content='Upload a thumbnail' labelPosition='left' icon='image'/>
                    <input onChange={e => setThumbnail(e.target.files[0])}ref={fileInputRef} type='file' hidden />
                </Form.Field>
                <Button primary loading={loading} disabled={loading} fluid type='submit'>Submit</Button>
                </Form>
        </div>   
    </div>
    )
}

export default CreatePubForm
