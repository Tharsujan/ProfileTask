import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfiles } from "../redux/profileSlice";
import ProfileCard from "../components/ProfileCard";

const ProfileListingPage = () => {
  const dispatch = useDispatch();
  const {
    data: profiles,
    status,
    error,
  } = useSelector((state) => state.profiles);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfiles());
    }
  }, [status, dispatch]);

  // Filter profiles based on search term
  useEffect(() => {
    if (profiles && profiles.length > 0) {
      if (searchTerm.trim() === "") {
        setFilteredProfiles(profiles);
      } else {
        const filtered = profiles.filter((profile) =>
          profile.client_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim())
        );
        setFilteredProfiles(filtered);
      }
    } else {
      setFilteredProfiles([]);
    }
  }, [searchTerm, profiles]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const isLoading = status === "loading";

  if (status === "failed") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex justify-center items-center min-w-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Profiles</h1>
          {/* <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our collection of professional profiles and connect
            with talented individuals.
          </p> */}
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search profiles by name..."
              className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? // Show skeleton loading cards while loading
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="w-full">
                  <ProfileCard isLoading={true} />
                </div>
              ))
            : // Show filtered profile cards
              filteredProfiles.map((profile) => (
                <div key={profile.client_id} className="w-full">
                  <ProfileCard
                    name={profile.client_name}
                    img={
                      profile.client_profile_url ||
                      "https://via.placeholder.com/150"
                    }
                    onClick={() =>
                      navigate(`/profile/${profile.client_id}`, {
                        state: { profile },
                      })
                    }
                    buttonColor="blue"
                    textColor="white"
                  />
                </div>
              ))}
        </div>

        {!isLoading && filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            {searchTerm ? (
              <div>
                <p className="text-gray-600">No profiles match your search.</p>
                <button
                  onClick={clearSearch}
                  className="mt-3 text-blue-500 hover:text-blue-700 font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <p className="text-gray-600">No profiles found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileListingPage;
