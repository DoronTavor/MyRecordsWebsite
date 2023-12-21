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
import EllipseButton from "../styles/EllipseButton";
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
        +per_page=${1}+pages=${1}`;

    return queryString;
}

function AddingVinylByID(){
    const [musicObjectToAdd,setMusicObjectToAdd]=useState({});
    const [musicObjectReturned,setMusicObjectReturned]=useState({});
    const [isRet,setIsRet]=useState(false);
    const [isAdd,setIsAdd]=useState(false);
    const [id,setId]=useState();
    function handleInputChange(e){
        let prevMusicObjectToAdd=musicObjectToAdd;
        const { name, value } = e.target;
        const updatedObject = { ...musicObjectToAdd };
        updatedObject[name]=value;
        setMusicObjectToAdd(updatedObject);
        console.log(musicObjectToAdd);
    }
    async function addRecord(obj) {
        // Keep trying until obj is not undefined
        while (obj === undefined) {
            // Make sure to update obj if it can be changed by a background method


            console.log("Waiting until its not undefined");

            // Use async/await for better readability

        }
        try {
            obj = makeWorkForHebrew(obj);
            const response = await fetch(`${DOMAIN}/api/addVinylByID`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (response.ok) {
                alert("Added successfully");
                setIsAdd(true);
                setId(obj.id);
                // Break the loop if added successfully

            } else {
                alert("Didn't add successfully");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the record");
        }
    }
    function isHebrewString(str) {
        // Use a regular expression to check if the string contains Hebrew characters
        const hebrewRegex = /[\u0590-\u05FF]/;
        return hebrewRegex.test(str);
    }

    function reverseHebrewString(str) {
        // Reverse the string if it contains Hebrew characters
        if (isHebrewString(str)) {
            return str.split('').reverse().join('');
        }
        return str;
    }

    function makeWorkForHebrew(obj){
        for(const key in obj){
            const hebrewRegex = /[\u0590-\u05FF\s]/;

            if(isHebrewString(obj[key])){
                obj[key]=reverseHebrewString(obj[key]);
            }
        }
        return obj;
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
        musicObjectToAdd.isRecommend=false;
        const queryString = setStringForSearching(musicObjectToAdd);
        console.log(decodeURIComponent(queryString));

        console.log("Before adding: "+musicObjectToAdd);
        addRecord(musicObjectToAdd).then(r => {

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
            {isAdd &&<Link to= {`/Details/${id}`} />}
            {/*{isRet &&<Modal musicObject={musicObjectReturned} open={isRet}/>}*/}
            <h3>ID</h3>
            <input
                type="text"
                name="_id"
                value={musicObjectToAdd.id}
                onChange={handleInputChange}
            />
            <h3>Name</h3>
            <input
                type="text"
                name="Name"
                value={musicObjectToAdd.release_title}
                onChange={handleInputChange}
            />
            <h3>Artist</h3>
            <input
                type="text"
                name="Artist"
                value={musicObjectToAdd.artist}
                onChange={handleInputChange}
            />
            <h3>Format</h3>
            <input
                type="text"
                name="Format"
                value={musicObjectToAdd.format}
                onChange={handleInputChange}
            />


            <button onClick={handleButtonClick}>find the record</button>

            <Footer />
        </AnimationRevealPage>

    );
}
export default AddingVinylByID;