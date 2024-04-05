import React from 'react';
import { Button, NoRightPaddingContainer } from '../../styles/Common.style';
import { H1, Para } from '../../styles/Typography.style';
import {
	HeroWrapper,
	HeroContent,
	HeroImage,
	HeroContentWrapper,
} from './Hero.style';
import HeroImg from '../../images/image-mockups.png';

const Hero = () => {
	return (
		<div>
			<NoRightPaddingContainer>
				<HeroWrapper>
					<HeroContent>
						<HeroContentWrapper>
							<H1> Key Opinion Leaders Platform</H1>
							<Para>
							The KOL Chat Application allows celebrities to communicate with 
							their friends and fans via a chat interface. This document serves
							as a comprehensive guide for understanding the application's 
							functionality, architecture, and usage.
							</Para>
							<Button>Request Invite</Button>
						</HeroContentWrapper>
					</HeroContent>
					<HeroImage>
						<img src={HeroImg} alt='hero' />
					</HeroImage>
				</HeroWrapper>
			</NoRightPaddingContainer>
		</div>
	);
};

export default Hero;
