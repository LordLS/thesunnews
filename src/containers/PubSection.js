import 'antd/dist/antd.css'
import React, {useEffect, useState} from 'react'
import {Header, Message, Button, Icon, Placeholder, Divider} from 'semantic-ui-react'
import axios from 'axios'
import {authenticationService, authAxios} from '../services'
import {useParams} from 'react-router-dom'
import ListPub from '../components/ListPub'
import {api} from '../helpers/api'
import {history} from '../helpers/history'


const PubSection = () => {
  const [publication, setPub] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [buttonActive, setButtonActive] = useState(false)
  const [IconSubName, setIconSubName] = useState('')
  const params = useParams()
  const paramsSection = params['pubsection']

  const setSubscriptionIcon = (res) => {
    if (res.data.results.length !== 0) {
        setPub(res.data.results)
        setIsSubscribed(res.data.results[0].is_subscribed)
        if (res.data.results[0].is_subscribed) {
            setIconSubName('close')
        } else {
            setIconSubName('signup')
        }
    } else {
        setPub(null)
    }   
  }

  async function fetchData() {
    setLoading(true);
    try {
        let ax = axios
        if (authenticationService.isAuthenticated){
            ax = authAxios
        }
        const res = await ax.get(`${api.pub.base}${params['pubsection']}/`);
        setSubscriptionIcon(res)
        setLoading(false)
    } catch (err) {
        console.log(err.message)
        setError(err.message)
        setLoading(false)
    } 
  }

  useEffect(() => {
        fetchData()
    }, [paramsSection])
  
    function handleSubscription() {
        if (authenticationService.isAuthenticated) {
            if (publication[0].is_subscribed) {
                authAxios.delete(`${api.pub.base}subscription/${isSubscribed}`)
                .then(res => {
                    setButtonActive(true)
                    setIconSubName('window minimize')
                }).catch(err => {
                    console.log(err)
                    setError(err.message)})    
            } else {
                authAxios.post(`${api.pub.base}createSubscription/`, 
                {
                    "column": params['pubsection'],
                }
                ).then(res => {
                    setButtonActive(true)
                    setIconSubName('checkmark')
                }).catch(err => {
                    console.log(err)
                    setError(err.message)
                })}
        } else {
            history.push('/login')
            window.location.reload(false)
        }
    }

  return(
    <div>
        
        <Header as='h1'> {params['pubsection']} 
            {publication && (
                <Button disabled={buttonActive} onClick={handleSubscription}>
                    <Button.Content visible>
                        <Icon name={IconSubName} />
                    </Button.Content>
                </Button> 
                )} 
        </Header>
            {publication ?
            <ListPub publications={publication}/> : 
            loading ? 
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
            </>:
            (<Message>No publications available at the moment... Please try again later</Message>)
            }
      {error && <Message negative> {error} </Message>}
     </div>
  )
}
export default PubSection;