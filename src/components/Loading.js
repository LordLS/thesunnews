import React from 'react'
import {Loader, Dimmer, Segment, } from 'semantic-ui-react'

const Loading = ({loading, children}) => {
    return (
      <div>

        <Segment>
            <Dimmer active={loading} inverted>
                    <Loader size='medium' />
            </Dimmer>
            {children}
        </Segment>
       
            
        

       
        
        
      </div>
    )
  }

  export default Loading