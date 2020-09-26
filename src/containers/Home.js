import 'antd/dist/antd.css'
import React, {useEffect, useState} from 'react'
import {Header, Item, Divider, Icon, Grid, GridColumn, Message, Placeholder} from 'semantic-ui-react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {api} from '../helpers/api'
import {parseIsoTimetoString} from '../helpers/timeConverter'



const PubHome = () => {
  const [publication, setPub] = useState()
  const [error, setError] = useState(null)
  const [todayDate, setTodayDate] = useState(new Date().toUTCString())

  function getTodayDate() {
    setTodayDate(new Date().toUTCString()) 
}

async function fetchData() {
    try {
        const res = await axios.get(api.pub.list);
        setPub(res.data.results);
    } catch (err) {
        setError(err.message)
    } 
  }

  useEffect(() => {
      
      fetchData();
    //   Update Date display on Home Page
      setInterval(getTodayDate, 1000)
    }, [])

    const filter_obj_section =(objlist, section) => {
        return objlist.filter(function(a) {
            return a.section === section 
        })
        
    }   

    const row_content = (pubList, section) => {
            return (
                filter_obj_section(pubList, section).slice(0, 3).map(x => {
                return(
                    <Grid.Column key={x.id} width={5}>
                        <Item >
                        <NavLink to={`/${x.section}/${x.id}`}><Item.Image size="small" src={x.thumbnail} />
                                <Item.Content>
                               <Item.Header as='h2'>{x.title}</Item.Header>
                                </Item.Content></NavLink>
                                <Item.Extra><Icon name='time'/> : {parseIsoTimetoString(x.date_time_posted)} | {x.section}</Item.Extra>

                        </Item>
                    </Grid.Column>
                )   
                }))

    }

    const PlaceholderForSectionRow = () => {
        let content = []
        for(let i = 0; i < 3; i++){
            content.push(
                <Grid.Column key={i} width={5}>
                        <Item >
                        <Placeholder>
                            <Placeholder.Image square />
                                <Placeholder.Header>
                                <Placeholder.Line length='short' />
                                </Placeholder.Header>
                                <Placeholder.Line length='short' />    
                                </Placeholder>
                        </Item>
                    </Grid.Column>
            )
        }
        return content.map(x => x)
    }

    

    
    
  return(
    <div style={{ textAlign: 'left'}}>
        <Grid>
            <Grid.Row columns='equal'>
                <GridColumn >
                    <Header disabled>Welcome to The Sun News .com</Header>
                    </GridColumn>
                    <GridColumn>
                    <Header disabled>{todayDate}</Header>
                    </GridColumn>
            </Grid.Row>
            {error && <Message negative> {error} </Message>}
      

            <Grid.Row>
                <Grid.Column width={3}>
                    <Header as='h2'>News </Header>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Divider />
                </Grid.Column>
                {publication && publication.length > 0 ?
                    publication.slice(0,2).map(x => {
                        return(
                            <Grid.Column width={8} key={x.id}>
                                <Item>
                                <NavLink to={`/${x.section}/${x.id}`}><Item.Image size="large" src={x.thumbnail} />
                                    <Item.Content>
                                        <Item.Header as='h2'>{x.title}</Item.Header> 
                                    </Item.Content></NavLink>
                                    <Item.Extra><Icon name='time'/> : {parseIsoTimetoString(x.date_time_posted)} | {x.section}</Item.Extra>
                                </Item>
                            </Grid.Column>
                        )
                    })
                :
                <p>No Highlights at the moment ...</p>
                }
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Header as='h2'>Sport</Header>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Divider />
                </Grid.Column>
            {publication && publication.length > 0 ? row_content(publication, 'Sport') : <PlaceholderForSectionRow />}
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                    <Header as='h2'>Business </Header>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Divider />
                </Grid.Column>
                {publication && publication.length > 0 ? row_content(publication, 'Business'): <PlaceholderForSectionRow />}
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={3}>
                        <Header as='h2'>World </Header>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Divider />
                    </Grid.Column>
                    {publication && publication.length > 0 ? row_content(publication, 'World'): <PlaceholderForSectionRow />}
            </Grid.Row>

        </Grid>
      
    </div>
  )
}
export default PubHome;