import classes from "../UI/feature/feature.module.css";
import { Ellipse5Icon } from '../UI/feature/Ellipse5Icon.tsx';
import { Ellipse6Icon } from '../UI/feature/Ellipse6Icon.tsx';
import { Ellipse8Icon } from '../UI/feature/Ellipse8Icon.tsx';
import { Ellipse9Icon } from '../UI/feature/Ellipse9Icon.tsx';
import { Ellipse10Icon } from '../UI/feature/Ellipse10Icon.tsx';
import { Ellipse11Icon } from '../UI/feature/Ellipse11Icon.tsx';

const Feature = () => {
  return (
      <div className={classes.root}>
          <div className={classes.ellipse8}>
              <Ellipse8Icon className={classes.icon}/>
          </div>
          <div className={classes.ellipse9}>
              <Ellipse9Icon className={classes.icon2}/>
          </div>
          <div className={classes.ellipse11}>
              <Ellipse11Icon className={classes.icon3}/>
          </div>
          <div className={classes.ellipse6}>
              <Ellipse6Icon className={classes.icon4}/>
          </div>
          <div className={classes.ellipse10}>
              <Ellipse10Icon className={classes.icon5}/>
          </div>
          <div className={classes.ellipse5}>
              <Ellipse5Icon className={classes.icon7}/>
          </div>
          <div className={classes.rectangle18}>
          <div className={classes.automatedAssistance}>Automated Assistance</div>
          <div className={classes.loremIpsumDolorSitAmetConsecte2}>
              Provides instant support for common queries and tasks, reducing the need for manual intervention and improving response times using OpenAI.
              <li>Uses LLM Model to understand user queries.</li>
              <li>Offers personalized responses based on user interactions.</li>
              <li>Integrates with knowledge bases to provide accurate information.</li>
          </div>
          </div>
          <div className={classes.rectangle19}>
          <div className={classes.whatSAppIntegration}>What’s App Integration</div>
          <div className={classes.loremIpsumDolorSitAmetConsecte3}>
              Expands the reach of the chatbot by leveraging the widespread use of WhatsApp as a communication platform.
              <li>Enables seamless communication through WhatsApp's interface.</li>
              <li>Supports multimedia messages, including images, videos, and documents.</li>
              <li>Allows for automated responses to be sent directly via WhatsApp.</li>
          </div>
          </div>
          <div className={classes.rectangle20}>
          <div className={classes.realTimeCommunication}>
              Real-time Communication
          </div>
          <div className={classes.loremIpsumDolorSitAmetConsecte4}>
              Facilitates real-time communication between users and the chatbot, ensuring prompt responses and a smooth user experience.
              <li>Utilizes WebSocket technology for instant message delivery.</li>
              <li>Enables live chat sessions for interactive support.</li>
              <li>Integrates with user authentication systems for personalized experiences.</li>
          </div>
          </div>
      </div>
  );
};

export default Feature;
