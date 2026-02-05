import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Palette, 
  Box, 
  Menu, 
  X, 
  ExternalLink, 
  Mail, 
  Linkedin, 
  Github, 
  Facebook,
  Award,
  Monitor,
  Brush,
  User,
  Layers,
  Cpu,
  FileText,
  Download,
  Briefcase,
  GraduationCap,
  Phone,
  Database,
  Layout,
  Plus,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
  Type
} from 'lucide-react';

// --- Data & Content ---

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'web', label: 'Websites', icon: <Monitor size={16} /> },
  { id: 'cert', label: 'Certifications', icon: <Award size={16} /> },
  { id: 'traditional', label: 'Traditional Arts', icon: <Brush size={16} /> },
  { id: '3d', label: '3D/Animation', icon: <Box size={16} /> },
  { id: 'digital', label: 'Digital Art / Graphic Designs', icon: <Layers size={16} /> },
];

const INITIAL_PORTFOLIO_ITEMS = [];

const EXPERIENCE = [
  {
    id: 1,
    role: 'Freelance Software Developer',
    company: 'Self-Employed',
    period: '2022 - Present',
    description: 'Developing and designing interactive and user-friendly web application and desktop software.',
    skills: ['React.js', 'Node.js', 'C#', 'Java']
  },
  {
    id: 2,
    role: 'Freelance Graphic Designer & Digital Artist',
    company: 'Self-Employed',
    period: '2023 - Present',
    description: 'Designing logos, branding materials, digital artwork, and creative graphics for various clients and projects.',
    skills: ['Photoshop', 'Illustrator', 'Figma', 'Branding']
  },
  {
    id: 3,
    role: 'Freelance Traditional Artist',
    company: 'Self-Employed',
    period: '2016 - Present',
    description: 'Creating realistic acrylic and charcoal portraits, canvas paintings, and custom mural works for commissioned projects.',
    skills: ['Acrylic', 'Charcoal', 'Mural', 'Canvas']
  }
];

const SKILLS = {
  languages: {
    title: 'Languages',
    icon: <Code size={20} />,
    items: ['JavaScript', 'TypeScript', 'C#', 'Java', 'HTML5']
  },
  backend: {
    title: 'Backend & Databases',
    icon: <Database size={20} />,
    items: ['Node.js', 'Express.js', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase']
  },
  frontend: {
    title: 'Frontend & Design',
    icon: <Layout size={20} />,
    items: ['React.js', 'Tailwind CSS', 'Adobe Photoshop', 'Illustrator', 'Blender', 'Figma', 'Canva']
  }
};

// --- Components ---

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center group">
          <img 
            src="/Crown_Logo.svg" 
            alt="VVV Logo" 
            className="h-10 w-auto group-hover:scale-110 transition-transform"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-indigo-500 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="px-5 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full transition-all hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-300 hover:text-white font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-20">
    {/* Background Glows */}
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />
    
    <div className="container mx-auto px-6 relative z-10 text-center">
      {/* Replaced Text with Big Logo */}
      <div className="mb-4 flex justify-center">
        <img 
          src="/Crown_Logo.svg" 
          alt="Victory Crown Logo" 
          className="h-[512px] w-auto object-contain drop-shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
        VINCENT VELASCO VILA
      </h1>
      
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-8 opacity-50"></div>
      
      <p className="text-xl md:text-2xl text-slate-400 mb-8 font-light max-w-3xl mx-auto">
        Merging logic with creativity. 
        <span className="block mt-2 text-white font-medium">Software Developer | Traditional & Digital Artist</span>
      </p>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
      <span className="text-xs uppercase tracking-widest"></span>
      <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent"></div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-slate-950 relative">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[600px]">
            <img 
              src="/VincentVila.jpg" 
              alt="Vincent Velasco Vila" 
              className="w-full h-full object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-500"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" style={{ transform: 'translateZ(0)' }}></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-xl pointer-events-none" style={{ transform: 'translateZ(0)' }}></div>
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Intersection of <span className="text-indigo-400">Code</span> & <span className="text-purple-400">Canvas</span>.
          </h2>
          <p className="text-slate-400 leading-relaxed mb-6 text-lg">
            My name is Vincent Velasco Vila. I am a multidisciplinary professional who believes that technology and art are not mutually exclusive. With a background in Information Technology majoring in Animation, I possess the unique ability to build robust software solutions while maintaining a high standard for visual fidelity and motion.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
                <Cpu size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Software Development</h4>
                <p className="text-slate-500 text-sm mt-1">Specializing in Node.js, React, and modern web architectures. Building scalable, performant applications.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-purple-400">
                <Brush size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-lg">Creative Arts</h4>
                <p className="text-slate-500 text-sm mt-1">From traditional oil portraits to complex 3D models and digital paintings. I bring visions to life.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Portfolio = ({ portfolioItems = [] }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  // Image Viewer Component
  const ImageViewer = ({ project, onClose }) => {
    if (!project) return null;
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = project.images && project.images.length > 0 ? project.images : [project.image];
    
    // Lock scroll position when modal opens
    useEffect(() => {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }, []);
    
    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    
    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div 
        className="fixed inset-0 z-[60] backdrop-blur-xl bg-slate-950/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200"
        onClick={onClose}
      >
        {/* Main Container */}
        <div className="w-full max-w-7xl h-[85vh] flex gap-0 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800" onClick={(e) => e.stopPropagation()}>
            
            {/* Image Section - Left Side */}
            <div className="flex-1 relative bg-slate-900 flex items-center justify-center">
              
              {/* Previous Button */}
              {images.length > 1 && (
                <button
                  onClick={prevImage}
                  className="absolute left-6 p-4 bg-slate-950/80 hover:bg-slate-900 rounded-full transition-all text-white z-10 border border-slate-700 hover:scale-110"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}

              {/* Image Display */}
              <div className="w-full h-full flex items-center justify-center overflow-hidden p-8">
                <img 
                  src={images[currentIndex]} 
                  alt={`${project.title} ${currentIndex + 1}`} 
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Next Button */}
              {images.length > 1 && (
                <button
                  onClick={nextImage}
                  className="absolute right-6 p-4 bg-slate-950/80 hover:bg-slate-900 rounded-full transition-all text-white z-10 border border-slate-700 hover:scale-110"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}

              {/* Slide Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex 
                          ? 'bg-indigo-500 w-8' 
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Info Panel - Right Side */}
            <div className="w-full md:w-[400px] bg-slate-950 flex flex-col p-8 border-l border-slate-800">
              
              {/* Category Badge */}
              <div className="mb-6">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  {CATEGORIES.find(c => c.id === project.category)?.label}
                </span>
              </div>

              {/* Project Title */}
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h2>

              {/* Description */}
              {project.description && (
                <div className="mb-6">
                  <p className="text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              )}

              {/* Tags Section */}
              {project.tags && project.tags.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-sm font-medium hover:border-indigo-500/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Spacer */}
              <div className="flex-1"></div>

              {/* View Live Project Button */}
              {project.link && (
                <a
                  href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30"
                >
                  <ExternalLink size={20} />
                  View Live Project
                </a>
              )}
            </div>
          </div>
      </div>
    );
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projects</h2>
          <p className="text-slate-400">
            A curated collection of my technical projects, artistic endeavors, and certifications.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                ${activeFilter === cat.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
            >
              {cat.icon && cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setSelectedProject(item)}
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}>
                   <p className="text-slate-300 text-sm mb-4">Click to view details</p>
                   <button className="p-3 bg-white text-slate-900 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                     <ExternalLink size={20} />
                   </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {CATEGORIES.find(c => c.id === item.category)?.label}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3 leading-tight group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Viewer */}
        {selectedProject && (
          <ImageViewer 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </section>
  );
};

const Resume = () => (
  <section id="resume" className="py-24 bg-slate-950 border-t border-slate-900">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-2xl">
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience & Education</h2>
          <p className="text-slate-400">
            A comprehensive look at my professional journey and technical arsenal.
          </p>
        </div>
        <a href="/VincentVila_Resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-6 md:mt-0 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-semibold transition-all flex items-center gap-2 group">
          <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          Download Resume
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Experience Column */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Briefcase size={20} />
            </div>
            Professional Experience
          </h3>
          
          <div className="space-y-6">
            {EXPERIENCE.map((job) => (
              <div key={job.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors group">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{job.role}</h4>
                    <p className="text-slate-400">{job.company}</p>
                  </div>
                  <span className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300 whitespace-nowrap">
                    {job.period}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Skills Column */}
        <div className="space-y-8">
          {/* Education */}
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <GraduationCap size={20} />
              </div>
              Education
            </h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white">BS Information Technology</h4>
                  <p className="text-indigo-400 text-sm font-medium">Major in Animation & Motion Graphics</p>
                  <p className="text-slate-500 text-sm mt-1">Laguna State Polytechnic University - SC</p>
                </div>
                <span className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300 whitespace-nowrap">
                  2022 - 2026
                </span>
              </div>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5" />
                  Capstone Project: "NeoArt"
                </li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                <Code size={20} />
              </div>
              Technical Arsenal
            </h3>
            <div className="space-y-4">
              {Object.entries(SKILLS).map(([key, category]) => (
                <div key={key} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3 flex items-center gap-2">
                    {category.icon} {category.title}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map(skill => (
                      <span key={skill} className="text-sm text-slate-300 hover:text-white transition-colors cursor-default">
                        {skill} <span className="text-slate-600">•</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-900/20 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" style={{ transform: 'translateZ(0)' }}></div>
        
        <div className="grid md:grid-cols-2 gap-12 relative z-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Let's create something extraordinary.</h2>
            <p className="text-slate-400 mb-8">
              Whether you need a full-stack web application, a 3D model, or a digital portrait, I am currently available for freelance work and full-time opportunities.
            </p>
            
            <div className="space-y-4">
              <a href="mailto:vincent.vila00@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-indigo-400 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-indigo-500 group-hover:bg-indigo-500/10">
                  <Mail size={18} />
                </div>
                <span className="font-medium">vincent.vila00@gmail.com</span>
              </a>
              
              <a href="tel:09669085642" className="flex items-center gap-4 text-slate-300 hover:text-indigo-400 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-indigo-500 group-hover:bg-indigo-500/10">
                  <Phone size={18} />
                </div>
                <span className="font-medium">0966 908 5642</span>
              </a>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <Box size={18} />
                </div>
                <span className="font-medium">Laguna, Philippines</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <a href="https://github.com/penzero00" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white hover:-translate-y-1 transition-all">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/vincent-vila-ba829727a" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white hover:-translate-y-1 transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://www.facebook.com/vncntvv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-slate-700 hover:text-white hover:-translate-y-1 transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            const email = e.target.elements.email.value;
            const message = e.target.elements.message.value;
            const subject = `Portfolio Inquiry from ${name}`;
            const body = `Name: ${name}%0DEmail: ${email}%0D%0DMessage:%0D${message}`;
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=vincent.vila00@gmail.com&su=${encodeURIComponent(subject)}&body=${body}`, '_blank');
          }}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Name</label>
              <input type="text" name="name" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <input type="email" name="email" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
              <textarea name="message" rows="4" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-indigo-500/20">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const UploadSection = ({ onProjectUpload }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: 'web',
    description: '',
    link: '',
    tags: ''
  });
  const [uploadMessage, setUploadMessage] = useState('');
  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = [];
      let loadedCount = 0;
      
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          loadedCount++;
          
          if (loadedCount === files.length) {
            setImagePreviews(prev => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="py-24 bg-slate-900 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Plus className="text-indigo-400" /> Upload Project
            </h2>
            <p className="text-slate-400 text-sm">Add a new item to your portfolio showcase.</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-xl">
            <form className="space-y-6">
              
              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Project Images {imagePreviews.length > 0 && <span className="text-indigo-400">({imagePreviews.length} {imagePreviews.length === 1 ? 'image' : 'images'}) - First is thumbnail</span>}</label>
                
                {/* Image Preview Grid */}
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-slate-800" />
                        {index === 0 && (
                          <div className="absolute top-1 left-1 bg-indigo-600 text-white text-xs px-2 py-1 rounded">Thumbnail</div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Upload Button */}
                <div className="relative group">
                  <div className="w-full h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all border-slate-800 bg-slate-900/50 hover:border-indigo-500/50 hover:bg-slate-900"
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <div className="text-center p-6">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                        <ImageIcon size={24} />
                      </div>
                      <p className="text-slate-300 font-medium">{imagePreviews.length > 0 ? 'Add more images' : 'Click to upload images'}</p>
                      <p className="text-slate-500 text-xs mt-1">SVG, PNG, JPG or GIF (max. 5MB each) - Multiple allowed</p>
                    </div>
                  </div>
                  <input id="file-upload" type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Type size={14} /> Project Title
                  </label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="e.g. Neon City" required />
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Layers size={14} /> Category
                  </label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none">
                    {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <FileText size={14} /> Description
                </label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  rows="4"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none" 
                  placeholder="Describe your project in detail..."
                />
              </div>

              {/* Link */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <LinkIcon size={14} /> Project Link
                </label>
                <input type="url" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="https://example.com" />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Tag size={14} /> Tags
                </label>
                <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="React, Blender, Design (comma separated)" required />
              </div>

              {uploadMessage && (
                <div className={`p-4 rounded-lg text-center ${uploadMessage.includes('successfully') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {uploadMessage}
                </div>
              )}

              <button type="button" onClick={async () => {
                if (imagePreviews.length === 0 || !formData.title || !formData.tags) {
                  setUploadMessage('Please fill in all fields and upload at least one image');
                  return;
                }
                
                try {
                  // Create FormData for multipart upload with multiple files
                  const uploadData = new FormData();
                  
                  // Convert all base64 images to blobs and append with iteration
                  for (let i = 0; i < imagePreviews.length; i++) {
                    const response = await fetch(imagePreviews[i]);
                    const blob = await response.blob();
                    uploadData.append('images', blob, `${formData.title}-${i + 1}.png`);
                  }
                  
                  uploadData.append('category', formData.category);
                  uploadData.append('title', formData.title);
                  uploadData.append('description', formData.description);
                  uploadData.append('link', formData.link);
                  uploadData.append('tags', formData.tags);
                  uploadData.append('imageCount', imagePreviews.length);
                  
                  // Upload to server
                  const uploadResponse = await fetch(`${apiBase || ''}/api/upload`, {
                    method: 'POST',
                    body: uploadData
                  });
                  
                  if (!uploadResponse.ok) {
                    throw new Error('Upload failed');
                  }
                  
                  const uploadResult = await uploadResponse.json();
                  
                  // Use the project data returned from server (already includes tags)
                  if (onProjectUpload) {
                    onProjectUpload(uploadResult.project);
                  }
                  
                  setUploadMessage(`Project uploaded successfully with ${imagePreviews.length} image(s)!`);
                  setImagePreviews([]);
                  setFormData({ title: '', category: 'web', description: '', link: '', tags: '' });
                  setTimeout(() => setUploadMessage(''), 3000);
                } catch (error) {
                  setUploadMessage(`Error: ${error.message}`);
                  setTimeout(() => setUploadMessage(''), 3000);
                }
              }} className="w-full bg-slate-800 hover:bg-indigo-600 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 border border-slate-700 hover:border-indigo-500 flex items-center justify-center gap-2 mt-4">
                <Plus size={18} /> Add Project to Portfolio
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-950 py-8 border-t border-slate-900 text-center">
    <p className="text-slate-600 text-sm">
      &copy; {new Date().getFullYear()} Vincent Velasco Vila. All rights reserved.
    </p>
  </footer>
);

export default function App() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

  // Fetch projects from public folder on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      const apiUrl = apiBase ? `${apiBase}/api/projects` : '/api/projects';
      const fallbackUrl = `${import.meta.env.BASE_URL || '/'}projects/index.json`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API unavailable');
        const projects = await response.json();
        setPortfolioItems(projects);
        return;
      } catch (error) {
        try {
          const staticResponse = await fetch(fallbackUrl);
          if (staticResponse.ok) {
            const projects = await staticResponse.json();
            setPortfolioItems(projects);
            return;
          }
          console.error('Failed to fetch static projects:', staticResponse.status);
        } catch (staticError) {
          console.error('Failed to fetch projects:', staticError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const updateUploadVisibility = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      setShowUpload(path.includes('/v-upload') || hash.includes('v-upload'));
    };

    updateUploadVisibility();
    window.addEventListener('popstate', updateUploadVisibility);
    window.addEventListener('hashchange', updateUploadVisibility);
    return () => {
      window.removeEventListener('popstate', updateUploadVisibility);
      window.removeEventListener('hashchange', updateUploadVisibility);
    };
  }, []);

  const handleProjectUpload = (newProject) => {
    setPortfolioItems([...portfolioItems, newProject]);
  };

  return (
    <div className="font-sans antialiased text-slate-200 selection:bg-indigo-500/30">
      <Navigation />
      <Hero />
      <About />
      <Portfolio portfolioItems={portfolioItems} />
      <Resume />
      <Contact />
      {showUpload && <UploadSection onProjectUpload={handleProjectUpload} />}
      <Footer />
    </div>
  );
}
