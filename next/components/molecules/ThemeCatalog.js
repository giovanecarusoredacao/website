import {
  VStack,
  Center,
  Box,
  Image,
  Tooltip,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import { useCheckMobile } from "../../hooks/useCheckMobile.hook";
import { triggerGAEvent } from "../../utils";
import { useTranslation } from 'next-i18next';

import { getDatasetsByThemes } from "../../pages/api/themes/index"

import Carousel from "../atoms/Carousel";
import SectionText from "../atoms/SectionText";
import DatabaseCard from "../organisms/DatabaseCard";
import RemoveIcon from "../../public/img/icons/removeIcon";
import styles from "../../styles/themeCatalog.module.css";

function Themes ({
  loading,
  responsive,
  onSelectTheme,
  selectedTheme=[],
  listThemes,
}) {
  const { t } = useTranslation('common');
  const [screenQuery, setScreenQuery] = useState(0)

  useEffect(() => {
    if(responsive.mobileQuery)
      return setScreenQuery(4)
    if(responsive.baseQuery)
      return setScreenQuery(6)
    if(responsive.mediumQuery)
      return setScreenQuery(9)
    if(responsive.lgQuery)
      return setScreenQuery(10)

    return setScreenQuery(10)
  },[responsive])

  const found = (value) => {
    return selectedTheme.find(res => res === value)
  }

  return (
    <Center
      width="95vw"
      height="120px"
      maxWidth="1264px"
    >
      <Carousel 
        settings={{
          spaceBetween: responsive.mobileQuery ? 20 : 10,
          slidesPerView: screenQuery,
          slidesPerGroup: 2,
          navigation: !responsive.mobileQuery && true,
          loop: true,
          autoplay:{
            delay: selectedTheme[0] ? 1000000 : 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }
        }}
      >
        {loading ?
          new Array(screenQuery).fill(0).map((elm, i) => (
            <Skeleton
              key={i}
              position="relative"
              margin="10px 0"
              startColor="#F0F0F0" endColor="#CECECE"
              width={responsive.mobileQuery ? "65px" : "100px" }
              minWidth={responsive.mobileQuery ? "65px" : "100px" }
              height={responsive.mobileQuery ? "65px" : "100px" }
              minHeight={responsive.mobileQuery ? "65px" : "100px" }
              borderRadius={responsive.mobileQuery ? "12px" : "16px" }
            />
          ))
          :
          listThemes ?
            listThemes.map((elm) => (
              <Center
                key={elm.node._id}
                position="relative"
                onClick={() => onSelectTheme(elm.node.slug)}
                cursor="pointer"
                width={responsive.mobileQuery ? "65px" : "100px" }
                minWidth={responsive.mobileQuery ? "65px" : "100px" }
                height={responsive.mobileQuery ? "65px" : "100px" }
                minHeight={responsive.mobileQuery ? "65px" : "100px" }
                borderRadius={responsive.mobileQuery ? "12px" : "16px" }
                backgroundColor={ found(elm.node.slug) ? "#2B8C4D" : "FFF"}
                boxShadow="0px 1px 8px 1px rgba(64, 60, 67, 0.16)"
                _hover={{ transform:"scale(1.1)", backgroundColor:"#2B8C4D" }}
                transition="all 0.5s"
                margin="10px 0"
              >
                <Tooltip
                  hasArrow
                  bg="#2A2F38"
                  label={elm.node.name}
                  fontSize="16px"
                  fontWeight="500"
                  padding="5px 16px 6px"
                  marginTop="10px"
                  color="#FFF"
                  borderRadius="6px"
                >
                  <Image
                    className={styles.iconTheme}
                    width="100%"
                    padding={responsive.mobileQuery ? "5px" : "10px"}
                    height="100%"
                    transition="all 0.5s"
                    filter={found(elm.node.slug) && "invert(1)"}
                    _hover={{ filter:"invert(1)"}}
                    alt={`${elm.node.name}`}
                    src={`https://storage.googleapis.com/basedosdados-website/category_icons/2022/icone_${elm.node.slug}.svg`}
                  />
                </Tooltip>
                <RemoveIcon
                  alt="remover tema do filtro"
                  display={found(elm.node.slug) ? "flex" : "none"}
                  fill="#42B0FF"
                  width={responsive.mobileQuery ? "20px" : "30px"}
                  height={responsive.mobileQuery ? "20px" : "30px"}
                  transition="all 0.5s"
                  position="absolute"
                  top="-1"
                  right="-1"
                />
              </Center>
            ))
          :
          new Array(screenQuery).fill(0).map((elm, i) => (
            <Skeleton
              key={i}
              position="relative"
              margin="10px 0"
              startColor="#F0F0F0" endColor="#CECECE"
              width={responsive.mobileQuery ? "65px" : "100px" }
              minWidth={responsive.mobileQuery ? "65px" : "100px" }
              height={responsive.mobileQuery ? "65px" : "100px" }
              minHeight={responsive.mobileQuery ? "65px" : "100px" }
              borderRadius={responsive.mobileQuery ? "12px" : "16px" }
            />
          ))
        }
      </Carousel>
    </Center>
  )
}

const SkeletonWaitCard = () => {
  return (
    <Box
      width="280px"
      height="320px"
      margin="20px 0"
      borderRadius="12px"
      backgroundColor="#FFF"
      boxShadow="0 2px 5px 1px rgba(64, 60, 67, 0.16)"
      padding="29px 25px 25px 25px"
    >
      <Box display="flex" flexDirection="row" gap="8px" marginBottom="16px">
        <Skeleton width="30px" height="30px" borderRadius="6px" startColor="#F0F0F0" endColor="#F0F0F0"/>
        <Skeleton width="30px" height="30px" borderRadius="6px" startColor="#F0F0F0" endColor="#F0F0F0"/>
        <Skeleton width="30px" height="30px" borderRadius="6px" startColor="#F0F0F0" endColor="#F0F0F0"/>
      </Box>
      <SkeletonText noOfLines={2} spacing="4" startColor="#F0F0F0" endColor="#F0F0F0"/>
      <SkeletonText marginTop="20px" noOfLines={1} startColor="#F0F0F0" endColor="#F0F0F0"/>
      <Box display="flex" flexDirection="row" gap="8px" marginTop="72px">
        <Skeleton width="30%" height="24px" borderRadius="6px" startColor="#F0F0F0" endColor="#F0F0F0"/>
        <Skeleton width="30%" height="24px" borderRadius="6px" startColor="#F0F0F0" endColor="#F0F0F0"/>
        <Skeleton width="30%" height="24px" borderRadius="6px" startColor="#F0F0F0" endColor="#F0F0F0"/>
      </Box>
      <SkeletonText marginTop="26px" noOfLines={2} spacing="4" startColor="#F0F0F0" endColor="#F0F0F0"/>
    </Box>
  )
}

function CardThemes ({ responsive, datasetsCards = [], loading, locale }) {
  const [screenQuery, setScreenQuery] = useState(0)
  useEffect(() => {
    if(responsive.mobileQuery)
      return setScreenQuery(1)
    if(responsive.baseQuery)
      return setScreenQuery(2)
    if(responsive.mediumQuery)
      return setScreenQuery(3)

    return setScreenQuery(4)
  },[responsive])

  const { t } = useTranslation('common');

  return (
    <Box
      width={responsive.mobileQuery ? "100vw" : "95vw"}
      maxWidth="1264px"
      margin={responsive.mobileQuery ? "24px 0 48px !important" : "40px 0 48px !important"}
    >
      {!loading && datasetsCards?.length === 0 &&
        <Center padding="0 40px">
          <SectionText
            fontSize={responsive.mobileQuery ? "14px" : "18px"}
            color="#A3A3A3"
            textAlign="center"
            marginBottom={responsive.mobileQuery ? "16px" : "32px"}
          >
            {t('noDatasetsFound')}
          </SectionText>
        </Center>
      }
      <Center
        className={styles.cards}
        width={responsive.mobileQuery ? "100vw" : "100%"}
      >
        <Carousel 
          settings={{
            spaceBetween: 10,
            slidesPerView: screenQuery,
            navigation: true,
            loop: screenQuery < !datasetsCards ? true : false,
            autoplay: {
              delay: 6000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }
          }}
        >
          {loading ?
            new Array(screenQuery).fill(0).map((elm, i) => (
              <SkeletonWaitCard key={i}/>
            ))
          :
          datasetsCards.length === 0 ?
            new Array(screenQuery).fill(0).map((elm, i) => (
              <SkeletonWaitCard key={i}/>
            ))
            :
            datasetsCards.map((elm, i) => (
              <DatabaseCard
                key={i}
                name={elm?.name}
                categories={elm?.themes}
                organization={elm?.organizations?.[0]}
                tags={elm?.tags}
                tables={{
                  id: elm?.first_table_id || elm?.first_closed_table_id,
                  number: elm?.n_tables
                }}
                rawDataSources={{
                  id: elm?.first_raw_data_source_id,
                  number: elm?.n_raw_data_sources
                }}
                informationRequests={{
                  id: elm?.first_information_request_id,
                  number: elm?.n_information_requests
                }}
                link={`/dataset/${elm.id}`}
                locale={locale}
              />
            ))
          }
        </Carousel>
      </Center>
    </Box>
  )
}

export default function ThemeCatalog ({ data, locale }) {
  const { t } = useTranslation('common');
  const [listThemes, setListThemes] = useState([])
  const [defaultDatasetsCards, setDefaultDatasetCards] = useState([])
  const [fetchThemesTimeout, setFetchThemesTimeout] = useState(null)

  const [datasetsCards, setDatasetsCards] = useState([])
  const [selectedTheme, setSelectedTheme] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingTheme, setLoadingTheme] = useState(true)

  const mobileCheck = useCheckMobile()
  const [mobileQuery, setMobileQuery] = useState(false)
  const [baseQuery] = useMediaQuery("(max-width: 938px)")
  const [mediumQuery] = useMediaQuery("(max-width: 1250px)")
  const [lgQuery] = useMediaQuery("(max-width: 1366px)")

  useEffect(() => {
    setMobileQuery(mobileCheck)
    setListThemes(data.themes)
    setDefaultDatasetCards(data.defaultDataset)
    setLoading(false)
    setLoadingTheme(false)
  },[data])

  useEffect(() => {
    if(selectedTheme.length > 0) {
      if(fetchThemesTimeout) clearTimeout(fetchThemesTimeout)
      setLoading(true)

      const fetchFunc = setTimeout(() => {
        getDatasetsByThemes(selectedTheme)
        .then(res => {
          setDatasetsCards(res)
          setLoading(false)
        })
      }, 500)
      
      setFetchThemesTimeout(fetchFunc)
    }
  },[selectedTheme])

  const handleSelectTheme = (elm) => {
    triggerGAEvent("theme_home", elm)
    triggerGAEvent("theme", elm)
    window.open("#theme", "_self")
    if(selectedTheme.includes(elm)) {
      setSelectedTheme(selectedTheme.filter(res => res !== elm))
    } else {
      setSelectedTheme([elm, ...selectedTheme])
    }
  }

  return (
    <VStack
      width="100%"
      alignItems="center"
    >
      <Themes
        loading={loadingTheme}
        listThemes={listThemes}
        selectedTheme={selectedTheme}
        onSelectTheme={handleSelectTheme}
        responsive={{mobileQuery, baseQuery, mediumQuery, lgQuery}}
      />

      <CardThemes
        datasetsCards={
          selectedTheme.length === 0 ?
          defaultDatasetsCards :
          datasetsCards
        }
        loading={loading}
        responsive={{mobileQuery, baseQuery, mediumQuery, lgQuery}}
        locale={locale}
      />
    </VStack>
  )
}
