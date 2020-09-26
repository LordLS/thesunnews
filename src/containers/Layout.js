import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {Container} from 'semantic-ui-react'


const Layout = ({ children }) => {
    return(
        <div>
            <Navbar />
                <Container text style={{ marginTop: '7em' }}>
                    {children}
                </Container>
            <Footer />
        </div>
        

    )
}

export default Layout;