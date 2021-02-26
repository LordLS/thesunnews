import 'antd/dist/antd.css'
import React, {useEffect, useState} from 'react';
import {Header,Item, Icon, Button, Placeholder} from 'semantic-ui-react'
import Message from '../components/Message'
import {useParams, NavLink} from 'react-router-dom'
import {api} from '../helpers/api'
import ReactMarkdown from 'react-markdown'
import {history} from '../helpers/history'
import DeleteModal from '../components/DeleteModal'
import {authAxios, authenticationService} from '../services'
import axios from 'axios'

const PubDetail = () => {
  const [publication, setPub] = useState()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  
  async function fetchData() {
    try {
      let ax = axios
      if(authenticationService.isAuthenticated){
          ax = authAxios
        }
        const res = await ax.get(`${api.pub.list}${params['pubid']}/`);
        setPub(res.data);
        setLoading(false)
    } catch (err) {
        setError(err.message)
        setLoading(false)
    } 
  }

  useEffect(() => {
    fetchData();
  }, [])

  // for more readability
  const get_date = () => {
    let d = new Date(publication.date_time_posted)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
      `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
    )
  }

  function handleDeleteButton() {
    if (authenticationService.isAuthenticated){
        authAxios.delete(`${api.pub.list}${params['pubid']}/`).then(res => {
          history.push('/')
        }).catch(err => {
          console.log(err)
          setError(err.message)
    })  
    }
  }

  return(
      <div style={{textAlign: 'left'}}>
      {loading &&
      <>
        <Item>
          <Placeholder>
        <Placeholder.Line length='full' />
        <Item.Extra> <Placeholder.Line length='short' /></Item.Extra>
                <Item.Extra> <Placeholder.Line /> </Item.Extra>
            <Placeholder.Image rectangular/>
            <Item.Content>
            <Item.Description>
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
            <Placeholder.Line length='full' />
              </Item.Description>
            </Item.Content>
            </Placeholder>
        </Item>
        </>
      }


  
      {publication && (
        <div>
        <div>
          <Item >
          <Header size='huge'>{publication.title}</Header>
          <Item.Extra><Icon name='calendar outline'/>{get_date()}  </Item.Extra>
                  <Item.Extra>Writer(s): {publication.writer.map(x => {
                    return (
                      `${x}   `
                    )
                  })} </Item.Extra>
          <Item.Image size="large" src={publication.thumbnail} />
              <Item.Content>
              <Item.Description>
              <ReactMarkdown source={publication.content}/>
                </Item.Description>
                  
              </Item.Content>
          </Item>
        </div>
        {publication.is_author &&
          <>
            <NavLink to={`/${params['pubsection']}/${params['pubid']}/update`}><Button>Update </Button></NavLink>
            <DeleteModal func={handleDeleteButton}/>
          </>
        }
      </div>       
      )
      }

      
      {error && <Message negative message={error}/>}
      </div>
  )
}
export default PubDetail;