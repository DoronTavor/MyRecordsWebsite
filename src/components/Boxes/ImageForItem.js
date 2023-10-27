import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";

const CardImage = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`w-full max-w-128 sm:h-128 bg-cover bg-right rounded sm:rounded-none sm:rounded-tl-4xl aspect-square`
]);
function imageForItem(props){
    return <div style={{ float: 'right', width: '30%'}}>
         <CardImage imageSrc={props.image}>
         </CardImage>
    </div>;
}
export default imageForItem;