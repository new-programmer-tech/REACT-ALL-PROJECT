/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, showUser } from '../../features/userDetailsSlice.js';
import { useEffect, useState } from 'react';
import PopUp from '../Modal/PopUp';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDetails = () => {
  const dispatch = useDispatch();

  const [showPop, setShowPopup] = useState(false);
  const [id, setId] = useState('');

  const { users, loading, error } = useSelector((state) => state.userDetail);

  useEffect(() => {
    console.log('UserDetails useEffect');
    dispatch(showUser())
      .unwrap()
      .catch((err) => {
        toast.error(`Fetch failed: ${err}`);
      });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id))
      .unwrap()
      .then(() => {
        toast.success('User deleted successfully');
      })
      .catch((err) => {
        toast.error(`Deletion failed: ${err}`);
      });
  };

  if (loading) {
    return <h2>Loading.....</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      {showPop && <PopUp id={id} setShowPopup={setShowPopup} />}
      <div className='flex justify-center mb-4'>
        <p className='text-3xl'>Total Number of users:</p>
        <h1 className='text-2xl'>{users.length}</h1>
      </div>
      <hr />
      <div className='flex flex-wrap'>
        {users &&
          users.map((ele) => (
            <div
              key={ele.id}
              className='max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4'>
              <div className='font-bold text-xl mb-2'>{ele.name}</div>
              <p className='text-gray-700 text-base'>{ele.email}</p>
              <p className='text-gray-700 text-base'>{ele.gender}</p>
              <div className='flex justify-end mt-4'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline'>
                  Edit
                </button>{' '}
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline'
                  onClick={() => [setId(ele.id), setShowPopup(true)]}>
                  View
                </button>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  onClick={() => handleDelete(ele.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDetails;
