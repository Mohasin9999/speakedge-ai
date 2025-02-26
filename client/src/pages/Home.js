import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const userPhoto = null;

  return (
    <div className="font-sans">
      {/* Section 1: Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url(image/background.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto p-6 text-white flex items-center justify-center h-full flex-col text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-white font-dancingScript">Welcome to SpeakEdge</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8">Improve your English with personalized AI-driven conversations</p>
          <Link to="/login" className="bg-primary text-white px-8 py-3 text-lg rounded-full hover:bg-secondary transition duration-300">Get Started</Link>
        </div>
      </section>

      {/* Section 2: Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-accent mb-8 " style={{ fontFamily: 'Dancing Script, cursive' }}>Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="shadow-lg p-6 rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src="image/feature1.jpg" alt="Feature 1" className="w-32 h-32 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">AI Conversations</h3>
              <p className="text-gray-700 mt-2">Engage in real-time conversations with AI to improve your speaking skills.</p>
            </div>
            <div className="shadow-lg p-6 rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src="image/feature2.jpg" alt="Feature 2" className="w-32 h-32 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">Personalized Feedback</h3>
              <p className="text-gray-700 mt-2">Receive personalized feedback to correct your pronunciation and grammar mistakes.</p>
            </div>
            <div className="shadow-lg p-6 rounded-lg hover:shadow-2xl transition-transform transform hover:scale-105">
              <img src="image/feature3.jpg" alt="Feature 3" className="w-32 h-32 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">Progress Tracking</h3>
              <p className="text-gray-700 mt-2">Track your speaking and learning progress over time to stay motivated.</p>
            </div>
          </div>
        </div>
      </section>

{/* Section 3: Tutorial */}
<section className="py-16 bg-primary" >
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-white mb-8 font-dancingScript">
      How to Use Our Service
    </h2>
    <p className="text-lg text-gray-700 mb-6">Follow these simple steps to get started with us.</p>
    <div className="flex justify-center space-x-8">
      {/* Step 1 */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all">
        <div className="flex justify-center mb-4">
          <img src="image/step1.jpg" alt="Step 1" className="w-32 h-32" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-primary">Step 1</h3>
        <p className="text-gray-700">Create an account in just a few minutes and get started.</p>
      </div>

      {/* Step 2 */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all">
        <div className="flex justify-center mb-4">
          <img src="image/step2.jpg" alt="Step 2" className="w-32 h-32" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-primary">Step 2</h3>
        <p className="text-gray-700">Begin speaking with AI to practice your English.</p>
      </div>

      {/* Step 3 */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all">
        <div className="flex justify-center mb-4">
          <img src="image/step4.jpg" alt="Step 3" className="w-32 h-32" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-primary">Step 3</h3>
        <p className="text-gray-700">Monitor your progress with detailed reports and analytics.</p>
      </div>
    </div>
  </div>
</section>



{/* Section 4: User Reviews */}
<section className="py-16 bg-white">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold text-accent mb-8 font-dancingScript">
      What Our Users Say
    </h2>
    <div className="flex flex-wrap justify-center space-x-8">
      
      {/* User 1 */}
      <div className="w-full md:w-1/3 p-6 bg-fade rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <img
            src="/path/to/user1.jpg" // Replace with actual image path
            alt="User 1"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <p className="text-lg text-gray-700">"This service has helped me improve my skills significantly!"</p>
        <p className="mt-4 font-semibold text-primary">John Doe</p>
        <div className="flex justify-center mt-2">
          {/* 5 Star Rating */}
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill={index < 5 ? "#FFD700" : "#E0E0E0"}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442z" />
            </svg>
          ))}
        </div>
      </div>

      {/* User 2 */}
      <div className="w-full md:w-1/3 p-6 bg-fade rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <img
            src="/path/to/user2.jpg" // Replace with actual image path
            alt="User 2"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <p className="text-lg text-gray-700">"I love how easy and interactive it is to learn!"</p>
        <p className="mt-4 font-semibold text-primary">Jane Smith</p>
        <div className="flex justify-center mt-2">
          {/* 5 Star Rating */}
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill={index < 5 ? "#FFD700" : "#E0E0E0"}
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442z" />
            </svg>
          ))}
        </div>
      </div>

      {/* User 3 */}
      <div className="w-full md:w-1/3 p-6 bg-fade rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <img
            src="/path/to/user3.jpg" // Replace with actual image path
            alt="User 3"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>
        <p className="text-lg text-gray-700">"A game-changer for improving communication skills."</p>
        <p className="mt-4 font-semibold text-primary">Mark Johnson</p>
        <div className="flex justify-center mt-2">
          {/* 4.5 Star Rating */}
          {[...Array(4)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#FFD700"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.442c-.393.23-.836-.142-.707-.579l1.105-3.414L1.236 7.363c-.304-.449.129-.977.582-.977h3.401l1.067-3.348c.195-.618.911-.618 1.106 0l1.067 3.348h3.401c.453 0 .886.528.582.977l-3.774 4.086 1.105 3.414c.129.437-.314.809-.707.579L8 12.27l-3.652 3.173c-.156.134-.357.211-.548.211-.191 0-.392-.077-.548-.211L3.612 15.442z" />
            </svg>
          ))}
          {/* Half Star */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#FFD700"
            className="bi bi-star-half"
            viewBox="0 0 16 16"
          >
            <path d="M8 12.146l-3.5 2.053.667-3.861L1.25 6.8l3.91-.34L8 2.5l1.84 4.96 3.91.34-2.917 3.438.667 3.861L8 12.146z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  );
};

export default Home;
