import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input
} from "@chakra-ui/react";

export default function SimpleInput({
  id,
  type,
  value,
  onChange,
  placeholder,
  elmLeft = null,
  elmRight = null,
  styleElmLeft,
  styleElmRight,
  ...props
}) {
  
  return (
    <InputGroup>
      {elmLeft && <InputLeftElement children={elmLeft} {...styleElmLeft}/>}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        fontFamily="Lato"
        fontWeight="300"
        border="1px solid #DEDFE0 !important"
        _placeholder={{ color: "#A3A3A3" }}
        _focus={{border:"2px solid #42B0FF !important" }}
        _hover={{border:"2px solid #42B0FF !important" }}
        borderRadius="8px"
        height="48px"
        {...props}
      />
      {elmRight && <InputRightElement children={elmRight} {...styleElmRight}/>}
    </InputGroup>
  )
}
