"use client";

import React, {useEffect, useRef, useState } from "react";
import {
  Zap,
  Menu,
  X,
  Users,
  BarChart2,
  Clock,
  MessageSquare,
  Layers,
  Shield,
  Database,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Send,
} from "lucide-react";
import Link from "next/link";

// Testimonials data
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Sales Director",
    company: "TechGrowth Inc.",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Zoro CRM has transformed our sales process. Our team is more organized, and we've seen a 40% increase in closed deals since implementation.",
    stars: 5,
  },
  {
    name: "Michael Chen",
    role: "Customer Success Manager",
    company: "InnovateX",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "The customer management features are intuitive and powerful. We're able to provide better support and track customer satisfaction more effectively.",
    stars: 5,
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Director",
    company: "GrowthMasters",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800",
    quote:
      "Zoro CRM's integration capabilities have allowed us to create seamless marketing campaigns that directly connect to our sales pipeline.",
    stars: 4,
  },
];

const prices = {
  starter: { annual: 12, monthly: 15 },
  professional: { annual: 39, monthly: 49 },
  enterprise: { annual: 79, monthly: 99 },
};

const faqs = [
  {
    question: "How easy is it to get started with Zoro CRM?",
    answer:
      "Getting started with Zoro CRM is incredibly simple. Sign up for an account, and our onboarding process will guide you through setting up your workspace. You can import your existing contacts, customize your pipeline, and be up and running in just a few minutes.",
  },
  {
    question: "Can I import my existing customer data?",
    answer:
      "Yes, Zoro CRM makes it easy to import your existing customer data from CSV files, Excel spreadsheets, or directly from other popular CRM platforms. Our import wizard will guide you through mapping your fields and ensuring a smooth transition.",
  },
  {
    question: "How secure is my data with Zoro CRM?",
    answer:
      "Security is our top priority. We use enterprise-grade encryption for all data, both in transit and at rest. We're compliant with major security standards, implement strict access controls, and regularly perform security audits to ensure your data remains protected.",
  },
  {
    question: "What kind of support does Zoro CRM offer?",
    answer:
      "We offer multiple support channels including email, live chat, and phone support depending on your plan. Our knowledge base contains detailed guides and tutorials, and our customer success team is always ready to help you get the most out of Zoro CRM.",
  },
];

export default function HomePage() {
  // State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(true);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [openFaqs, setOpenFaqs] = useState(Array(faqs.length).fill(false));
  const navbarRef = useRef<HTMLElement | null>(null);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => {
      const navbar = navbarRef.current;

      if (!navbar) return;

      if (window.scrollY > 10) {
        navbar.classList.add("bg-white", "shadow-md", "py-2");
        navbar.classList.remove("py-4");
      } else {
        navbar.classList.remove("bg-white", "shadow-md", "py-2");
        navbar.classList.add("py-4");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest("a[href^='#']");
      if (anchor) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        setMobileMenuOpen(false);
      }
    };
    document.body.addEventListener("click", handler);
    return () => document.body.removeEventListener("click", handler);
  }, []);

  // Copyright year
  const currentYear = new Date().getFullYear();

  // Handlers
  const handleFaqClick = (idx) => {
    setOpenFaqs((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  // Pricing toggle handler
  const handlePricingToggle = (annual) => setIsAnnual(annual);

  // Testimonials
  const currentTestimonial = testimonials[testimonialIdx];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav
        ref={navbarRef}
        className="fixed w-full z-50 transition-all duration-300 py-4"
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <Zap className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Zoro CRM
                </span>
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
              <Link href={"/login"} className="btn btn-secondary">
                Login
              </Link>
              <button className="btn btn-primary">Get Started</button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="text-gray-700 hover:text-orange-500 focus:outline-none"
                aria-label="Open menu"
                id="menuButton"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4" id="mobileMenu">
              <a
                href="#features"
                className="block text-gray-700 hover:text-orange-500 py-2 transition-colors"
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="block text-gray-700 hover:text-orange-500 py-2 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="block text-gray-700 hover:text-orange-500 py-2 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="block text-gray-700 hover:text-orange-500 py-2 transition-colors"
              >
                FAQ
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-orange-500 py-2 transition-colors"
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <button className="btn btn-secondary">Login</button>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-16 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Streamline Your{" "}
                  <span className="text-orange-500">
                    Customer Relationships
                  </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
                  Zoro CRM helps businesses build stronger customer
                  relationships, increase sales, and improve customer
                  satisfaction with our intuitive and powerful platform.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="btn btn-primary btn-lg flex items-center">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="btn btn-secondary btn-lg">
                    Schedule Demo
                  </button>
                </div>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                      <Users className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        10,000+
                      </p>
                      <p className="text-sm text-gray-500">Active Users</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                      <BarChart2 className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">35%</p>
                      <p className="text-sm text-gray-500">Sales Increase</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                      <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        5 minutes
                      </p>
                      <p className="text-sm text-gray-500">Setup Time</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 mt-12 lg:mt-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-xl blur-lg opacity-30"></div>
                  <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Zoro CRM Dashboard"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Everything You Need to{" "}
                <span className="text-orange-500">
                  Manage Customer Relationships
                </span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Zoro CRM provides all the tools you need to attract, engage, and
                delight your customers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 8 Features */}
              {[
                {
                  icon: <Users />,
                  title: "Contact Management",
                  desc: "Easily organize and manage your contacts with comprehensive profiles and interaction history.",
                },
                {
                  icon: <BarChart2 />,
                  title: "Sales Pipeline",
                  desc: "Track deals through your sales process with customizable pipelines and stages.",
                },
                {
                  icon: <Clock />,
                  title: "Task Management",
                  desc: "Never miss a follow-up with automated reminders and task assignments.",
                },
                {
                  icon: <MessageSquare />,
                  title: "Communication Tools",
                  desc: "Engage with customers through integrated email, chat, and call tracking.",
                },
                {
                  icon: <Layers />,
                  title: "Custom Workflows",
                  desc: "Automate repetitive tasks with customizable workflows and triggers.",
                },
                {
                  icon: <Shield />,
                  title: "Data Security",
                  desc: "Keep your customer data secure with enterprise-grade security measures.",
                },
                {
                  icon: <Zap />,
                  title: "Integration Ecosystem",
                  desc: "Connect with your favorite tools and apps for a seamless workflow.",
                },
                {
                  icon: <Database />,
                  title: "Advanced Analytics",
                  desc: "Gain insights into customer behavior and sales performance with detailed reports.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:border-orange-200 hover:-translate-y-1"
                >
                  <div className="bg-orange-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {React.cloneElement(f.icon, {
                      className: "h-6 w-6 text-orange-500",
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Trusted by{" "}
                <span className="text-orange-500">Leading Companies</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                See what our customers have to say about their experience with
                Zoro CRM.
              </p>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-orange-100">
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-center mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < currentTestimonial.stars ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            fill={
                              i < currentTestimonial.stars ? "#facc15" : "none"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-600">{currentTestimonial.role}</p>
                      <p className="text-orange-500 font-medium">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <blockquote>
                      <p className="text-xl text-gray-700 italic">
                        &quot;{currentTestimonial.quote}&quot;
                      </p>
                    </blockquote>
                  </div>
                </div>
                <div className="flex justify-center mt-8 space-x-4">
                  <button
                    className="p-2 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
                    aria-label="Previous"
                    onClick={() =>
                      setTestimonialIdx(
                        (idx) =>
                          (idx - 1 + testimonials.length) % testimonials.length
                      )
                    }
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="flex space-x-2 items-center">
                    {testimonials.map((_, i) => (
                      <span
                        key={i}
                        className={`block h-2 w-2 rounded-full ${i === testimonialIdx ? "bg-orange-500" : "bg-orange-200"}`}
                      />
                    ))}
                  </div>
                  <button
                    className="p-2 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
                    aria-label="Next"
                    onClick={() =>
                      setTestimonialIdx(
                        (idx) => (idx + 1) % testimonials.length
                      )
                    }
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Simple,{" "}
                <span className="text-orange-500">Transparent Pricing</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Choose the plan that works best for your business needs.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="bg-gray-100 p-1 rounded-full inline-flex items-center">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium ${isAnnual ? "bg-orange-500 text-white" : "text-gray-700 hover:text-orange-500"}`}
                    onClick={() => handlePricingToggle(true)}
                  >
                    Annual (Save 20%)
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium ${!isAnnual ? "bg-orange-500 text-white" : "text-gray-700 hover:text-orange-500"}`}
                    onClick={() => handlePricingToggle(false)}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Starter */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 shadow">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${prices.starter[isAnnual ? "annual" : "monthly"]}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /mo {isAnnual ? "billed annually" : ""}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Perfect for small businesses and startups
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[
                      "Up to 1,000 contacts",
                      "Basic contact management",
                      "Email integration",
                      "Task management",
                      "5 user seats",
                      "Standard support",
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500" />
                        <p className="ml-3 text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button className="btn btn-secondary w-full">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
              {/* Professional */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border-2 border-orange-500 shadow-lg relative">
                <div className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-1 text-center">
                  Most Popular
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Professional
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${prices.professional[isAnnual ? "annual" : "monthly"]}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /mo {isAnnual ? "billed annually" : ""}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    Ideal for growing businesses
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[
                      "Up to 25,000 contacts",
                      "Advanced contact management",
                      "Email and SMS integration",
                      "Sales pipelines",
                      "Custom dashboards",
                      "15 user seats",
                      "Priority support",
                      "API access",
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500" />
                        <p className="ml-3 text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button className="btn btn-primary w-full">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
              {/* Enterprise */}
              <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-200 shadow">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Enterprise
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${prices.enterprise[isAnnual ? "annual" : "monthly"]}
                    </span>
                    <span className="ml-1 text-xl font-medium text-gray-500">
                      /mo {isAnnual ? "billed annually" : ""}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">
                    For large organizations with complex needs
                  </p>
                  <ul className="mt-8 space-y-4">
                    {[
                      "Unlimited contacts",
                      "Advanced analytics",
                      "Dedicated account manager",
                      "Custom integrations",
                      "Unlimited user seats",
                      "SLA guarantees",
                      "Advanced security features",
                      "AI-powered insights",
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500" />
                        <p className="ml-3 text-gray-700">{item}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button className="btn btn-secondary w-full">
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked{" "}
                <span className="text-orange-500">Questions</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about Zoro CRM.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.question}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300"
                >
                  <button
                    className="faq-button flex justify-between items-center w-full px-6 py-4 text-left text-gray-900 font-medium focus:outline-none"
                    onClick={() => handleFaqClick(idx)}
                  >
                    <span>{faq.question}</span>
                    {openFaqs[idx] ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  <div
                    className="faq-answer px-6 overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openFaqs[idx] ? "500px" : "0",
                      paddingBottom: openFaqs[idx] ? "1.5rem" : "0",
                    }}
                  >
                    <p className="text-gray-600 pb-6">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ready to <span className="text-orange-500">Transform</span> Your
                Customer Relationships?
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Contact us today to learn how Zoro CRM can help your business
                grow.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-orange-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Get in Touch
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                        <Mail className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          Email Us
                        </h4>
                        <p className="mt-1 text-gray-600">info@zoro-crm.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                        <Phone className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          Call Us
                        </h4>
                        <p className="mt-1 text-gray-600">+1 (888) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-orange-100 rounded-full p-3">
                        <MapPin className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-medium text-gray-900">
                          Visit Us
                        </h4>
                        <p className="mt-1 text-gray-600">
                          123 Business Ave, Suite 500
                          <br />
                          San Francisco, CA 94107
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center">
                <Zap className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-xl font-bold text-white">
                  Zoro CRM
                </span>
              </div>
              <p className="mt-4 text-gray-400 max-w-md">
                Zoro CRM helps businesses build stronger customer relationships,
                increase sales, and improve customer satisfaction with our
                intuitive and powerful platform.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Press
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Enterprise
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {currentYear} Zoro CRM. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-orange-500 text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Contact form as component
function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", company: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Send Us a Message
      </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            placeholder="john@example.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            placeholder="Your Company"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </button>
          {sent && (
            <div className="mt-3 text-green-600">
              Thank you for your message. We will get back to you shortly!
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
