import React, {useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {PrimaryButton} from "../misc/Buttons";
import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../headers/light.js";
import {Link} from "react-router-dom";
const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-xl sm:mx-2
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  background-image: url("https://www.fourstateshomepage.com/wp-content/uploads/sites/36/2023/03/Vinyl-Record-Player.jpg?w=900");
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-5xl sm:text-5xl md:text-6xl lg:text-3xl font-black leading-none `;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
    width: 30%; height: 30%;/* Add this line to set a fixed width for primaryAction */
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
    width: 30%; height: 30%; /* Add this line to set a fixed width for secondaryAction */
  }
`;



export default ({

  navLinks = [
    <NavLinks key={1}>
      <NavLink to="/allCds" >CDs</NavLink>
      <NavLink to="/allVinyls">Vinyls</NavLink>

      <NavLink to="/Login">Login</NavLink>
      <NavLink to="/AboutScreen">About</NavLink>
    </NavLinks>
  ],
  heading = (
    <>
      Tavor's Records Collection
      <wbr />
      <br />
      <span tw="text-primary-500">CD's and Vinyl records</span>
    </>
  ),
  description = "This is My records page, it has details about the cd's that I own and the vinyl records that I own",
  primaryActionUrl = "/AboutScreen",
  primaryActionText = "About Tavor's collection",
  secondaryActionUrl = "/AboutScreen",
  secondaryActionText = "About Tavor's collection"
}) => {
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
          <Content>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              {/*<a href={primaryActionUrl} className="action primaryAction">*/}
              {/*  {primaryActionText}*/}
              {/*</a>*/}
              <NavLink className="action primaryAction" to="/AboutScreen"> About Tavor's Collection</NavLink>

            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn></RightColumn>
      </TwoColumn>
    </Container>
  );
};