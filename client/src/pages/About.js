import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
  const personsInfo = [
    {
      name: 'Priyom Parial',
      bio: 'ID:20220104085',
    },
    {
      name: 'Safuan Hasan',
      bio: 'ID:20220104097',
    },
    {
      name: 'Prottoy Roy',
      bio: 'ID:20220104099',
    },
  ];

  return (
    <Layout title="About us">
      <div className='row contactus' style={{ backgroundColor: 'skyblue', padding: '20px' }}>
        <div className='col-md-6'>
          <img src='/images/about us.jpeg' alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className='col-md-4 d-flex align-items-center justify-content-center'>
          <div style={{ textAlign: 'center', color: 'navy' }}>
            {personsInfo.map((person, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{person.name}</h3>
                <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
