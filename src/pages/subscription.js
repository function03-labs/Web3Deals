import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Subscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // Implement your subscription logic here
    // You can use an API endpoint or integrate with Mailchimp API to handle the subscription
    console.log('Subscribed with email:', email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center">Join Our Mailing List</h1>
        <p className=" text-gray-400 mb-4 text-center">Enter your Email to get notified of the latest Web3 deals</p>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full p-3 mb-2 border rounded"
      />
      <Button onClick={handleSubscribe}  className="w-full p-3 text-white bg-black border border-black rounded cursor-pointer ">Subscribe</Button>
    </div>
    </div>
  );
};

export default Subscribe;
