import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as TimeIcon } from "feather-icons/dist/icons/clock.svg";
import { ReactComponent as TrendingIcon } from "feather-icons/dist/icons/trending-up.svg";
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-icon.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const ThreeColumn = tw.div`flex flex-wrap`;
const Column = tw.div``;
const HeadingColumn = tw(Column)`w-full xl:w-1/3`;
const CardColumn = tw(Column)`w-full md:w-1/2 xl:w-1/3 mt-16 xl:mt-0`;

const HeadingInfoContainer = tw.div`text-center xl:text-left max-w-lg xl:max-w-none mx-auto xl:mx-0`;
const HeadingTitle = tw(SectionHeading)`xl:text-left leading-tight`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-8`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-lg`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

const Card = tw.div`mx-auto xl:mx-0 xl:ml-auto max-w-sm md:max-w-xs lg:max-w-sm xl:max-w-xs`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 bg-cover bg-center rounded`
]);

const CardText = tw.div`mt-4`;

const CardHeader = tw.div`flex justify-between items-center`;
const CardType = tw.div`text-primary-500 font-bold text-lg`;
const CardPrice = tw.div`font-semibold text-sm text-gray-600`;
const CardPriceAmount = tw.span`font-bold text-gray-800 text-lg`;

const CardTitle = tw.h5`text-xl mt-4 font-bold`;

const CardMeta = styled.div`
  ${tw`flex flex-row flex-wrap justify-between sm:items-center font-semibold tracking-wide text-gray-600 uppercase text-xs`}
`;

const CardMetaFeature = styled.div`
  ${tw`flex items-center mt-4`}
  svg {
    ${tw`w-5 h-5 mr-1`}
  }
`;
const CardAction = tw(PrimaryButtonBase)`w-full mt-8`;

export default () => {
  const cards = [
    {
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/CD_autolev_crop_new.jpg/640px-CD_autolev_crop_new.jpg",
      type: "CD"
    },
    {
      imageSrc:
        "data:image/jpeg;base64,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",
      type: "Vinyl"
    }
  ];
  return (
    <Container>
      <Content>
        <ThreeColumn>
          <HeadingColumn>
            <HeadingInfoContainer>
              <HeadingTitle>Types of records</HeadingTitle>


            </HeadingInfoContainer>
          </HeadingColumn>
          {cards.map((card, index) => (
            <CardColumn key={index}>
              <Card>
                <CardImage imageSrc={card.imageSrc} />
                <CardText>
                  <CardHeader>
                    <CardType>{card.type}</CardType>
                    <CardPrice>
                    </CardPrice>
                  </CardHeader>
                  <CardTitle>{card.title}</CardTitle>

                  <CardAction>Show All collection</CardAction>
                </CardText>
              </Card>
            </CardColumn>
          ))}
        </ThreeColumn>
      </Content>
    </Container>
  );
};
