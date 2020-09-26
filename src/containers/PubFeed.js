import React, {useEffect, useState} from 'react'
import {Header, Message, Placeholder, Divider} from 'semantic-ui-react'
import {authenticationService, authAxios} from '../services'

import { Redirect } from 'react-router-dom'
import {api} from '../helpers/api'

import ListPub from '../components/ListPub'


const PubFeed = () => {
  const [publication, setPub] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchData() {
    setLoading(true);
    try {
        const res = await authAxios.get(`${api.pub.base}feed/`);
        if (res.data.results.length !== 0) {
          setPub(res.data.results);
        }
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
  
  if (authenticationService.isAuthenticated === false){
    return <Redirect to='/' />
  }  
  return(
    
    <div>
      <Header as='h1'> Feed </Header>
      {publication ? <ListPub publications={publication}/> 
      :loading ? 
      <>
      <Placeholder style={{ height: 150, width: 150 }}>
      <Placeholder.Image />
      <Placeholder.Line length='full' />
      </Placeholder>
      <Divider />
      <Placeholder style={{ height: 150, width: 150 }}>
      <Placeholder.Image />
      <Placeholder.Line length='full' />
      </Placeholder>
      <Divider />
      <Placeholder style={{ height: 150, width: 150 }}>
      <Placeholder.Image />
      <Placeholder.Line length='full' />
      </Placeholder>
      <Divider />
      </>
      :
       <Message>Subscribe to your favorite columns to show their publications on your feed. </Message>}
      
      {error && <Message negative> {error} </Message>}
     </div>
  )
}
export default PubFeed;