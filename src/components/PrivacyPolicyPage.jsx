import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="text-division-gray-light text-lg">
          Last updated: March 20, 2024
        </p>
      </header>

      {/* Introduction */}
      <div className="card">
        <p className="text-division-gray-light">
          At Division Builds, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, and protect your personal information when you use our website.
        </p>
      </div>

      {/* Information Collection */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-division-orange mb-2">Account Information</h3>
            <p className="text-division-gray-light">
              When you create an account, we collect:
            </p>
            <ul className="list-disc list-inside text-division-gray-light mt-2 space-y-1">
              <li>Email address</li>
              <li>Username</li>
              <li>Password (encrypted)</li>
              <li>Profile information (optional)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-division-orange mb-2">Usage Information</h3>
            <p className="text-division-gray-light">
              We automatically collect certain information when you use our website:
            </p>
            <ul className="list-disc list-inside text-division-gray-light mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Time spent on site</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-division-orange mb-2">Content</h3>
            <p className="text-division-gray-light">
              We collect and store any content you create or share on our platform:
            </p>
            <ul className="list-disc list-inside text-division-gray-light mt-2 space-y-1">
              <li>Builds and loadouts</li>
              <li>Comments and feedback</li>
              <li>Guide content</li>
            </ul>
          </div>
        </div>
      </div>

      {/* How We Use Information */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Send important notifications</li>
            <li>Respond to your requests and support needs</li>
            <li>Analyze usage patterns and optimize performance</li>
            <li>Prevent abuse and maintain security</li>
          </ul>
        </div>
      </div>

      {/* Data Protection */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            We implement appropriate security measures to protect your personal information:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Secure data storage</li>
            <li>Access controls and authentication</li>
            <li>Regular backups</li>
          </ul>
        </div>
      </div>

      {/* Data Sharing */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>Service providers who assist in operating our website</li>
            <li>Law enforcement when required by law</li>
            <li>Other users (only information you choose to make public)</li>
          </ul>
        </div>
      </div>

      {/* Your Rights */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Export your data</li>
          </ul>
          <p className="text-division-gray-light mt-4">
            To exercise these rights, please <Link to="/contact" className="text-division-orange hover:text-division-orange/80">contact us</Link>.
          </p>
        </div>
      </div>

      {/* Cookies */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            We use cookies to improve your experience on our website. You can control cookie settings 
            through your browser preferences.
          </p>
          <p className="text-division-gray-light">
            Types of cookies we use:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>Essential cookies for site functionality</li>
            <li>Analytics cookies to understand usage</li>
            <li>Preference cookies to remember your settings</li>
          </ul>
        </div>
      </div>

      {/* Updates */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Policy Updates</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            We may update this Privacy Policy from time to time. We will notify you of any significant 
            changes by posting a notice on our website or sending you an email.
          </p>
          <p className="text-division-gray-light">
            Your continued use of our website after any changes indicates your acceptance of the updated Privacy Policy.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
        <p className="text-division-gray-light mb-4">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
          <a 
            href="mailto:privacy@divisionbuilds.com"
            className="btn-secondary"
          >
            privacy@divisionbuilds.com
          </a>
        </div>
      </div>
    </div>
  );
} 