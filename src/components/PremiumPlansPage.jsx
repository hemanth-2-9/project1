import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Loading from './Loading'; // Import the Loading component

function PremiumPlansPage() {
  const navigate = useNavigate();

  // New state to manage loading status
  const [loading, setLoading] = useState(true);
  // New state to hold the plans data after "fetching"
  const [premiumPlans, setPremiumPlans] = useState([]);

  // Simulate fetching data with a delay
  useEffect(() => {
    // Define your static plans data inside the useEffect or outside the component
    const staticPlans = [
      {
        id: 'individual',
        name: 'Individual',
        price: '$9.99/month',
        features: [
          '1 premium account',
          'Ad-free music listening',
          'Play anywhere - even offline',
          'On-demand playback',
        ],
        buttonText: 'Get Individual',
      },
      {
        id: 'duo',
        name: 'Duo',
        price: '$12.99/month',
        features: [
          '2 premium accounts for couples',
          'Ad-free music listening',
          'Play anywhere - even offline',
          'On-demand playback',
          'Duo Mix: a playlist for two',
        ],
        buttonText: 'Get Duo',
      },
      {
        id: 'family',
        name: 'Family',
        price: '$15.99/month',
        features: [
          'Up to 6 premium accounts',
          'Ad-free music listening',
          'Play anywhere - even offline',
          'On-demand playback',
          'Family Mix: a playlist for your family',
          'Block explicit music',
        ],
        buttonText: 'Get Family',
      },
    ];

    // Simulate a network request delay
    const timer = setTimeout(() => {
      setPremiumPlans(staticPlans); // Set the data
      setLoading(false);            // Turn off loading
    }, 1000); // Simulate a 1.5-second load time

    // Cleanup function: Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

  const handleGoBack = () => {
    navigate('/', { replace: true });
  };

  // --- Conditional Rendering for Loading State ---
  if (loading) {
    return <Loading />; // Display the Loading component
  }

  // Once loaded, display the actual content
  return (
    <div className="flex h-screen bg-[#121212] font-montserrat text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8 lg:p-10 pb-20">
        {/* Back Button */}
        <div className="p-0 sm:p-0 bg-transparent mb-6">
          <button
            onClick={handleGoBack}
            className="text-gray-300 hover:text-white transition-colors duration-200 text-lg font-semibold flex items-center bg-black bg-opacity-50 rounded-full px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Page Title */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-10 text-center lg:text-left">
          Upgrade to Premium
        </h1>

        {/* Premium Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {premiumPlans.map((plan) => ( // Use premiumPlans from state
            <div
              key={plan.id}
              className="bg-[#1A1A1A] rounded-lg p-6 flex flex-col items-center w-full max-w-sm shadow-xl hover:bg-[#282828] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">{plan.name}</h2>
              <p className="text-4xl font-extrabold mb-4">{plan.price}</p>
              <ul className="list-disc list-inside text-gray-300 text-sm mb-6 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-auto px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition duration-300 ease-in-out w-full">
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PremiumPlansPage;