import {
  VStack,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

export default function ReadMore({ children, ...props}) {
  const [isReadMore, setIsReadMore] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const textRef = useRef(null)

  const modifiedChildren = `
    ${children}
    <span
      id="readLessDiscription"
      style="
        cursor: pointer;
        color: #0068C5;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        background-color: #FFF;
      "
      onmouseover="this.style.color='rgba(0, 104, 197, 0.8)'"
      onmouseout="this.style.color='#0068C5'"
    >
      <span style="color:#464A51">...</span>Ler menos
    </span>
  `

  useEffect(() => {
    if (textRef.current) {
      const { clientHeight, scrollHeight } = textRef.current
      setIsOverflowing(scrollHeight > clientHeight)
    }
  }, [children])

  useEffect(() => {
    const readLess = document.getElementById("readLessDiscription")
    if (readLess) readLess.addEventListener('click', toggleReadMore)
    return () => { if (readLess) readLess.removeEventListener('click', toggleReadMore)}
  }, [isReadMore])

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
console.log(isReadMore)
  return (
    <Flex position="relative" {...props} >
      <Text
        ref={textRef}
        display="-webkit-box"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="normal"
        textAlign="justify"
        sx={{
          WebkitLineClamp: isReadMore ? "unset" : 3,
          WebkitBoxOrient: "vertical",
        }}
        fontFamily="Roboto"
        fontSize="14px"
        fontWeight="400"
        lineHeight="20px"
        color="#464A51"
      >
        {isOverflowing ?
          <Box dangerouslySetInnerHTML={{ __html: modifiedChildren }} />
          :
          children
        }
      </Text>
      {isOverflowing &&
        <Text
          display={isReadMore ? "none" : "flex"}
          onClick={toggleReadMore}
          cursor="pointer"
          _hover={{color: "rgba(0, 104, 197, 0.8)"}}
          color="#0068C5"
          fontFamily="Roboto"
          fontSize="14px"
          fontWeight="400"
          lineHeight="20px"
          backgroundColor="#FFF"
          position="absolute"
          bottom="0"
          right="0"
        >
          <Text color="#464A51">...</Text>Ler mais
        </Text>
      }
    </Flex>
  )
}
