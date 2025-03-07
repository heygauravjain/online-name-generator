'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'interior' | 'sustainable' | 'urban';
  images: string[];
  year: number;
  location: string;
  client?: string;
  area?: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  location: string;
}

export default function ArchitectPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | Project['category']>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const experiences: Experience[] = [
    {
      company: 'Gaurav Jain Architects',
      role: 'Principal Architect',
      period: '2019 - Present',
      location: 'Mumbai, India',
      description: [
        'Leading architectural design projects from concept to completion',
        'Specializing in sustainable design and urban development',
        'Managing client relationships and project teams',
        'Implementing innovative design solutions for complex architectural challenges'
      ]
    },
    {
      company: 'Edifice Consultants Pvt. Ltd.',
      role: 'Senior Architect',
      period: '2016 - 2019',
      location: 'Mumbai, India',
      description: [
        'Led design teams for major commercial and residential projects',
        'Developed sustainable design strategies',
        'Coordinated with clients and stakeholders',
        'Managed project budgets and timelines'
      ]
    }
  ];

  const education = [
    {
      degree: 'Master of Architecture',
      institution: 'School of Planning and Architecture, New Delhi',
      year: '2016',
      specialization: 'Urban Design'
    },
    {
      degree: 'Bachelor of Architecture',
      institution: 'School of Planning and Architecture, Bhopal',
      year: '2014'
    }
  ];

  const skills = [
    'Architectural Design',
    'Urban Planning',
    'Sustainable Design',
    'Project Management',
    'AutoCAD',
    'Revit',
    'SketchUp',
    '3D Visualization',
    'Building Information Modeling (BIM)',
    'Green Building Design',
    'Construction Documentation',
    'Client Relations'
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Sustainable Urban Housing Complex',
      description: 'A large-scale residential development incorporating sustainable design principles, green spaces, and community areas. The project achieved LEED Gold certification.',
      category: 'residential',
      images: ['/project1.jpg'],
      year: 2023,
      location: 'Mumbai, India',
      area: '50,000 sq.m',
      client: 'Maharashtra Housing Development Corporation'
    },
    {
      id: 2,
      title: 'Tech Innovation Hub',
      description: 'A modern office complex designed for technology companies, featuring flexible workspaces, collaborative areas, and state-of-the-art facilities.',
      category: 'commercial',
      images: ['/project2.jpg'],
      year: 2022,
      location: 'Pune, India',
      area: '25,000 sq.m',
      client: 'Tech Park Developers'
    },
    {
      id: 3,
      title: 'Urban Renewal Project',
      description: 'Revitalization of a historic district, combining heritage conservation with modern amenities and sustainable urban design principles.',
      category: 'urban',
      images: ['/project3.jpg'],
      year: 2021,
      location: 'Delhi, India',
      area: '100,000 sq.m',
      client: 'Delhi Development Authority'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'urban', label: 'Urban Design' },
    { id: 'sustainable', label: 'Sustainable' },
    { id: 'interior', label: 'Interior Design' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Gaurav Jain</h1>
          <p className="text-xl md:text-2xl font-light mb-4">Principal Architect & Urban Designer</p>
          <p className="text-lg md:text-xl font-light mb-8 text-center max-w-2xl">
            Specializing in sustainable architecture and urban development with a focus on creating harmonious spaces
          </p>
          <a 
            href="#projects"
            className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <p className="text-gray-600 mb-4">
              As a Principal Architect with extensive experience in sustainable design and urban development,
              I bring a unique perspective to each project. My work focuses on creating spaces that are not only
              aesthetically pleasing but also environmentally conscious and functionally efficient.
            </p>
            <p className="text-gray-600 mb-6">
              With a Master's in Architecture specializing in Urban Design from SPA Delhi, I combine academic
              excellence with practical expertise to deliver innovative architectural solutions.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900">8+</h3>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                <p className="text-sm text-gray-600">Projects</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900">20+</h3>
                <p className="text-sm text-gray-600">Awards</p>
              </div>
            </div>
          </div>
          <div className="relative h-[600px]">
            <div className="absolute inset-0 bg-[url('/architect-profile.jpg')] bg-cover bg-center rounded-lg" />
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                <p className="text-lg text-gray-600 mb-2">{exp.company}</p>
                <p className="text-sm text-gray-500 mb-4">{exp.period} | {exp.location}</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-6 py-2">
                <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                <p className="text-lg text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
                {edu.specialization && (
                  <p className="text-gray-600 mt-2">Specialization: {edu.specialization}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-gray-50" id="projects">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          
          <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`px-6 py-2 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setActiveProject(project)}
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <div className="w-full h-full bg-[url('/project-placeholder.jpg')] bg-cover bg-center" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm">{project.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto" id="contact">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-600">
            Have a project in mind? I'd love to hear about it.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">gaurav@example.com</p>
              <p className="text-gray-400">+91 XXXXXXXXXX</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <p className="text-gray-400">Mumbai, Maharashtra</p>
              <p className="text-gray-400">India</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/gauravjain124/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">Behance</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Gaurav Jain Architects. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{activeProject.title}</h3>
                <button 
                  onClick={() => setActiveProject(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 mb-6">
                <div className="w-full h-full bg-[url('/project-placeholder.jpg')] bg-cover bg-center rounded-lg" />
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">{activeProject.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Location</h4>
                    <p className="text-gray-600">{activeProject.location}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Year</h4>
                    <p className="text-gray-600">{activeProject.year}</p>
                  </div>
                  {activeProject.area && (
                    <div>
                      <h4 className="font-medium text-gray-900">Area</h4>
                      <p className="text-gray-600">{activeProject.area}</p>
                    </div>
                  )}
                  {activeProject.client && (
                    <div>
                      <h4 className="font-medium text-gray-900">Client</h4>
                      <p className="text-gray-600">{activeProject.client}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 