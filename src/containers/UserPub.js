import 'antd/dist/antd.css'
import React, {useEffect, useState} from 'react'
import {Header, Message } from 'semantic-ui-react'
import {authenticationService, authAxios} from '../services'
import {api} from '../helpers/api'
import {Redirect} from 'react-router-dom'
import ListPub from '../components/ListPub'
import Loading from '../components/Loading'


const PubSection = () => {
  const [publication, setPub] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchData() {
    setLoading(true);
    try {
        const res = await authAxios.get(`${api.pub.base}myPublication/`);
        setPub(res.data.results);
        setLoading(false)
    } catch (err) {
        setError(err.message)
        setLoading(false)
    } 
  }

  useEffect(() => {
      
      if (authenticationService.isAuthenticated){
        fetchData()
      }
    }, [])

    if (authenticationService.isAuthenticated ===false){
        return <Redirect to='/login'/>
      }
  
  return(
    <div>
      <Header as='h1'>My Publications</Header>
      <Loading loading={loading}>
      {publication ? <ListPub publications={publication} /> : <Message>You have no publications</Message>}
      </Loading>

 
      {error && <Message negative message={error}/>}
      
      
     </div>
  )
}
export default PubSection;