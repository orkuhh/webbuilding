import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
        <p className="text-division-gray-light text-lg">
          Last updated: March 20, 2024
        </p>
      </header>

      {/* Introduction */}
      <div className="card">
        <p className="text-division-gray-light">
          By using Division Builds, you agree to these terms. Please read them carefully. These Terms of Service 
          ("Terms") govern your access to and use of Division Builds ("we" or "our") websites and services.
        </p>
      </div>

      {/* Account Terms */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Account Terms</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            To access certain features of our website, you must create an account. When you create an account:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>You must provide accurate and complete information</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You are responsible for all activities that occur under your account</li>
            <li>You must notify us immediately of any unauthorized access</li>
            <li>One person or entity may not maintain more than one account</li>
          </ul>
        </div>
      </div>

      {/* Acceptable Use */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Acceptable Use</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            When using our services, you agree not to:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>Violate any laws or regulations</li>
            <li>Post unauthorized commercial communications</li>
            <li>Engage in unauthorized data collection</li>
            <li>Upload malicious code or content</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Create accounts through unauthorized means</li>
            <li>Harass, bully, or intimidate other users</li>
            <li>Post content that infringes on intellectual property rights</li>
          </ul>
        </div>
      </div>

      {/* Content Terms */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Content and Submissions</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            By posting content on Division Builds:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>You retain ownership of your content</li>
            <li>You grant us a license to use and display your content</li>
            <li>You confirm you have the right to share the content</li>
            <li>You agree not to post inappropriate or offensive content</li>
            <li>We reserve the right to remove content at our discretion</li>
          </ul>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            The Division Builds service and its original content, features, and functionality are owned by 
            Division Builds and are protected by international copyright, trademark, patent, trade secret, 
            and other intellectual property laws.
          </p>
          <p className="text-division-gray-light">
            The Division® is a registered trademark of Ubisoft Entertainment. This site is not affiliated 
            with or endorsed by Ubisoft Entertainment.
          </p>
        </div>
      </div>

      {/* Termination */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            We reserve the right to:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>Terminate or suspend your account immediately without prior notice</li>
            <li>Remove or disable access to any content at our sole discretion</li>
            <li>Take appropriate legal action for violations of these Terms</li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            Division Builds is provided "as is" without any warranties, expressed or implied. We do not warrant that:
          </p>
          <ul className="list-disc list-inside text-division-gray-light space-y-2">
            <li>The service will be uninterrupted or error-free</li>
            <li>Defects will be corrected</li>
            <li>The site or server are free of viruses or harmful components</li>
          </ul>
        </div>
      </div>

      {/* Limitation of Liability */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
        <p className="text-division-gray-light">
          In no event shall Division Builds, its directors, employees, partners, agents, suppliers, or 
          affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, 
          including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>
      </div>

      {/* Changes to Terms */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
        <div className="space-y-4">
          <p className="text-division-gray-light">
            We reserve the right to modify or replace these Terms at any time. We will provide notice of any 
            changes by posting the new Terms on this page.
          </p>
          <p className="text-division-gray-light">
            Your continued use of the website after any changes constitutes acceptance of the new Terms.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
        <p className="text-division-gray-light mb-4">
          If you have any questions about these Terms, please contact us:
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/contact" className="btn-primary">
            Contact Us
          </Link>
          <a 
            href="mailto:legal@divisionbuilds.com"
            className="btn-secondary"
          >
            legal@divisionbuilds.com
          </a>
        </div>
      </div>
    </div>
  );
} 