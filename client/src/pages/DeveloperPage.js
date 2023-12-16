import React, {useEffect, useState} from "react";
import Modal from "../components/cards/Modal";
import Header, {LogoLink, NavLink as NavLinkBase, NavLinks} from "../components/headers/light";
import styled from "styled-components";
import tw from "twin.macro";
import {SectionHeading} from "../components/misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "../components/misc/Buttons";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Footer from "../components/footers/MiniCenteredFooter";
import {DOMAIN} from "../constants";
import EllipseButton from "../styles/EllipseButton";
import {Link, useParams} from "react-router-dom";
import Hero from "../components/hero/FullWidthWithImage";
import SliderCard from "../components/cards/ThreeColSlider";
import TrendingCard from "../components/cards/TwoTrendingPreviewCardsWithImage";
import MainFeature from "../components/features/TwoColSingleFeatureWithStats";
const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-xl sm:mx-2
`;
const RightColumn = styled.div`
  background-image: url("https://www.fourstateshomepage.com/wp-content/uploads/sites/36/2023/03/Vinyl-Record-Player.jpg?w=900");
  ${tw`bg-green-500 bg-cover bg-center xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;
const backgroundImageUrl= 'url("https://www.fourstateshomepage.com/wp-content/uploads/sites/36/2023/03/Vinyl-Record-Player.jpg?w=900")';
const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const CardImage = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);


const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const CenteredContainer = tw.div`flex justify-center items-center h-1/2 w-1/2`;
const CenteredLinks = tw.div`flex space-x-4`; // Use space-x-4 to add horizontal spacing between buttons
const Text = tw(PrimaryButtonBase)`text-xl mt-8`; // Adjust text size using text-xl or other size classes

const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
const PrimaryButton = tw(PrimaryButtonBase)`
  mt-auto 
  sm:text-lg
  rounded-none
  w-32 h-16 // Adjust the width and height for a square button
  
  py-2 px-4  // Adjust the padding to make it smaller
`;const port=3005;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;
let navLinks = [
    <NavLinks key={1}>
        <NavLink to="/allCds">CDs</NavLink>
        <NavLink to="/allVinyls">Vinyls</NavLink>
        <NavLink to="#">AddCD</NavLink>
        <NavLink to="/AddVinyl">AddVinyl</NavLink>

    </NavLinks>
];
function DeveloperPage(){
    const { email } = useParams(); // Use destructuring to get the emailAndName parameter directly

    let [name,setName]=useState("Tavor");

    useEffect(() => {
        // Fetch data or perform other actions based on the email
        // Example fetch:
        // fetch(`${DOMAIN}/api/users/getName/${email}`)
        //   .then((response) => response.json())
        //   .then((data) => setName(data.Name))
        //   .catch((error) => console.error(error));

        // Update the name state based on the email
        setName((email.charAt(0).toUpperCase() + email.slice(1)).split(".")[0]);

    }, [email]);

    console.log(email);
    // fetch(`${DOMAIN}/api/users/getName/${email}`).then((response) => {
    //     if (response.status === 200) {
    //         return response.json(); // This returns a Promise
    //     } else {
    //
    //         throw new Error('Request failed with status ' + response.status);
    //     }
    // })
    //     .then((data) => {
    //         console.log(data);
    //         console.log(data);
    //         setName(data.Name);
    //
    //
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // setName(email.split(".")[0]);
    // setName(name.charAt(0).toUpperCase() + name.slice(1));
   return <AnimationRevealPage>
       <Hero />
       <div>
           <h1>Hello {name}</h1>
           <h2> What are you want to do today?</h2>
       </div>
       <CenteredContainer>
           <CenteredLinks>
               <Link to="/AddVinyl">
                   <Text>Add Vinyl</Text>
               </Link>
               <Link to="/AddCD">
                   <Text>Add Cd</Text>
               </Link>
               <Link to="/AddingUser">
                   <Text>Add User</Text>
               </Link>
           </CenteredLinks>
       </CenteredContainer>
       <SliderCard  />
       <TrendingCard />
       <MainFeature />
       <Footer />
    </AnimationRevealPage>;
}
export default DeveloperPage;