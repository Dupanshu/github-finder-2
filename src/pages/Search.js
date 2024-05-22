import video from '../media/grid.mp4';
import { FaGithub } from "react-icons/fa";
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Search() {
  const token = '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';
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('Welcome to GitHub Finder');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const options = {headers: { Authorization: `Bearer ${token}`}};
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${userName}`, options);
        if (response) {
          navigate(`/user/${userName}`);
        }
      } catch (error) {
        setMessage('Invalid Entry');
      }
    }
    fetchUser();

    event.preventDefault();

    if (userName.trim() === '') {
    setMessage('Please enter a username');
    }
  }

  const handleChange = event => {
    setUserName(event.target.value.trim());
  }

  return (
    <>
      <Helmet>
        <title>Search GitHub</title>
      </Helmet>
      <section className='finder'>
        <video className='video' autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>
        <div className='absolute-center search-bar grid'>
        <FaGithub className='github-icon' />
        <form onSubmit={handleSubmit} className='grid'>
          <input 
            type='text'
            placeholder='User Name'
            value={userName}
            onChange={handleChange}
          />
        </form>
        <p>{message}</p>
        </div>
      </section>
    </>
  );
}

export default Search;
