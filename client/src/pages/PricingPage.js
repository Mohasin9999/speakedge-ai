import React from 'react';

const PricingPage = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-dancingScript text-primary mb-4">Our Pricing Plans</h2>
        <p className="text-lg text-gray-700">Choose a plan that suits your needs. Start your journey today!</p>
      </div>

      {/* Pricing Cards Section */}
      <div className="flex flex-wrap justify-center gap-8">
        {/* Basic Plan */}
        <div className="w-full sm:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-primary text-white p-6 text-center">
            <h3 className="text-2xl font-semibold">Basic Plan</h3>
            <p className="text-xl font-bold my-4">$19/month</p>
            <p className="text-sm">Ideal for individuals who are just getting started.</p>
          </div>
          <div className="p-6">
            <ul className="space-y-4 text-left text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                1 AI Interaction per day
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Access to basic tutorials
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Email support
              </li>
            </ul>
            <button className="w-full mt-6 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300">
              Choose Plan
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="w-full sm:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-secondary text-white p-6 text-center">
            <h3 className="text-2xl font-semibold">Pro Plan</h3>
            <p className="text-xl font-bold my-4">$49/month</p>
            <p className="text-sm">Perfect for professionals who need more advanced features.</p>
          </div>
          <div className="p-6">
            <ul className="space-y-4 text-left text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                5 AI Interactions per day
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Access to premium tutorials
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Priority email support
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Access to community features
              </li>
            </ul>
            <button className="w-full mt-6 py-2 px-4 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary-dark transition duration-300">
              Choose Plan
            </button>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="w-full sm:w-1/3 lg:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-primary text-white p-6 text-center">
            <h3 className="text-2xl font-semibold">Enterprise Plan</h3>
            <p className="text-xl font-bold my-4">$99/month</p>
            <p className="text-sm">For teams and organizations looking for premium features.</p>
          </div>
          <div className="p-6">
            <ul className="space-y-4 text-left text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Unlimited AI Interactions
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Premium and advanced tutorials
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                24/7 premium support
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Team collaboration features
              </li>
            </ul>
            <button className="w-full mt-6 py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-300">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
