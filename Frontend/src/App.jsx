import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'
import { MoviesRoutes } from './routes/MoviesRoutes';
import { DirectorsRoutes } from './routes/DirectorsRoutes';
import { ActorsRoutes } from './routes/ActorsRouters';

function App() {

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {MoviesRoutes()}
          {DirectorsRoutes()}
          {ActorsRoutes()}
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
