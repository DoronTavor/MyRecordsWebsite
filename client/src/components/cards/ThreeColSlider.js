import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import {SectionHeading} from "components/misc/Headings";
import {PrimaryButton as PrimaryButtonBase} from "components/misc/Buttons";
import {ReactComponent as ChevronLeftIcon} from "feather-icons/dist/icons/chevron-left.svg";
import {ReactComponent as ChevronRightIcon} from "feather-icons/dist/icons/chevron-right.svg";
import {Link} from "react-router-dom";
import EllipseButton from "../../styles/EllipseButton";
import Header, { LogoLink, NavLinks, NavLink as NavLinkBase } from "../headers/light.js";
import {DOMAIN} from "../../constants";

const port=3005;
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
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
const NavLink = tw(NavLinkBase)`
  sm:text-xl sm:mx-2
`;
const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const yearsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const year = tw.span`ml-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default (props) => {
  const[cards,setCards] = useState({});
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);



  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  useEffect(()=>{
    fetch(`${DOMAIN}/api/recommend`)
        .then((response) => {
          if (response.status === 200) {
            return response.json(); // This returns a Promise
          } else {
            throw new Error('Request failed with status ' + response.status);
          }
        })
        .then((data) => {
          setCards(data); // Call setCards with the data after it has been fully processed
        })
        .catch((error) => {
          console.log(error);
        });
  },[]);


  // const cards = [
  //   {
  //     imageSrc: "https://upload.wikimedia.org/wikipedia/he/6/67/%D7%9E%D7%95%D7%A1%D7%99%D7%A7%D7%94%D7%A4%D7%99%D7%A7.jpg",
  //     title: "Music",
  //     description: "The second Album of Tzvika Pik, his best-seller album",
  //     Artist: "Tzvika Pik",
  //     format: "Vinyl 12 Inch",
  //     year: 1978,
  //   },
  //   {
  //     imageSrc: "data:image/jpeg;base64,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",
  //     title: "Back to Shablul",
  //     description: "A tribute album to Arik Einstein and Shalom Hanoch, created by the band Rockfour",
  //     Artist: "Rockfour",
  //     format: "CD Album",
  //     year: 1996,
  //   },
  //   {
  //     imageSrc: "https://i.scdn.co/image/ab67706c0000da841da1876726f4e887d015dae5",
  //     title: "La Mujer Que Yo Quiero- The woman with me",
  //     description: "David Broza's album, of songs translated to Hebrew from spanish. the second best-selling album in israel",
  //     Artist: "David Broza",
  //     format: "Vinyl 12 Inch",
  //     year: "1983 ",
  //   },
  //   {
  //     imageSrc: "https://i.discogs.com/a-6LzcXxv_cMHVvbIWiizcTHU1hzJ5gurnLEMbxSdP0/rs:fit/g:sm/q:90/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIxMzE4/NzA5LTE2MzkyODM5/OTAtMzQzMC5qcGVn.jpeg",
  //     title: "a little fobbia- Pahad Amiti",
  //     description: "A single from the first album of the israeli band, The Witches",
  //     Artist: "The Witches",
  //     format: "CD Single",
  //     year: 1994,
  //   },
  // ]


  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Popular Records</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {Object.values(cards).map((card, key) => (
            <Card key={key}>
              <CardImage imageSrc={card.Image} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.Name.split('=')[0]+"- "+card.Artist}</Title>

                </TitleReviewContainer>
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                    </IconContainer>
                    <Text>Year: {card.Year}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                    </IconContainer>
                    <Text>{card.Format}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <IconWithText>
                  <IconContainer>
                  </IconContainer>
                  <Text>{card.type}</Text>
                </IconWithText>
                <IconWithText>
                  <IconContainer>
                  </IconContainer>
                  <Text>{card.country}</Text>
                </IconWithText>
              </TextInfo>
              <Link to= {`/Details/${card._id}`} >
               <EllipseButton/>
              </Link>
              {/*<PrimaryButton> <Link to= "/Details"/></PrimaryButton>*/}
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
//onClick={props.onClickedForCardPage(card)}
 function fetchRecommendations(port) {
  try {
    const res =  fetch(`${DOMAIN}/api/recommend`, {
      method: "GET"
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data =  res.json();
    return Object.values(data);
  } catch (error) {
    console.error(error);
  }

}
