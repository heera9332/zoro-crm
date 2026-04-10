import React from "react";
import {
  Users,
  BarChart2,
  Clock,
  MessageSquare,
  Layers,
  Shield,
  Zap,
  Database,
} from "lucide-react";

export const hero = {
  title: { before: "Streamline Your", highlight: "Customer Relationships" },
  subtitle:
    "Zoro CRM helps businesses build stronger customer relationships, increase sales, and improve customer satisfaction with our intuitive and powerful platform.",
  ctas: { primary: "Get Started Free", secondary: "Schedule Demo" },
  stats: [
    { label: "Active Users", value: "10,000+", icon: "Users" },
    { label: "Sales Increase", value: "35%", icon: "BarChart2" },
    { label: "Setup Time", value: "5 minutes", icon: "Clock" },
  ],
};

export const featuresList = [
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
];

export const testimonials = [
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

export const prices = {
  starter: { annual: 12, monthly: 15 },
  professional: { annual: 39, monthly: 49 },
  enterprise: { annual: 79, monthly: 99 },
};

export const pricingFeatures = {
  starter: [
    "Up to 1,000 contacts",
    "Basic contact management",
    "Email integration",
    "Task management",
    "5 user seats",
    "Standard support",
  ],
  professional: [
    "Up to 25,000 contacts",
    "Advanced contact management",
    "Email and SMS integration",
    "Sales pipelines",
    "Custom dashboards",
    "15 user seats",
    "Priority support",
    "API access",
  ],
  enterprise: [
    "Unlimited contacts",
    "Advanced analytics",
    "Dedicated account manager",
    "Custom integrations",
    "Unlimited user seats",
    "SLA guarantees",
    "Advanced security features",
    "AI-powered insights",
  ],
};

export const faqs = [
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

export const contactInfo = {
  email: "info@zoro-crm.com",
  phone: "+1 (888) 123-4567",
  address: [
    "123 Business Ave, Suite 500",
    "San Francisco, CA 94107",
  ],
};

export const footer = {
  description:
    "Zoro CRM helps businesses build stronger customer relationships, increase sales, and improve customer satisfaction with our intuitive and powerful platform.",
};

export default {
  hero,
  featuresList,
  testimonials,
  prices,
  pricingFeatures,
  faqs,
  contactInfo,
  footer,
};
