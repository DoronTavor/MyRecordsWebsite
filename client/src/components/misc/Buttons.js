import tw from "twin.macro";
export const PrimaryButton = tw.button`
  px-8 py-3 font-bold rounded-full
   bg-blue-700 text-white
  hocus:bg-blue-700 hocus:text-gray-200
  focus:shadow-outline focus:outline-none transition duration-300
`;
