import classes from "../UI/home/home.module.css";
import { Ellipse1Icon } from '../UI/home/Ellipse1Icon.tsx';
import { Ellipse2Icon } from '../UI/home/Ellipse2Icon.tsx';
import { Ellipse3Icon } from '../UI/home/Ellipse3Icon.tsx';
import { Ellipse4Icon } from '../UI/home/Ellipse4Icon.tsx';
import { Ellipse5Icon } from '../UI/home/Ellipse5Icon.tsx';
const Hero = () => {
    return (
        <div className={`${classes.root}`}>
            <div>
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
                <h1 className={classes.welcomeToKOL}>
                    Welcome to <span>Echo</span>
                </h1>
                <div className={classes.ellipse1}>
                    <Ellipse1Icon className={classes.icon5}/>
                </div>
                <p className={classes.loremIpsumDolorSitAmetConsecte}>
                    The Echo Chat Application provides celebrities with a platform to interact with their audience
                    in real-time. It offers features such as automatic responses generated by an AI model and manual
                    responses.
                </p>
                <div className={classes.rectangle6}>
                    {/*<iframe*/}
                    {/*    className={classes.videoDemo}*/}
                    {/*    width="560" height="315"*/}
                    {/*    src="https://www.youtube.com/embed/Ri7-vnrJD3k?si=DS-RJzeEGv5FAehQ"*/}
                    {/*    title="YouTube video player"*/}
                    {/*    frameBorder="0"*/}
                    {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                    {/*    referrerPolicy="no-referrer"*/}
                    {/*    allowFullScreen*/}
                    {/*    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"*/}
                    {/*></iframe>*/}

                    <div className={classes.videoDemo}>
                        <img src={"/assets/comingSoon.jpg"} alt={"comingSoon"}
                             style={{width: "100%", height: "100%"}}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
