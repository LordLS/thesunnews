import React, {useRef, useState} from 'react'
import {
  Button,
  Checkbox,
  Form,
  Header,
  Image,
} from 'semantic-ui-react'
import {history} from '../helpers'
import {api} from '../helpers/api'
import Message from '../components/Message'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import {useParams} from 'react-router-dom'
import 'react-markdown-editor-lite/lib/index.css';
import {authAxios} from '../services'

const mdParser = new MarkdownIt(/* Markdown-it options */);

const UpdatePubForm = ({data}) => {
    const [title, setTitle] = useState(data.title)
    const [section, setSection] = useState(data.section)
    const [content, setContent] = useState(data.content)
    const currentThumb = data.thumbnail
    const [thumbnail, setThumbnail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    const fileInputRef = useRef()
    const params = useParams()

    function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData()
        if (thumbnail) {
            formData.append('thumbnail', thumbnail)
        }
        formData.append('title', title)
        formData.append('content', content)
        formData.append('section', section)
        authAxios
        .put(`${api.pub.list}${params['pubid']}/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }}).then(res => {
                setLoading(true)
                history.push(`/${section}/${params['pubid']}`)
                window.location.reload(false)
            }).catch(err => {
                console.log(err)
                setError(err)
            })
    }

    function handleEditorChange({html, text}) { 
        setContent(text)  
      }

    return(
        <div>
            <Header as='h2'>Update Publication Form</Header>
            {currentThumb && <Image src={currentThumb} />}
            <div style={{textAlign: 'left'}}>
                <Form onSubmit={handleFormSubmit}>
                <Form.Field value={section} onChange={e=> setSection(e.target.value)} label='Section' control='select'>
                    <option value=''>---</option>
                    <option value='Business'>Business</option>
                    <option value='Sports'>Sports</option>
                    <option value='World'>World</option>
                </Form.Field>
                <Form.Field>
                    <label>Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' />
                </Form.Field>
                <Form.Field>
                <label>Content</label>
                <MdEditor
                    value={content}
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                        />
                </Form.Field>
                <Form.Field>
                    {<input disabled value={thumbnail.name}/>}
                    <Button type='button'onClick={() => fileInputRef.current.click()} content='Upload a thumbnail' labelPosition='left' icon='image'/>
                    <input onChange={e => setThumbnail(e.target.files[0])}ref={fileInputRef} type='file' hidden />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                {error && <Message color='red' message={error.message} />}
                <Button primary loading={loading} disabled={loading} fluid type='submit'>Submit</Button>
                </Form>
        </div>  
    </div>
    )
}

export default UpdatePubForm
