import classes from "../UI/footer/footer.module.css";

const Footer = () => {
    return (
        <footer className={classes.root}>
            <div className={classes.frame2}>
                <div className={classes.email}>
                    <a href="mailto:example@example.com" target="_blank" rel="noopener noreferrer">
                        <span></span>
                    </a>
                </div>
                <div className={classes.phoneSquared}>
                    <a href="tel:+1234567890" target="_blank" rel="noopener noreferrer">
                        <span></span>
                    </a>
                </div>
                <div className={classes.facebook}>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <span></span>
                    </a>
                </div>
                <div className={classes.instagram}>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <span></span>
                    </a>
                </div>
                <div className={classes.linkedIn}>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <span></span>
                    </a>
                </div>
            </div>
            <div className={classes._2024KOLAllRightsReserved}>
                @ 2024 KOL. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
