import React, {useState} from "react";
import Modal from "../components/cards/Modal";
import Header, {LogoLink, NavLink as NavLinkBase, NavLinks} from "../components/headers/light";
import styled from "styled-components";
import tw from "twin.macro";
import {SectionHeading} from "../components/misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "../components/misc/Buttons";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Footer from "../components/footers/MiniCenteredFooter";
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

function setStringForSearching(object) {
    const queryString = `q=${(object.artist)}
        +release_title=${(object.release_title)}
        +artist=${(object.artist)}
        +label=${(object.label)}
        +country=${(object.country)}
        +year=${(object.year)}
        +format=${(object.format)}
        +per_page=${3}+pages=${1}`;

    return queryString;
}

function AddingVinyl(){
    const [musicObjectToAdd,setMusicObjectToAdd]=useState({});
    const [musicObjectReturned,setMusicObjectReturned]=useState({});
    const [isRet,setIsRet]=useState(false);
    function handleInputChange(e){
        let prevMusicObjectToAdd=musicObjectToAdd;
        const { name, value } = e.target;
        const updatedObject = { ...musicObjectToAdd };
        updatedObject[name]=value;
        setMusicObjectToAdd(updatedObject);
        console.log(musicObjectToAdd);
    }
    function addRecord(obj){
        console.log("AddRec met "+obj.id);
        fetch(`/api/addVinyl`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response  =>{
            if(response.ok){
                alert("Added successfully");
            }
            else {
                alert("didnt Added successfully");
            }
        })
    }
    //${DOMAIN}
    function handleButtonClick() {
        let demo= {
            "q":"Depeche Mode",
            "release_title": "Music For The Masses",
            "artist": "Depeche Mode",
            "label": "Mute",
            "country": "Israel",
            "year": "1987",
            "format": "Vinyl, LP, Album",
            "per_page":3,
            "pages":1
        };
        //setMusicObjectToAdd(demo);
        const queryString = setStringForSearching(musicObjectToAdd);
        console.log(decodeURIComponent(queryString));
        fetch(`/api/getAskedFromUser/${queryString}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json(); // This returns a Promise
                } else {
                    throw new Error('Request failed with status ' + response.status);
                }
            })
            .then((data) => {
                console.log(data);
                //Present the result
                setMusicObjectReturned(data);
                console.log("Release Title: " + data.release_title +
                    "\nArtist: " + data.artist +
                    "\nCountry: " + data.country +
                    "\nLabel: " + data.label +
                    "\nYear: " + data.year +
                    "\nFormat: " + data.format+
                    "\nID: "+data.id

                );
                setIsRet(true);
                addRecord(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    let navLinks = [
        <NavLinks key={1}>
            <NavLink to="/allCds">CDs</NavLink>
            <NavLink to="/allVinyls">Vinyls</NavLink>
            <NavLink to="#">AddCD</NavLink>
            <NavLink to="/AddVinyl">AddVinyl</NavLink>
            <NavLink to="#">Login</NavLink>
        </NavLinks>
    ];
    return (
        <AnimationRevealPage>
            <StyledHeader links={navLinks} collapseBreakpointClass="sm" />
            <Heading> Add Vinyl</Heading>
            {/*{isRet &&<Modal musicObject={musicObjectReturned} open={isRet}/>}*/}
            <h3>Title</h3>
            <input
                type="text"
                name="release_title"
                value={musicObjectToAdd.release_title}
                onChange={handleInputChange}
            />
            <h3>Artist</h3>
            <input
                type="text"
                name="artist"
                value={musicObjectToAdd.artist}
                onChange={handleInputChange}
            />
            <h3>Label</h3>
            <input
                type="text"
                name="label"
                value={musicObjectToAdd.label}
                onChange={handleInputChange}
            />
            <h3>Country</h3>
            <input
                type="text"
                name="country"
                value={musicObjectToAdd.country}
                onChange={handleInputChange}
            />
            <h3>Year</h3>
            <input
                type="text"
                name="year"
                value={musicObjectToAdd.year}
                onChange={handleInputChange}
            />
            <h3>Format</h3>
            <input
                type="text"
                name="format"
                value={musicObjectToAdd.format}
                onChange={handleInputChange}
            />
            <button onClick={handleButtonClick}>find the record</button>
            <Footer />
        </AnimationRevealPage>

    );
}
export default AddingVinyl;