import classes from "../UI/about/about.module.css";
import { Ellipse1Icon } from '../UI/about/Ellipse1Icon.tsx';
import { Ellipse2Icon } from '../UI/about/Ellipse2Icon.tsx';
import { Ellipse3Icon } from '../UI/about/Ellipse3Icon.tsx';
import { Ellipse4Icon } from '../UI/about/Ellipse4Icon.tsx';
import { Ellipse5Icon } from '../UI/about/Ellipse5Icon.tsx';
const AboutUs = () => {
  return (
      <div className={classes.root}>
          <div className={classes.ellipse2}>
              <Ellipse2Icon className={classes.icon}/>
          </div>
          <div className={classes.ellipse5}>
              <Ellipse5Icon className={classes.icon2}/>
          </div>
          <div className={classes.ellipse4}>
              <Ellipse4Icon className={classes.icon3}/>
          </div>
          <div className={classes.ellipse3}>
              <Ellipse3Icon className={classes.icon4}/>
          </div>
          <div>
              <h1 className={classes.welcomeToKOL}>
                  About Us <span>Bayes Solution</span>
              </h1>
              <div className={classes.ellipse1}>
                  <Ellipse1Icon className={classes.icon5}/>
              </div>
              <p className={classes.loremIpsumDolorSitAmetConsecte}>
                  At Bayes Solution, we're committed to providing cutting-edge AI and Blockchain solutions. Our
                  expertise lies in developing innovative applications that leverage the power of artificial
                  intelligence and blockchain technology. From smart contracts to predictive analytics, we empower
                  businesses to embrace the future with confidence.
              </p>
          </div>
      </div>
  );
};

export default AboutUs;
