import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
  return (
     
    <Layout title={"About us"} >
        <div className='row contactus'>
          <div className='col-md-6'>
            <img src='\images\about us.jpeg' alt="contactus" style={{width: "100%"}}/>
          </div>
        </div>
      
    </Layout>
  );
};

export default About
