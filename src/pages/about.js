import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutUs = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />
      <main className="px-4 container mx-auto text-center flex-grow py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p>
          We are a team of innovative developers, dedicated to creating the best user experience possible. Our company was founded on the principles of user-centered design, and we continue to focus on creating products that are not only functional, but also intuitive and satisfying to use. We are always looking for new ways to solve problems and improve the digital experience for users around the world.
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
