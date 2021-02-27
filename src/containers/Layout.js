import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Layout = ({ children }) => {
    return(
        <div>
            <Navbar />
                <div className='ui' style={{ marginTop: '4em', marginLeft:'2em', width: '99%' }}>
                    {children}
                </div>
            <Footer />
        </div>
        

    )
}

export default Layout;