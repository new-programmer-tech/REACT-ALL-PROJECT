/** @format */

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../../features/userDetailsSlice';

function Update() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedData, setUpdatedData] = useState([]);

  const { id } = useParams();
  // console.log('useParams', id);

  const { users } = useSelector((state) => state.userDetail);

  useEffect(() => {
    // console.log(id);
    if (id && users.length > 0) {
      const singleUser = users.find((ele) => ele.id === id);
      if (singleUser) {
        setUpdatedData(singleUser);
      }
    }
  }, [id, users]);

  // console.log('updatedData', updatedData);

  const newData = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updatedData));
    navigate('/read');
  };

  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold mb-6'>User Form</h1>
      <form onSubmit={handleUpdate}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={updatedData.name || ''}
            onChange={newData}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={updatedData.email || ''}
            onChange={newData}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='age' className='block text-gray-700 font-bold mb-2'>
            Age
          </label>
          <input
            type='number'
            name='age'
            id='age'
            value={updatedData.id || ''}
            onChange={newData}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='gender'
            className='block text-gray-700 font-bold mb-2'>
            Gender
          </label>
          <select
            name='gender'
            id='gender'
            value={updatedData.gender || ''}
            onChange={newData}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div className='flex items-center justify-between'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
