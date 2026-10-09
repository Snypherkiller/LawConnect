import Navbar from "../../Components/Navbar/Navbar.jsx";
import TopicCard from "../Topics/TopicCard.jsx";
import HowItWorks from "../../Components/HowItWorks/HowItWorks.jsx";
import EmergencyBanner from "../../Components/EmergencyBanner/EmergencyBanner.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

import "./Landing.css";
import Hero from "../../Components/Hero/Hero.jsx";

function Landing() {
  const topics = [
    {
      number: "01",
      title: "Visa & Immigration",
      label: "Entry & Stay",
      description:
        "Understand tourist visa requirements, permitted activities, extensions and important immigration rules.",
      theme: "blue",
      href: "#",
    },
    {
      number: "02",
      title: "Driving & Rentals",
      label: "Transport",
      description:
        "Learn about foreign driving licences, vehicle rentals, road rules and what to do after an accident.",
      theme: "purple",
      href: "#",
    },
    {
      number: "03",
      title: "Police & Safety",
      label: "Protection",
      description:
        "Understand what to do during theft, harassment, police interactions or other safety-related situations.",
      theme: "cyan",
      href: "#",
    },
    {
      number: "04",
      title: "Scams & Complaints",
      label: "Consumer",
      description:
        "Find guidance for tourist scams, unfair charges, accommodation disputes and consumer complaints.",
      theme: "gold",
      href: "#",
    },
    {
      number: "05",
      title: "Drones & Restrictions",
      label: "Activities",
      description:
        "Check important requirements for drones, photography, restricted locations and regulated activities.",
      theme: "teal",
      href: "#",
    },
    {
      number: "06",
      title: "Emergency Guidance",
      label: "Urgent Help",
      description:
        "Quickly access essential contacts and practical guidance when something unexpected happens.",
      theme: "red",
      href: "#emergency",
    },
  ];

  return (
    <div className="landing-page">
      <Navbar />

      <Hero/>

      <section
        className="topics-section"
        id="topics"
      >
        <div className="topics-background-grid" />

        <div className="topics-glow topics-glow-one" />
        <div className="topics-glow topics-glow-two" />

        <div className="topics-container">
          <div className="topics-header">
            <span className="topics-eyebrow">
              EXPLORE LEGAL TOPICS
            </span>

            <h2>
              Help for the situations
              <span> travellers face.</span>
            </h2>

            <p>
              Start with one of the most common legal and regulatory topics
              tourists may encounter while travelling around Sri Lanka.
            </p>
          </div>

          <div className="topics-grid">
            {topics.map((topic, index) => (
              <TopicCard
                key={topic.number}
                number={topic.number}
                title={topic.title}
                label={topic.label}
                description={topic.description}
                theme={topic.theme}
                href={topic.href}
                delay={index * 0.1}
              />
            ))}
          </div>

          <div className="topics-bottom">
            <p>
              Can't find what you're looking for?
            </p>

            <button onClick={() => navigate("/ask")}>
  Ask LawConnect
  <span>→</span>
</button>
          </div>
        </div>
      </section>

      <HowItWorks />

      <EmergencyBanner />

      <Footer />
    </div>
  );
}

export default Landing;