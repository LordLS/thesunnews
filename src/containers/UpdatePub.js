import React, {useEffect, useState} from 'react';
import {authAxios} from '../services'
import Message from '../components/Message'
import UpdatePubForm from '../components/UpdatePubForm';
import {api} from '../helpers/api'
import {useParams, Redirect} from 'react-router-dom'



const UpdatePub = () => {
    const [publication, setPub] = useState()
    const [error, setError] = useState(null)
    const params = useParams()

  useEffect(() => {
    async function fetchData() {
      try {
          const res = await authAxios.get(`${api.pub.list}${params['pubid']}/`);
          setPub(res.data);
      } catch (err) {
          setError(err.message)
      } 
      console.log()
    }
    fetchData();
  }, [])

  if (publication){
    if (publication.is_author === false){
      return <Redirect to='/'/>
    }
  }
  
  return(
    <div>
        {error && <Message negative> {error} </Message>}
        {publication && <UpdatePubForm data={publication}/>}
      </div>

  )
    
}
export default UpdatePub;