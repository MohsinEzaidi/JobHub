import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FeaturedJobs from "@/components/FeaturedJobs";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  Shield,
  Star,
  TrendingUp,
  User,
  Heart,
  Building,
  Code,
  Palette,
  DollarSign,
  Globe,
  BarChart,
  Users,
  MessageSquare,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/contexts/NotificationContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { addNotification } = useNotification();
  const [isMounted, setIsMounted] = useState(false);
   const navigate = useNavigate();
 const [searchQuery, setSearchQuery] = useState("");
 const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (query: string, location: string) => {
    console.log("Search from home page:", query, location);
    addNotification(
      "info",
      "Search started",
      `Searching for ${query} jobs in ${location || "all locations"}`
    );
       navigate(`/jobs?q=${encodeURIComponent(query)}&loc=${encodeURIComponent(location)}`);

  };

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Easy to Use",
      description:
        "Simple and intuitive interface designed for job seekers of all levels",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Jobs",
      description:
        "All job postings are verified by real companies you can trust",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Applications",
      description:
        "Apply to multiple jobs in minutes with our streamlined process",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Personalized Matches",
      description: "Intelligent matching based on your skills and preferences",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Search",
      description:
        "Find jobs that match your skills and preferences using our powerful search filters",
      icon: <Search className="w-12 h-12" />,
    },
    {
      step: "2",
      title: "Apply",
      description:
        "Submit your application with just a few clicks using your saved profile",
      icon: <Briefcase className="w-12 h-12" />,
    },
    {
      step: "3",
      title: "Get Hired",
      description:
        "Connect with employers and land your dream job faster than ever",
      icon: <TrendingUp className="w-12 h-12" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      content:
        "JobHub helped me find my dream job in just 2 weeks! The application process was so smooth and easy.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      content:
        "I love how easy it is to search and apply for jobs. The platform is intuitive and saves me so much time.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Emily Johnson",
      role: "UX Designer",
      content:
        "Finally, a job platform that actually works! I got multiple interview calls within days of applying.",
      rating: 5,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Job Seekers" },
    { value: "12K+", label: "Companies Hiring" },
    { value: "200K+", label: "Job Listings" },
    { value: "95%", label: "Success Rate" },
  ];

  const categories = [
    { name: "Technology", icon: <Code className="w-6 h-6" />, jobs: 12400 },
    { name: "Design", icon: <Palette className="w-6 h-6" />, jobs: 7800 },
    { name: "Marketing", icon: <BarChart className="w-6 h-6" />, jobs: 9200 },
    { name: "Finance", icon: <DollarSign className="w-6 h-6" />, jobs: 6500 },
    { name: "Healthcare", icon: <Heart className="w-6 h-6" />, jobs: 11500 },
    { name: "Remote", icon: <Globe className="w-6 h-6" />, jobs: 15600 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-30"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full opacity-20"
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-60"
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full opacity-40"
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-blue-300 rounded-full opacity-50"
            animate={{
              y: [0, 12, 0],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Find Your Dream Job with{" "}
                <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text">
                  JobHub
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover thousands of job opportunities from top companies. Your
              perfect career match is just a search away.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex-1 relative group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Job title or keywords"
                         value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery, searchLocation)}
                  className="pl-10 py-4 text-lg rounded-lg border-2 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                />
              </div>
              <div className="flex-1 relative group">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  placeholder="Location"
                         value={searchLocation}
       onChange={(e) => setSearchLocation(e.target.value)}
       onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery, searchLocation)}
                  className="pl-10 py-4 text-lg rounded-lg border-2 focus:border-blue-500 transition-all duration-300 hover:shadow-md focus:shadow-lg"
                />
              </div>
              <Button
                     onClick={() => handleSearch(searchQuery, searchLocation)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Find Your Job Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-4 text-sm text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <span>
                Join 50,000job seekers who found their perfect match
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-blue-50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Why Choose JobHub?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to find your perfect job
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 group bg-white/90 backdrop-blur-sm h-full">
                  <CardContent className="p-8 text-center flex flex-col items-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Browse By Category
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Find opportunities in your field of expertise
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow text-center group">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 text-blue-600 rounded-xl mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors mx-auto">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {category.jobs.toLocaleString()} jobs
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
<section className="py-20 bg-gray-50 relative">
        <div className="absolute inset-0" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">How It Works</h2>
            <p className="text-xl text-gray-600 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Get hired in 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative animate-fade-in-up group" style={{animationDelay: `${index * 200}ms`}}>
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl text-2xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {step.step}
                  </div>
                  {/* <div className="absolute -top-2 -right-2 text-blue-200 group-hover:text-blue-300 transition-colors group-hover:scale-125 group-hover:rotate-12 duration-300">
                    {step.icon}
                  </div> */}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400 animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
          <div
            className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              What Our Users Say
            </h2>
            <p
              className="text-xl text-gray-600 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Success stories from happy job seekers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-in-up hover:-translate-y-2 group bg-white/90 backdrop-blur-sm"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-current animate-pulse group-hover:scale-110 transition-transform"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-blue-100 group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section with Login/Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin-slow"></div>
          <div
            className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/10 rounded-full animate-bounce-slow"></div>
          <div
            className="absolute bottom-1/3 left-1/5 w-4 h-4 bg-white/20 rounded-full animate-bounce-slow"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
            Ready to Find Your Dream Job?
          </h2>
          <p
            className="text-xl opacity-90 mb-12 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Join thousands of successful job seekers who found their perfect
            career match with JobNest
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group flex-1"
            >
              <UserPlus className="mr-2 w-5 h-5" />
              Sign Up Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className=" bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group flex-1"
            >
              <LogIn className="mr-2 w-5 h-5" />
              Login
            </Button>
          </div>

          <p
            className="text-sm opacity-80 mt-6 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            No credit card required • Get started in 2 minutes
          </p>
        </div>
      </section>
     <Footer/>
    </div>
  );
};

export default Home;
