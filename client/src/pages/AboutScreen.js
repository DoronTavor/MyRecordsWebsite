import React from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Hero from "../components/hero/FullWidthWithImage";
import {AboutTitleScreen} from "../components/Boxes/AboutTitleScreen";
import {ImageBoxForAbout} from "../components/Boxes/imageBoxForAbout";
import Footer from "../components/footers/MiniCenteredFooter";

import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../components/headers/light.js";
import tw from "twin.macro";
import styled from "styled-components";
const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;


const NavLink = tw(NavLinkBase)`
  sm:text-xl sm:mx-2
`;

export const AboutScreen = () => {
    let navLinks = [
        <NavLinks key={1}>
            <NavLink to="/allCds" >CDs</NavLink>
            <NavLink to="/allVinyls">Vinyls</NavLink>

            <NavLink to="#">Login</NavLink>
        </NavLinks>
    ];
    return(
        <AnimationRevealPage>
            <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
        <AboutTitleScreen/>
            <ImageBoxForAbout/>
        <Footer/>
    </AnimationRevealPage>
    );

};