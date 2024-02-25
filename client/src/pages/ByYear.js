import React, {useEffect, useRef, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading} from "components/misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "components/misc/Buttons";
import {ReactComponent as ChevronLeftIcon} from "feather-icons/dist/icons/chevron-left.svg";
import {ReactComponent as ChevronRightIcon} from "feather-icons/dist/icons/chevron-right.svg";
import {Container} from "../components/misc/Layouts";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Hero from "../components/hero/FullWidthWithImage";
import Footer from "../components/footers/MiniCenteredFooter";
import Title from "../components/Boxes/Title";
import ImageForItem from "../components/Boxes/ImageForItem";
import useLocalStorageState from 'use-local-storage-state'
import TrackList from "../components/Boxes/TrackList";
import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../components/headers/light";
import MusicAlbum from "../Models/AlbumModel";
import HelperFunctions, {returnOnlyHebrew} from "../helpers/HelperFunctions"
import {Link, useParams} from "react-router-dom";
import * as url from "url";
import {DOMAIN} from "../constants";
import gifImage from "../images/output.gif";
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
function setAlbum(data){
    let album = {};
    album._id=data._id;
    album.Name=data.Name;
    album.Artist=data.Artist;
    album.Format=data.Format;
    album.Year=data.Year;
    album.TrackList=data.TrackList;
    album.uri=data.uri;
    return album;
}
const handleClickMoreDetails=(event)=>{
    const newTabUrl = event.target.dataset.link;

    if (newTabUrl) {
        // Open the URL in a new tab or window
        window.open(newTabUrl, "_blank");

        // You can add additional actions here
        // For example, you can perform a state update or any other logic you need.
    }
};
function ByYear(){
    const {year}=useParams();
    const [musicObjects,setMusicObjects] = useState();


    useEffect(()=> {
        fetch(`${DOMAIN}/api/byYear/${year}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json(); // This returns a Promise
                } else {
                    console.log('Request failed with status ' + response.status);
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then((data) => {
                console.log(data);
                setMusicObjects(data);

            })
            .catch((error) => {
                console.log(error);
            });

        return ()=>{
            console.log('AllVinyls unmount')
        }
    });



    if (!musicObjects) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ fontSize: '36px', marginRight: '20px' }}>Loading...</div>
                <img src={gifImage} alt="GIF" style={{ display: 'block', width: '100px', height: '100px' }} />
            </div>
        );
    }


    let navLinks = [
        <NavLinks key={1}>
            <NavLink to="/allCds">CDs</NavLink>
            <NavLink to="/allVinyls">Vinyls</NavLink>

            <NavLink to="#">Login</NavLink>
        </NavLinks>
    ];
    return (
        <AnimationRevealPage  >
            <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
        <Container>
            <Content>
                <Heading>Discography- {year}</Heading>
                <table>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th >Title</th>
                        <th>Year</th>
                        <th>Artist</th>
                        <th>Format</th>
                        <th>Type</th>



                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(musicObjects).map((card, key) => (
                        <tr key={key}>
                            <td><CardImage  style={{ width: '150px', height: '150px', objectFit: 'cover' }} imageSrc={card.Image} /></td>



                            <td><h3 style={{ textAlign: 'center' }}> {card.Name.split('=')[0]}</h3> </td>
                            <td><h3 style={{ textAlign: 'center' }}> {card.Year}</h3> </td>
                            <td>
                                <Link to={`/ByArtist/${card.Artist.split('=')[0]}`}>{card.Artist.split('=')[0]}</Link>
                            </td>
                            <td><h3 style={{ textAlign: 'center' }}> {card.Format}</h3> </td>
                            <td><h3 style={{ textAlign: 'center' }}> {card.type}</h3> </td>
                            <td>
                                <Link to={`/Details/${card._id}`}>More Details</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Content>
        </Container>
            <Footer />
        </AnimationRevealPage>
    );
}
export default ByYear;