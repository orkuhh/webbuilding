import React, { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        <p className="text-division-gray-light text-lg">
          Have questions or suggestions? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-division-gray-light mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input w-full"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-division-gray-light mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input w-full"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-division-gray-light mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input w-full"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-division-gray-light mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="input w-full"
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">Quick Support</h3>
            <div className="space-y-4">
              <p className="text-division-gray-light">
                For faster responses, join our Discord community where our team and other players can help you directly.
              </p>
              <a 
                href="https://discord.gg/divisionbuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <span>Join Discord</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">Other Ways to Connect</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-division-orange font-semibold mb-1">Email</h4>
                <a 
                  href="mailto:support@divisionbuilds.com"
                  className="text-division-gray-light hover:text-division-orange transition-colors"
                >
                  support@divisionbuilds.com
                </a>
              </div>
              <div>
                <h4 className="text-division-orange font-semibold mb-1">GitHub</h4>
                <a 
                  href="https://github.com/divisionbuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-division-gray-light hover:text-division-orange transition-colors"
                >
                  @divisionbuilds
                </a>
              </div>
              <div>
                <h4 className="text-division-orange font-semibold mb-1">Twitter</h4>
                <a 
                  href="https://twitter.com/divisionbuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-division-gray-light hover:text-division-orange transition-colors"
                >
                  @divisionbuilds
                </a>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-white mb-4">Contributing</h3>
            <p className="text-division-gray-light mb-4">
              Interested in contributing to Division Builds? We're always looking for developers, content creators, and community moderators.
            </p>
            <a 
              href="/contribute"
              className="text-division-orange hover:text-division-orange/80 transition-colors"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 