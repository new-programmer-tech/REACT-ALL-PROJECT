/** @format */

import { useSelector } from 'react-redux';
import './CustomModal.css';
import PropTypes from 'prop-types';

const PopUp = ({ id, setShowPopup }) => {
  console.log('PopUp');
  const allUsers = useSelector((state) => state.userDetail);
  console.log('allUsers', allUsers);

  const singleUser = allUsers.users.filter((ele) => ele.id === id);
  console.log('single user', singleUser);

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          onClick={() => [setShowPopup(false), console.log('close PopUp')]}>
          Close
        </button>
        <h2>{singleUser[0].name}</h2>
        <h3>{singleUser[0].email}</h3>
        <h4>{singleUser[0].age}</h4>
        <p>{singleUser[0].gender}</p>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  id: PropTypes.string.isRequired,
  setShowPopup: PropTypes.func.isRequired,
};

export default PopUp;
