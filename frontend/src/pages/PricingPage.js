import React, { useState } from 'react';
import { FiCheckCircle, FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';

// --- Component Data ---

const pricingTiers = [
  {
    name: 'Starter',
    priceMonthly: '$0',
    priceYearly: '$0',
    frequency: '/month',
    description: 'Perfect for individuals starting out with voice training.',
    features: [
      'Basic voice analysis',
      '5 practice sessions per day',
      'Community access',
      'Email support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    priceMonthly: '$15',
    priceYearly: '$12',
    frequency: '/month',
    description: 'For professionals looking to master their communication.',
    features: [
      'Advanced voice analysis & feedback',
      'Unlimited practice sessions',
      'Personalized learning paths',
      'Priority email support',
      'Access to premium content',
    ],
    cta: 'Choose Pro',
    featured: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 'Contact Us',
    priceYearly: 'Contact Us',
    frequency: '',
    description: 'Tailored solutions for teams and organizations.',
    features: [
      'All Pro features',
      'Team dashboards & reporting',
      'Dedicated account manager',
      'Custom integrations',
      'Onboarding & training',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
];

const faqs = [
    { question: "Can I upgrade or downgrade my plan anytime?", answer: "Yes, you can easily upgrade or downgrade your plan from your account settings. Changes will be prorated for the current billing cycle." },
    { question: "What happens if I exceed my practice sessions on the Starter plan?", answer: "On the Starter plan, practice sessions reset daily. If you need more, you can upgrade to the Pro plan for unlimited sessions." },
    { question: "Do you offer discounts for non-profits or students?", answer: "We do! Please contact our support team with your details, and we'll be happy to discuss available discounts." },
    { question: "What payment methods do you accept?", answer: "We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also support bank transfers." }
];

const FaqItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 dark:text-gray-200">
                <span>{faq.question}</span>
                {isOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            {isOpen && <div className="mt-3 text-gray-600 dark:text-gray-400"><p>{faq.answer}</p></div>}
        </div>
    )
}

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  return (
    <div className="bg-light-gray dark:bg-dark-bg">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-brand-blue to-green-400 pt-32 pb-24 text-center text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold">Find the Perfect Plan</h1>
          <p className="mt-4 text-lg text-white/90">Start for free, then upgrade to unlock powerful features.</p>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-16">
        {/* Billing Cycle Toggle */}
        <div className="flex justify-center items-center space-x-4 mb-12">
            <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-brand-blue dark:text-white' : 'text-gray-500'}`}>Monthly</span>
            <label htmlFor="billing-toggle" className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="billing-toggle" className="sr-only peer" checked={billingCycle === 'yearly'} onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} />
                <div className="w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-blue"></div>
            </label>
            <span className={`font-semibold ${billingCycle === 'yearly' ? 'text-brand-blue dark:text-white' : 'text-gray-500'}`}>
                Yearly <span className="text-sm text-green-500">(Save 20%)</span>
            </span>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto -mt-10 relative z-10">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={`bg-white dark:bg-dark-surface border ${tier.featured ? 'border-brand-blue dark:border-green-400' : 'border-gray-200 dark:border-gray-700'} rounded-2xl p-8 flex flex-col shadow-lg transform hover:scale-[1.03] transition-transform duration-300`}>
              {tier.featured && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"><span className="bg-brand-blue text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">Most Popular</span></div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400 flex-grow">{tier.description}</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{billingCycle === 'monthly' ? tier.priceMonthly : tier.priceYearly}</span>
                <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{tier.frequency}</span>
              </div>
              <ul className="mt-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center"><FiCheckCircle className="text-green-500 mr-3 flex-shrink-0" /><span className="text-gray-600 dark:text-gray-300">{feature}</span></li>
                ))}
              </ul>
              <button className={`w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-colors ${tier.featured ? 'bg-brand-blue text-white hover:bg-blue-700' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'}`}>{tier.cta}</button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
            <div className="text-center mb-12">
                <FiHelpCircle className="mx-auto text-4xl text-brand-blue mb-4"/>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2 bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
                {faqs.map((faq, index) => (<FaqItem key={index} faq={faq} />))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;
