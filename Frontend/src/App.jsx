import { Routes, Route } from 'react-router-dom';
import { MoviesRoutes } from './routes/MoviesRoutes';
import Home from './pages/Home';
import ActorsList from './pages/actors/ActorsList';
import CreateActor from './pages/actors/CreateActor';
import EditActor from './pages/actors/EditActor';
import ActorDetails from './pages/actors/ActorDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'

function App() {

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {MoviesRoutes()}
          <Route path="/actors/create" element={<CreateActor />} />
          <Route path="/actors" element={<ActorsList />} />
          <Route path="/actors/:id/update" element={<EditActor/>} />
          <Route path="/actors/:id/details" element={<ActorDetails/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
