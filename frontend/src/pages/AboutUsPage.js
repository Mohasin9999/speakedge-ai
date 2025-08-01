import React from "react";
import {
  FiAward,
  FiUsers,
  FiZap,
  FiHeart,
  FiEye,
  FiLinkedin,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";

// --- Component Data ---

// Team Member Data - Updated with social links
const teamMembers = [
  {
    name: "Dr. Mohammad Ashrafuzzaman Khan [AzK]",
    role: "Project Mentor & Advisor",
    bio: "A distinguished professor who provides expert guidance and mentorship, ensuring our project stays on track.",
    imageUrl:
      "https://ece.northsouth.edu/wp-content/uploads/2018/07/mohammad.khan_.jpg",
    socials: {
      website:
        "https://ece.northsouth.edu/people/dr-mohammad-ashrafuzzaman-khan/",
    },
  },
  {
    name: "Mohsin Ahmed Niloy",
    role: "AI & Backend Engineer",
    bio: "Niloy is the architect of our intelligent voice analyzer and manages all our backend systems.",
    imageUrl:
      "https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/494309785_2052528205246376_8807425043126550001_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFgdvCWR-LRRDfOLtIJ3mlZpbIy-Pxvj9ilsjL4_G-P2PtUuHbCxoxHW3VQES6qEK-WdWFr5ee6baxEktAyvDk8&_nc_ohc=xpiVcordFdMQ7kNvwEhRodw&_nc_oc=AdnHMhc2gEbqMxdgBdUDDNXwhkjNARmzjPga8wT-Rk1OZ1CRpe1WW4ysM58RUIBDYX0&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=YnuIZ6Vy8Or0pZTeWTt-Ng&oh=00_AfQqKaXVCqf1YKYR5ixfLHF3zt1BKAUKhBIxQVAHejk1mA&oe=68927150",
    socials: {
      linkedin: "https://linkedin.com/in/niloy",
      github: "https://github.com/Mohasin9999",
    },
  },
  {
    name: "Tabassum Bari",
    role: "Lead Designer & PM",
    bio: "Tabassum designs the intuitive user experience and keeps the development lifecycle on track.",
    imageUrl:
      "https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/514743963_2883479248517851_5235829564726715323_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEWipkC9Vn1L77_5MMTDE5T7PcqYPbyBPvs9ypg9vIE-7mV4PeJWrOnEeZ_i3iiqNMfuqu_3dU-LzfXgUuoHLkC&_nc_ohc=vImtmRXopPIQ7kNvwH4PIr9&_nc_oc=AdmkdKYU2MWejFwrzIZYeb6Jw_OPgL4pjl8_VXuRlEFY4aiiACKnF8UA6jtT_4YrQ9o&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=M71cS7UFeFTwKb51zedThQ&oh=00_AfRT5LYXRVr2rH8gaDgj10uWxhKntw64QWyFiITliXHyfw&oe=6892952B",
    socials: {
      linkedin: "https://linkedin.com/in/jessicalee",
      github: "https://github.com/jessicalee",
    },
  },
  {
    name: "Samnun Murtayes Jarif",
    role: "Full Stack Developer",
    bio: "Samnun builds and connects our user-facing features, working across the full stack to bring ideas to life.",
    imageUrl:
      "https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/480900727_655191143557379_8120198686192840572_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHMQznzj7h80JA8nMIPwcRTmvLBnNzi5Naa8sGc3OLk1twc7RwSNamj45QneJM-nGyPumhttJaxTtMhpBFbwmVY&_nc_ohc=d7MnehHDQo0Q7kNvwGYRJXE&_nc_oc=AdkHe4AQJz-Ox7Qy8Xy0Sk4HS_afutLaiRu5yE6yhA_8KHZJvPU3GYGErVyZskVPcSw&_nc_zt=23&_nc_ht=scontent.fdac99-1.fna&_nc_gid=EesYk0ica_ngAgo-qSo7SQ&oh=00_AfSYNLEblKhmINr0U56rgDxPPBQZlim_bMILienu3XEc7w&oe=689285E6",
    socials: {
      linkedin:
        "https://linkedin.com/in/mariagarciahttps://www.linkedin.com/in/samnun-murtayes-jarif-778975235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/MURTAYES",
    },
  },
];

// Timeline Data
const timelineEvents = [
  {
    year: "01/02/2025",
    title: "The Spark",
    description:
      "The initial idea for SpeakEdge was born from a desire to help people overcome public speaking anxiety.",
  },
  {
    year: "17/032025",
    title: "Building the Foundation",
    description:
      "We developed the first prototype of our voice analysis engine.",
  },
  {
    year: "14/08/2025",
    title: "Beta Launch",
    description:
      "We launched a private beta to a group of 1,000 users, gathering crucial feedback.",
  },
  {
    year: "01/01/2026",
    title: "Public Launch & Growth",
    description:
      "SpeakEdge officially launched to the public, helping thousands find their voice.",
  },
];

// Core Values Data
const coreValues = [
  {
    icon: <FiZap className="w-8 h-8 text-brand-blue" />,
    title: "Innovation",
    description:
      "We constantly push the boundaries of technology to deliver the best learning experience.",
  },
  {
    icon: <FiHeart className="w-8 h-8 text-green-500" />,
    title: "Empathy",
    description:
      "We listen to our users and build tools that genuinely address their needs and fears.",
  },
  {
    icon: <FiEye className="w-8 h-8 text-purple-500" />,
    title: "Clarity",
    description:
      "We believe in clear, direct, and honest communication in our product and our company.",
  },
];

// --- Main About Us Page Component ---

const AboutUsPage = () => {
  return (
    <div className="bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-blue to-green-400 pt-32 pb-24 text-center text-white">
        <div className="container mx-auto px-6">
          <p className="text-lg font-semibold uppercase tracking-wider text-white/80">
            Our Story
          </p>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold">
            Empowering Voices, Inspiring Confidence.
          </h1>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              At SpeakEdge, our mission is to unlock human potential through the
              power of communication. We believe that everyone has a unique
              voice and a story to tell.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              We build technology that provides personalized, actionable
              feedback to help you master the art of speaking, whether you're
              presenting in a boardroom, giving a toast at a wedding, or simply
              want to speak with greater clarity and impact.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-dark-surface p-6 rounded-lg text-center">
              <FiUsers className="mx-auto w-12 h-12 text-brand-blue" />
              <p className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                10k+
              </p>
              <p className="text-gray-500 dark:text-gray-400">Happy Users</p>
            </div>
            <div className="bg-gray-100 dark:bg-dark-surface p-6 rounded-lg text-center">
              <FiAward className="mx-auto w-12 h-12 text-green-500" />
              <p className="text-4xl font-bold mt-2 text-gray-900 dark:text-white">
                500+
              </p>
              <p className="text-gray-500 dark:text-gray-400">5-Star Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - UPDATED WITH SOCIAL LINKS */}
      <section className="bg-light-gray dark:bg-dark-surface py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Meet the Innovators
          </h2>

          {/* Mentor Section */}
          <div className="flex justify-center mb-16">
            {teamMembers.slice(0, 1).map((member) => (
              <div
                key={member.name}
                className="group flex flex-col items-center max-w-sm"
              >
                <div className="relative w-40 h-40">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-brand-blue dark:text-green-400 font-semibold text-lg">
                  {member.role}
                </p>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
                <div className="mt-3 flex space-x-4">
                  <a
                    href={member.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brand-blue dark:hover:text-white transition-colors"
                  >
                    <FiGlobe size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Core Team Members Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
            {teamMembers.slice(1).map((member) => (
              <div
                key={member.name}
                className="group flex flex-col items-center"
              >
                <div className="relative w-32 h-32">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover shadow-lg transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-brand-blue dark:text-green-400 font-semibold">
                  {member.role}
                </p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {member.bio}
                </p>
                <div className="mt-3 flex space-x-4">
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brand-blue dark:hover:text-white transition-colors"
                  >
                    <FiLinkedin size={20} />
                  </a>
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-brand-blue dark:hover:text-white transition-colors"
                  >
                    <FiGithub size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Our Journey
          </h2>
          <div className="relative wrap overflow-hidden h-full">
            <div
              className="border-2-2 absolute border-opacity-20 border-gray-700 dark:border-gray-500 h-full border"
              style={{ left: "50%" }}
            ></div>
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`mb-8 flex justify-between items-center w-full ${
                  index % 2 === 0
                    ? "flex-row-reverse left-timeline"
                    : "right-timeline"
                }`}
              >
                <div className="order-1 w-5/12"></div>
                {/* MODIFIED: Increased size from w-16 h-16 to w-20 h-20 */}
                <div className="z-20 flex items-center order-1 bg-brand-blue shadow-xl w-20 h-20 rounded-full">
                  {/* MODIFIED: Adjusted font size to fit the full year */}
                  <h1 className="mx-auto font-semibold text-sm text-white">
                    {event.year}
                  </h1>
                </div>
                <div className="order-1 bg-gray-100 dark:bg-dark-surface rounded-lg shadow-xl w-5/12 px-6 py-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 text-xl">
                    {event.title}
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-400 text-opacity-100">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-light-gray dark:bg-dark-surface py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {coreValues.map((value) => (
              <div key={value.title} className="flex flex-col items-center">
                <div className="bg-white dark:bg-dark-bg p-4 rounded-full shadow-md">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
