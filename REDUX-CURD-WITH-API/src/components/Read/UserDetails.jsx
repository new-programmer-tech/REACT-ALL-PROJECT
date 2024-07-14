/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { showUser } from '../../features/userDetailsSlice';
import { useEffect } from 'react';

const UserDetails = () => {
  const dispatch = useDispatch();

  const allData = useSelector((state) => state.userDetails);
  console.log(allData);

  useEffect(() => {
    console.log('UserDetails useEffect');
    dispatch(showUser());
  });

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4'>
      <div className='font-bold text-xl mb-2'>{}</div>
      <p className='text-gray-700 text-base'>{}</p>
      <div className='flex justify-end mt-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline'>
          Edit
        </button>
        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
