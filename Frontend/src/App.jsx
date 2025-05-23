import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'
import { MoviesRoutes } from './routes/MoviesRoutes';
import { ActorsRoutes } from './routes/ActorsRoutes';
import { DirectorsRoutes } from './routes/DirectorsRoutes';
import { GenresRoutes } from './routes/GenresRoutes';
import { ProductsRoutes } from './routes/ProductsRoutes';
import { CinemasRoutes } from './routes/CinemasRoutes';

function App() {

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {MoviesRoutes()}
          {ActorsRoutes()}
          {DirectorsRoutes()}
          {GenresRoutes()}
          {ProductsRoutes()}
          {CinemasRoutes()}
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
