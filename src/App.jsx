import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthCallback from './components/AuthCallback';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BuildEditor from './components/BuildEditor';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BuildsPage from './components/BuildsPage';
import BuildDetailsPage from './components/BuildDetailsPage';
import GuidesPage from './components/GuidesPage';
import CreateGuidePage from './components/CreateGuidePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ContributePage from './components/ContributePage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';
import ProfilePage from './components/ProfilePage';
import EditProfilePage from './components/EditProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-division-dark via-division-dark-lighter to-division-dark">
          <Navbar />
          
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/builds" element={<BuildsPage />} />
              <Route path="/builds/:id" element={<BuildDetailsPage />} />
              <Route path="/create" element={
                <ProtectedRoute>
                  <BuildEditor />
                </ProtectedRoute>
              } />
              
              <Route path="/guides" element={<GuidesPage />} />
              <Route path="/guides/create" element={
                <ProtectedRoute>
                  <CreateGuidePage />
                </ProtectedRoute>
              } />
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/contribute" element={<ContributePage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              
              <Route path="/inventory" element={
                <ProtectedRoute>
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
                </ProtectedRoute>
              } />
              
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/profile/edit" element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              } />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
