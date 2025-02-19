import { useState } from "react";
import {
  Linkedin,
  Rocket,
  Brain,
  Calendar,
  BarChart,
  Zap,
  ChevronDown,
  ChevronUp,
  Check,
  Youtube,
  Twitter,
  Facebook,
  Instagram,
  Clock,
  Target,
} from "lucide-react";
function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: <Youtube />,
      title: "Multi-source Integration",
      description:
        "Import content from YouTube, files, images, and social media to create engaging posts.",
    },
    {
      icon: <Brain />,
      title: "AI-powered Generation",
      description:
        "Let our advanced AI create professional posts tailored to your audience.",
    },
    {
      icon: <Linkedin />,
      title: "LinkedIn Direct Connection",
      description:
        "Seamlessly publish posts directly to your LinkedIn profile or company page.",
    },
    {
      icon: <Calendar />,
      title: "Smart Scheduling",
      description: "Schedule posts at optimal times for maximum engagement.",
    },
    {
      icon: <BarChart />,
      title: "Analytics & Insights",
      description: "Track performance and optimize your content strategy.",
    },
    {
      icon: <Zap />,
      title: "Quick Optimization",
      description: "Instant suggestions to improve engagement and reach.",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Connect Your Account",
      description: "Link your LinkedIn profile or company page securely.",
    },
    {
      number: "2",
      title: "Generate Content",
      description:
        "Use AI to create engaging posts or import from various sources.",
    },
    {
      number: "3",
      title: "Review & Schedule",
      description: "Edit your posts and schedule them for optimal times.",
    },
    {
      number: "4",
      title: "Track & Optimize",
      description: "Monitor performance and improve your strategy.",
    },
  ];

  const testimonials = [
    {
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=60&h=60&q=80",
      name: "Sarah Johnson",
      title: "Marketing Director",
      company: "TechCorp",
      quote:
        "PostAI has transformed our LinkedIn strategy. We've seen a 300% increase in engagement since using the platform.",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&h=60&q=80",
      name: "Michael Chen",
      title: "CEO",
      company: "StartupHub",
      quote:
        "The AI-generated content is incredibly natural and engaging. It saves our team hours every week.",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=60&h=60&q=80",
      name: "David Miller",
      title: "Sales Director",
      company: "GrowthCo",
      quote:
        "Our lead generation has improved significantly since we started using PostAI for our LinkedIn content.",
    },
  ];

  const pricing = [
    {
      name: "Free",
      price: isAnnual ? "0" : "0",
      features: [
        "5 AI-generated posts per month",
        "Basic analytics",
        "Manual posting",
        "Standard support",
      ],
    },
    {
      name: "Pro",
      price: isAnnual ? "29" : "39",
      featured: true,
      features: [
        "Unlimited AI-generated posts",
        "Advanced analytics",
        "Auto-scheduling",
        "Priority support",
        "Multi-source integration",
        "Custom templates",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom AI training",
        "API access",
        "SSO integration",
        "Custom contracts",
      ],
    },
  ];

  const faqs = [
    {
      question: "How does the AI generate LinkedIn posts?",
      answer:
        "Our AI analyzes your industry, target audience, and content preferences to generate engaging posts. It learns from successful content patterns and incorporates your brand voice.",
    },
    {
      question: "Can I edit the AI-generated content?",
      answer:
        "Yes, you have full control to edit, modify, or enhance any AI-generated content before publishing.",
    },
    {
      question: "Is my LinkedIn account secure?",
      answer:
        "Absolutely. We use OAuth2 for secure authentication and never store your LinkedIn passwords.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime from your account settings. No long-term commitments required.",
    },
    {
      question: "Do you offer a free trial?",
      answer:
        "Yes, we offer a 14-day free trial of our Pro plan with all features included.",
    },
    {
      question: "Can I schedule posts in advance?",
      answer:
        "Yes, you can schedule posts weeks or months in advance and our AI will suggest optimal posting times.",
    },
  ];

  return (
    <div>
      {/* Navigation */}
      <nav className="nav bg-slate-600">
        <div className="container nav-container">
          <a href="/" className="nav-logo">
            <Linkedin size={32} className="text-primary" />
            <span>PostAI</span>
          </a>
          <div className="nav-menu">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <button className="button button-primary">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in">
            <h1>Create Engaging LinkedIn Posts with AI</h1>
            <p className="text-gray mb-lg">
              Generate professional, high-performing content in seconds
            </p>
            <div className="hero-buttons">
              <button className="button button-primary">
                <Rocket size={20} className="mr-2" />
                Try For Free
              </button>
              <button className="button button-secondary">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-xl">
            <h2>Why Consistent LinkedIn Posting Matters</h2>
            <p className="text-gray">
              Creating engaging LinkedIn content is challenging and
              time-consuming
            </p>
          </div>
          <div className="grid grid-3">
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>Time Consuming</h3>
              <p>Writing quality posts daily takes hours of valuable time</p>
            </div>
            <div className="feature-card">
              <Target className="feature-icon" />
              <h3>Inconsistent Results</h3>
              <p>It's hard to maintain quality and engagement over time</p>
            </div>
            <div className="feature-card">
              <Brain className="feature-icon" />
              <h3>Creative Block</h3>
              <p>Coming up with fresh ideas consistently is challenging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="container">
          <div className="text-center mb-xl">
            <h2>Powerful Features for LinkedIn Success</h2>
            <p className="text-gray">
              Everything you need to create engaging content
            </p>
          </div>
          <div className="grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="text-center mb-xl">
            <h2>How It Works</h2>
            <p className="text-gray">Get started in four simple steps</p>
          </div>
          <div className="grid grid-4">
            {steps.map((step, index) => (
              <div key={index} className="feature-card text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-md">
                  {step.number}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gray-100">
        <div className="container">
          <div className="text-center mb-xl">
            <h2>Trusted by Professionals</h2>
            <p className="text-gray">See what our users have to say</p>
          </div>
          <div className="grid grid-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <h3 className="mb-sm">{testimonial.name}</h3>
                    <p className="text-gray">
                      {testimonial.title} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p>"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="text-center mb-xl">
            <h2>Simple, Transparent Pricing</h2>
            <p className="text-gray">Choose the plan that's right for you</p>
            <div className="flex items-center justify-center gap-4 mt-lg">
              <span className={!isAnnual ? "text-primary" : "text-gray"}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-16 h-8 bg-primary rounded-full relative"
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-all ${
                    isAnnual ? "left-9" : "left-1"
                  }`}
                />
              </button>
              <span className={isAnnual ? "text-primary" : "text-gray"}>
                Annual (Save 20%)
              </span>
            </div>
          </div>
          <div className="grid grid-3">
            {pricing.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card ${plan.featured ? "featured" : ""}`}
              >
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="pricing-price">
                    {plan.price === "Custom" ? (
                      "Custom"
                    ) : (
                      <>
                        ${plan.price}
                        <span className="text-gray-500 text-lg">/mo</span>
                      </>
                    )}
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex}>
                      <Check size={20} className="text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`button w-full ${
                    plan.featured ? "button-primary" : "button-secondary"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-gray-100">
        <div className="container">
          <div className="text-center mb-xl">
            <h2>Frequently Asked Questions</h2>
            <p className="text-gray">
              Everything you need to know about PostAI
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeFaq === index ? "active" : ""}`}
              >
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  {activeFaq === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                <div className="faq-answer">{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
        <div className="container text-center">
          <h2>Elevate Your LinkedIn Presence Today</h2>
          <p className="text-gray mb-lg">
            Join thousands of professionals using PostAI to create engaging
            content
          </p>
          <div className="flex justify-center gap-4">
            <button className="button button-primary">
              Start Creating Posts
            </button>
            <button className="button button-secondary">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="/" className="nav-logo mb-md">
                <Linkedin size={32} className="text-primary" />
                <span>PostAI</span>
              </a>
              <p className="text-gray mb-md">
                AI-powered LinkedIn content creation platform for professionals
                and businesses.
              </p>
              <div className="flex gap-4">
                <Twitter size={20} className="text-gray-500" />
                <Facebook size={20} className="text-gray-500" />
                <Instagram size={20} className="text-gray-500" />
                <Linkedin size={20} className="text-gray-500" />
              </div>
            </div>
            <div>
              <h4>Product</h4>
              <ul className="footer-links">
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
                <li>
                  <a href="#how-it-works">How It Works</a>
                </li>
                <li>
                  <a href="#roadmap">Roadmap</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul className="footer-links">
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#careers">Careers</a>
                </li>
                <li>
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <a href="#press">Press</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul className="footer-links">
                <li>
                  <a href="#privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="#terms">Terms of Service</a>
                </li>
                <li>
                  <a href="#security">Security</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-xl">
            <p className="text-gray">© 2024 PostAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
