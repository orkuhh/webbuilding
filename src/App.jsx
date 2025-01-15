import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BuildEditor from './components/BuildEditor';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BuildsPage from './components/BuildsPage';
import BuildDetailsPage from './components/BuildDetailsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ContributePage from './components/ContributePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-division-dark via-division-dark-lighter to-division-dark">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/builds/:id" element={<BuildDetailsPage />} />
            <Route path="/create" element={<BuildEditor />} />
            
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contribute" element={<ContributePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            
            <Route path="/inventory" element={
              <div className="space-y-6">
                <header className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-white">Inventory Manager</h1>
                  <div className="flex gap-4">
                    <button type="button" className="btn-secondary">Import</button>
                    <button type="button" className="btn-primary">Add Item</button>
                  </div>
                </header>
                <div className="card">
                  {/* Inventory grid will go here */}
                </div>
              </div>
            } />
            
            <Route path="/guides" element={
              <div className="space-y-6">
                <header className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-white">Build Guides</h1>
                  <button type="button" className="btn-primary">Create Guide</button>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Guide cards will go here */}
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
