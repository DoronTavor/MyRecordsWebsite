import React, {useEffect, useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {PrimaryButton as PrimaryButtonBase} from "components/misc/Buttons";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Footer from "../components/footers/MiniCenteredFooter";
import Title from "../components/Boxes/Title";
import ImageForItem from "../components/Boxes/ImageForItem";
import TrackList from "../components/Boxes/TrackList";
import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../components/headers/light";
import {useParams} from "react-router-dom";
import {DOMAIN} from "../constants";

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

const PrimaryButton = tw(PrimaryButtonBase)`
  mt-auto 
  sm:text-lg
  rounded-none
  w-32 h-16 // Adjust the width and height for a square button
  
  py-2 px-4  // Adjust the padding to make it smaller
`;const port =3005;
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
function DetailsForItem(){
    const {id}=useParams();
    const [musicObject,setMusicObject] = useState();


    //${DOMAIN}
     useEffect(()=>{
         fetch(`/api/asked/${id}`)
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
                 setMusicObject(data);

             })
             .catch((error) => {
                 console.log(error);
             });

         return ()=>{
             console.log('DetailsForItem unmount')
         }
     },[id]);



     if(!musicObject) {
         return <div>Loading...</div>
     }
    let navLinks = [
        <NavLinks key={1}>
            <NavLink to="/allCds">CDs</NavLink>
            <NavLink to="/allVinyls">Vinyls</NavLink>
            <NavLink to="#">AddCD</NavLink>
            <NavLink to="#">AddVinyl</NavLink>
            <NavLink to="#">Login</NavLink>
        </NavLinks>
    ];
    return (

        <AnimationRevealPage  >
            <StyledHeader links={navLinks} collapseBreakpointClass="sm" />

            <ImageForItem image={musicObject.Image}></ImageForItem>
            <Title name={musicObject.Name.split('=')[0]} artist={musicObject.Artist}
                   year={musicObject.Year} format={musicObject.Format} label={musicObject.label} country={musicObject.country}/>
            <TrackList TrackList={musicObject.TrackList}></TrackList>
            <PrimaryButton data-link={musicObject.uri} onClick={handleClickMoreDetails}>  More Details</PrimaryButton>

            <Footer />
        </AnimationRevealPage>
    );
}
export default DetailsForItem;