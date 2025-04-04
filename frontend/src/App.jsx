import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import { useAuth } from './context/AuthContext';



function App() {
  console.log("App rendered");
  const auth = useAuth();

  return (
      <main>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
           { auth?.isLoggedIn && auth.user && ( <Route path="/chat" element={<Chat />} /> )}  

          {/*  { auth && auth.isLoggedIn && auth.user ? <Route path="/chat" element={<Chat />} /> : null }  */}

            <Route path="*" element={<NotFound />} />
          </Routes>
      </main>
    );
}

export default App
