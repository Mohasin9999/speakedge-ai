import React from 'react';
import { FaGithub, FaFacebook, FaEnvelope } from "react-icons/fa";

const AboutUsPage = () => {
  const teamLeader = {
    name: 'Dr. Mohammad Ashrafuzzaman Khan',
    role: 'Advisor',
    description: 'Associate Professor, Department of Electrical and Computer Engineering, North South University.',
    email: 'mohammad.khan02@northsouth.edu',
    github: '',
    facebook: '',
    photo: 'https://ece.northsouth.edu/wp-content/uploads/2018/07/mohammad.khan_.jpg',
  };

  const teamMembers = [
    {
      name: 'Tabassum Bari',
      role: 'Developer',
      description: 'Tabassum Bari is a back-end developer focused on server-side logic and database management.',
      email: 'tabassum.bari@northsouth.edu',
      github: '',
      facebook: 'https://www.facebook.com/tabassum.bari.732295',
      photo: '',
    },
    {
      name: 'Samnun Murtayes Jarif',
      role: 'Developer',
      description: 'Samnun specializes in full-stack development, building seamless and efficient applications from front-end to back-end',
      email: 'samnun.jarif@northsouth.edu',
      github: 'https://github.com/MURTAYES',
      facebook: 'https://www.facebook.com/samnun.murtayes/',
      photo: '',
    },
    {
      name: 'Mohasin Ahmed Niloy',
      role: 'Developer',
      description: 'Niloy is our researcher and AI expert, leveraging his deep knowledge to drive innovation and cutting-edge solutions.',
      email: 'mohasin.ahmed@northsouth.edu',
      github: 'https://github.com/Mohasin9999',
      facebook: 'https://www.facebook.com/ma.niloy.73',
      photo: '',
    },
  ];

  return (
    <div className="bg-gray-100 py-16 px-4">
      {/* Page Heading */}
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl font-dancingScript text-primary mb-4">Meet Our Team</h2>
        <p className="text-lg text-gray-700">
          We are a passionate group of individuals dedicated to making this project a success.
        </p>
      </div>

      {/* Team Leader Section */}
      <div className="flex justify-center mb-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg text-center">
          <img src={teamLeader.photo} alt={teamLeader.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-primary">{teamLeader.name}</h3>
            <p className="text-md text-gray-700 mt-2">{teamLeader.role}</p>
            <p className="text-gray-700 mt-4">{teamLeader.description}</p>
            <div className="flex justify-center space-x-4 mt-4">
              {teamLeader.email && (
                <a href={`mailto:${teamLeader.email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className="w-6 h-6 text-red-500 hover:text-red-700 transition duration-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden text-center">
            <img src={member.photo} alt={member.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
              <p className="text-md text-gray-700 mt-2">{member.role}</p>
              <p className="text-gray-700 mt-4">{member.description}</p>
              <div className="flex justify-center space-x-4 mt-4">
                {member.email && (
                  <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                    <FaEnvelope className="w-6 h-6 text-red-500 hover:text-red-700 transition duration-300" />
                  </a>
                )}
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="w-6 h-6 text-gray-700 hover:text-black transition duration-300" />
                  </a>
                )}
                {member.facebook && (
                  <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="w-6 h-6 text-blue-600 hover:text-blue-800 transition duration-300" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsPage;
