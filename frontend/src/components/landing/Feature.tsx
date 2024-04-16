const features = [
  {
    title: "Automated Assistance",
    description:
      "Provides instant support for common queries and tasks, reducing the need for manual intervention and improving response times using OpenAI.",
    details: [
      "Uses LLM Model to understand user queries.",
      "Offers personalized responses based on user interactions.",
      "Integrates with knowledge bases to provide accurate information.",
    ],
  },
  {
    title: "WhatsApp Integration",
    description:
      "Expands the reach of the chatbot by leveraging the widespread use of WhatsApp as a communication platform.",
    details: [
      "Enables seamless communication through WhatsApp's interface.",
      "Supports multimedia messages, including images, videos, and documents.",
      "Allows for automated responses to be sent directly via WhatsApp.",
    ],
  },
  {
    title: "Real-time Communication",
    description:
      "Facilitates real-time communication between users and the chatbot, ensuring prompt responses and a smooth user experience.",
    details: [
      "Utilizes WebSocket technology for instant message delivery.",
      "Enables live chat sessions for interactive support.",
      "Integrates with user authentication systems for personalized experiences.",
    ],
  },
];

const Feature = () => {
  return (
    <div className="feature-container">
      <div className="feature-list">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <ul>
              {feature.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
