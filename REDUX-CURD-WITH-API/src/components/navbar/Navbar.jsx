  import  { useState } from 'react';
  import { Link } from 'react-router-dom';


  const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      // Handle search logic here
      console.log(searchTerm);
    };

    return (
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className='flex justify-between'>
          <Link to="/" className="nav-link  text-white text-xl font-bold">
                  MyApp
          </Link>
          <Link to="/create" className="nav-link m-1 ml-10">
                  Create Post
          </Link>
          <Link to="/read" className="nav-link m-1 ml-10">
                  All  Post
          </Link>
          </div>

          <div className="flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  };

  export default Navbar;
