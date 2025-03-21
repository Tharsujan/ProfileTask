import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const ProfileDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: profiles } = useSelector((state) => state.profiles);

  // Find the profile from Redux store instead of using location state
  const profile = profiles.find((p) => p.client_id.toString() === id);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    initial: { y: 50, opacity: 0 },
    in: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
    exit: { y: 0, opacity: 0, x: 100, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    in: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5, type: "spring", stiffness: 100 },
    },
    exit: { scale: 0.8, opacity: 0, x: 100, transition: { duration: 0.2 } },
  };

  const infoItemVariants = {
    initial: { x: -20, opacity: 0 },
    in: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.8 + i * 0.2, duration: 0.5 },
    }),
    exit: (i) => ({
      x: 100,
      opacity: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const handleBackClick = () => {
    // Instead of directly navigating, we'll create a wrapper that will
    // handle the transition before navigating
    setTimeout(() => {
      navigate("/");
    }, 500); // Match this with your exit animation duration
  };

  if (!profile) {
    return (
      <motion.div
        className="min-h-screen min-w-screen flex justify-center items-center"
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
      >
        <motion.div className="text-center" variants={contentVariants}>
          <p className="text-xl text-gray-700">Profile not found</p>
          <motion.button
            onClick={handleBackClick}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Profiles
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-gray-50 min-h-screen min-w-screen py-12"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.button
          onClick={handleBackClick}
          className="mb-8 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Profiles
        </motion.button>

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          variants={contentVariants}
        >
          <div className="md:flex flex-col">
            <div className="md:w-full bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex justify-center items-center">
              <motion.div
                className="w-[300px] h-[300px] rounded-full border-4 border-white shadow-xl overflow-hidden"
                variants={imageVariants}
              >
                <img
                  src={
                    profile.client_profile_url ||
                    "https://via.placeholder.com/300"
                  }
                  alt={profile.client_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                />
              </motion.div>
            </div>
            <div className="md:w-[full] p-8">
              <motion.h1
                className="text-3xl font-bold text-gray-800 mb-4 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
              >
                {profile.client_name}
              </motion.h1>

              <div className="space-y-8">
                <motion.div
                  className="flex items-start"
                  custom={0}
                  variants={infoItemVariants}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Contact Number
                    </h3>
                    <p className="text-lg text-gray-800">
                      {profile.client_mobile || "Not provided"}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  custom={1}
                  variants={infoItemVariants}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-lg text-gray-800">
                      {profile.client_city || "Not provided"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileDetailsPage;
