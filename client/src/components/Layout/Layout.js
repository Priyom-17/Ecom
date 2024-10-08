import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="blur-bright-bg"></div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />


        <title>{title}</title>

      </Helmet>
      <main style={{ minHeight: '80vh' }}><Toaster />{children}</main>
      
      <Footer />


    </div>
  )
}
Layout.defaultProps = {
  title: "TechMania-Shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  auhtor: "techin",
}



export default Layout
