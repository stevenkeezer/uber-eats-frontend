import { faBars, faHamburger, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span>Please verify your account</span>
        </div>
      )}
      <header className="py-6 flex">
        <div className="w-full xl:px-10 px-4 mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBars} className="text-xl" />
            <Link to="/" className="cursor-pointer ml-8">
              <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" />
            </Link>
          </div>
          <Link to="/edit-profile" className="text-xs">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </div>
      </header>
    </>
  );
};
