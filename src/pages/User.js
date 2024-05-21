
import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { HiUsers } from "react-icons/hi";
import { RiGitRepositoryLine } from "react-icons/ri";

function User() {
  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [text, setText] = useState('Loading...');
  const [repos, setRepos] = useState([]);
  const token = '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';
  

  useEffect(() => {
    const options = {headers: { Authorization: `Bearer ${token}`}};
    const fetchUser = async () => {
      try {
        const [responseUser, responseRepo] = await Promise.all([
          axios.get(`https://api.github.com/users/${userName}`, options),
          axios.get(`https://api.github.com/users/${userName}/repos`, options)
        ]);
        setUser(responseUser.data);
        setRepos(responseRepo.data);
      } catch (error) {
        setText(`Error getting user's data`);
      }
    };
    fetchUser();
  }, [userName]);

  if (!user) {
    return <div className='grid loading'>{text}</div>;
  }

  return (
    <>
    <Helmet>
      <title>{userName}'s github</title>
    </Helmet>
    <motion.div
      initial={{ scale: 0 }} 
      animate={{ scale: 1 }} 
      exit={{ scale: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
    >
      <section className='user container flex'>
        <div className='profile'>
          <img src={user.avatar_url} alt="Profile Pic" />
          <h1>{user.name}</h1>
          <div className='flex follow'>
            <HiUsers className='user-icon'/>
            <p>{user.followers} <span>followers</span></p>
            <p>{user.following} <span>following</span></p>
          </div>
          <a href={user.html_url} alt='Profile link'>Visit Profile</a>
        </div>
        <div className='repo'>
          <div className='repositories'>
            <RiGitRepositoryLine className='repo-icon'/>
            <p>Repositories</p>
          </div>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <div className='flex repo-flex'>
                  <section>
                    <p className='repo-name'>{repo.name}</p>
                    <p className='description'>{repo.description}</p>
                  </section>
                  <section>
                    <p className='date'>
                      Last Updated {new Date(repo.updated_at).toLocaleDateString()}
                    </p>
                  </section>
                </div>
              </li> 
            ))}
          </ul>
        </div>
      </section>
    </motion.div>
    </>
  );
}

export default User;