import 'antd/dist/antd.css'
import React, {useEffect, useState} from 'react'
import {Header, Item, Divider, Icon, Grid, GridColumn, Message, Placeholder} from 'semantic-ui-react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import {api} from '../../helpers/api'
import {parseIsoTimetoString} from '../../helpers/timeConverter'
import './Home.css'
import { useMediaQuery } from 'react-responsive'



const PubHome = () => {
  const [publication, setPub] = useState()
  const [error, setError] = useState(null)
  const [todayDate, setTodayDate] = useState(new Date().toUTCString())
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })

  function getTodayDate() {
    setTodayDate(new Date().toDateString()) 
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
      getTodayDate()
    }, [])


    const filter_obj_section =(objlist, section) => {
        return objlist.filter(function(a) {
            return a.section === section 
        })
    }   

    const row_content = (pubList, section) => {
            let widthImg = () => isTabletOrMobile? 16 : 5;
            return (
                filter_obj_section(pubList, section).slice(0, 3).map(x => {
                return(
                    <Grid.Column key={x.id} width={widthImg()}>
                        <Item>
                        <NavLink to={`/${x.section}/${x.id}`}>
                        <div class="home-container" style={{ marginRight: '2rem'}}>
                                    <img alt='Thumbnail' src={x.thumbnail}  style={{width:'100%'}}/>
                        </div>
                                <Item.Content>
                               <Item.Header as='h2'>{x.title}</Item.Header>
                                </Item.Content></NavLink>
                                <Item.Extra><Icon name='time'/> : {parseIsoTimetoString(x.date_time_posted)} | {x.section}</Item.Extra>
                        </Item>
                    </Grid.Column>
    )}))}

    const PlaceholderForSectionRow = () => {
        let colWidth = 5
        if (isTabletOrMobile){
            colWidth = 15
        }
        let content = []
        for(let i = 0; i < 3; i++){
            content.push(
                <Grid.Column key={i} width={colWidth}>
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

    const widthImgNews = () => isTabletOrMobile ? 16 : 8;

  return(
    <div style={{ width: '100%', textAlign: 'left'}}>
        <Grid>
            <Grid.Row columns='equal'>
                <GridColumn width={12} >
                    <div class="ui huge header">Welcome to The Sun News.com</div>
                    </GridColumn>
                    <GridColumn width={3}>
                    <Header disabled>{todayDate}</Header>
                    </GridColumn>
            </Grid.Row>
            {error && <Message negative> {error} </Message>}
      
            <Grid.Row>
                <Grid.Column width={1}>
                    <Header as='h2'>News</Header>
                </Grid.Column>

                <Grid.Column width={13}>
                    <Divider />
                </Grid.Column>
                {publication && publication.length > 0 ?
                    publication.slice(0,2).map(x => {
                        return(
                            <Grid.Column width={widthImgNews()} key={x.id}>
                                <Item>
                                <NavLink to={`/${x.section}/${x.id}`}>
                                    <div class="home-container" style={{ marginRight: '2rem'}}>
                                    <img alt='Thumbnail'src={x.thumbnail}  style={{width:'100%'}}/>
                                    <div className="home-bottom-left">
                                        <Item.Header as='h1' style={{color:'white',  textShadow: '1px 1px #6A6A6A'}}>
                                            {x.title}
                                            </Item.Header>
                                    </div>
                                    </div>
                                    </NavLink>
                                    <Item.Extra>
                                        <Icon name='time'/> : {parseIsoTimetoString(x.date_time_posted)} | {x.section}
                                        </Item.Extra>
                                </Item>
                            </Grid.Column>
                        )
                    })
                :
                <p>No Highlights at the moment ...</p>
                
                }
            </Grid.Row>


            <Grid.Row>
                <Grid.Column width={1}>
                    <Header as='h2'>Sport</Header>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Divider />
                </Grid.Column>
            {publication && publication.length > 0 ? row_content(publication, 'Sport') : <PlaceholderForSectionRow />}
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={1}>
                    <Header as='h2'>Business </Header>
                </Grid.Column>
                <Grid.Column width={13}>
                    <Divider />
                </Grid.Column>
                {publication && publication.length > 0 ? row_content(publication, 'Business'): <PlaceholderForSectionRow />}
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={1}>
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