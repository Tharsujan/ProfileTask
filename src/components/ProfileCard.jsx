import React from "react";

const ProfileCard = ({
  id,
  img,
  name,
  onClick,
  buttonColor = "black",
  textColor = "white",
  isLoading = false, // Add a loading prop
}) => {
  const colorClasses = {
    black: "bg-black hover:bg-gray-800",
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
  };

  const textClasses = {
    white: "text-white",
    black: "text-black",
    gray: "text-gray-700",
    blue: "text-blue-500",
    red: "text-red-500",
    green: "text-green-500",
  };

  const buttonClass = ` mt-4 px-4 py-2 font-serif rounded-lg w-full transition-colors ${colorClasses[buttonColor]} ${textClasses[textColor]} text-center cursor-pointer`;

  // Skeleton UI
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        {/* Skeleton for image */}
        <div className="w-[300px] h-[300px] bg-gray-200"></div>
        <div className="p-4">
          {/* Skeleton for name */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          {/* Skeleton for button */}
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Actual Profile Card
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={img} alt={name} className="w-[300px] h-[300px] object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold ml-4 font-serif">{name}</h2>
        <div className={buttonClass} onClick={onClick}>
          View Details
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
