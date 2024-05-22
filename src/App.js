
import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import User from './pages/User';

function App() {
  return (
    <main>
      <Routes>
        <Route exact path='/github-finder-2/' element={<Search />} />
        <Route exact path='/github-finder-2/user/:userName' element={<User />} />
      </Routes>
    </main>
  );
}

export default App;
