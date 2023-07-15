import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContactUs = () => {
    return (
      <div className="flex min-h-screen flex-col justify-between">
        <Header />
        <div className="px-4 py-8 container mx-auto text-center flex-grow">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p>
            For any inquiries, please contact us at info@ourcompany.com or call us at (123) 456-7890. Our offices are located at 123 Main Street, Anytown, USA. <br/> We look forward to hearing from you!
          </p>
        </div>
        <Footer />
      </div>
    )
  }
  export default ContactUs;
