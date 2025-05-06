import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUserCircle } from 'react-icons/fa';

const ProfileHeader = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setProfilePicture(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <div className="flex flex-col items-center mb-4">
      <div
        {...getRootProps()}
        className="w-24 h-24 rounded-full overflow-hidden cursor-pointer"
      >
        <input {...getInputProps()} />
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <FaUserCircle className="text-6xl text-gray-400" />
        )}
      </div>
      <h2 className="text-lg font-semibold mt-2">John Smith</h2> {/* Replace with user name */}
    </div>
  );
};

export default ProfileHeader;