import { messaging } from "../../../assets/icons/index.ts";

const features = [
  {
    title: "Automated Assistance",
    description:
      "Provides instant support for common queries and tasks, reducing the need for manual intervention and improving response times using OpenAI.",
  },
  {
    title: "WhatsApp Integration",
    description:
      "Expands the reach of the chatbot by leveraging the widespread use of WhatsApp as a communication platform.",
  },
  {
    title: "Real-time Communication",
    description:
      "Facilitates real-time communication between users and the chatbot, ensuring prompt responses and a smooth user experience.",
  },
];

const Feature = () => {
  return (
    <div className="feature-list">
      <div className="feature-card">
        {features.map((feature, index) => (
          <div  key={index}>
              <li key={index}>{feature.title}</li>
          </div>
        ))}
      </div>
      <div className="feature-image">
        <img src={messaging} alt={"sa"} />
      </div>
    </div>
  );
};

export default Feature;
