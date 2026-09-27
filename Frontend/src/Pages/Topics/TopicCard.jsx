import "./TopicCard.css";

function TopicCard({
  number,
  title,
  description,
  label,
  theme = "blue",
  href = "#",
  delay = 0,
}) {
  return (
    <a
      href={href}
      className={`topic-card topic-card-${theme}`}
      style={{
        "--topic-delay": `${delay}s`,
      }}
    >
      <div className="topic-card-glow" />

      <div className="topic-card-border" />

      <div className="topic-card-top">
        <span className="topic-number">
          {number}
        </span>

        <span className="topic-label">
          {label}
        </span>
      </div>

      <div className="topic-card-content">
        <h3>
          {title}
        </h3>

        <p>
          {description}
        </p>
      </div>

      <div className="topic-card-footer">
        <span className="topic-explore">
          Explore topic
        </span>

        <span className="topic-arrow">
          →
        </span>
      </div>

      <div className="topic-watermark">
        {number}
      </div>
    </a>
  );
}

export default TopicCard;