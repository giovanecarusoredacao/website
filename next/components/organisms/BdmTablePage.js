import {
  VStack,
  HStack,
  Stack,
  Box,
  Text,
  Grid,
  GridItem,
  Tooltip,
  Skeleton,
  SkeletonText,
  Divider
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCheckMobile } from "../../hooks/useCheckMobile.hook";
import Link from "../atoms/Link";
import SectionText from "../atoms/SectionText";
import { SimpleTable } from "../atoms/SimpleTable";
import ReadMore from "../atoms/ReadMore";
import LoadingSpin from "../atoms/Loading";
import Subtitle from "../atoms/Subtitle";
import { TemporalCoverageBar } from "../molecules/TemporalCoverageDisplay";
import ColumnDatasets from "../molecules/ColumnDatasets";
import DataInformationQuery from "../molecules/DataInformationQuery";
import FourOFour from "../templates/404";

import StarIcon from "../../public/img/icons/starIcon";
import FrequencyIcon from "../../public/img/icons/frequencyIcon";
import PartitionIcon from "../../public/img/icons/partitionIcon";
import UserIcon from "../../public/img/icons/userIcon";
import VersionIcon from "../../public/img/icons/versionIcon";
import EmailIcon from "../../public/img/icons/emailIcon";
import GithubIcon from "../../public/img/icons/githubIcon";
import WebIcon from "../../public/img/icons/webIcon";
import TwitterIcon from "../../public/img/icons/twitterIcon";
import FileIcon from "../../public/img/icons/fileIcon";
import InfoIcon from "../../public/img/icons/infoIcon";
import DownloadIcon from "../../public/img/icons/downloadIcon";

export default function BdmTablePage({ id }) {
  const [isLoading, setIsLoading] = useState(true)
  const [resource, setResource] = useState({})
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/tables/getBdmTable?p=${id}`, { method: "GET" })
        const result = await response.json()

        if (result.success) {
          setResource(result.resource)
          setIsError(false)
        } else {
          console.error(result.error)
          setIsError(true)
        }
      } catch (error) {
        console.error("Fetch error: ", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const AddInfoTextBase = ({title, text, info, children, ...style}) => {
    return (
      <Box display="block" alignItems="center" gridGap="8px" {...style}>
        <Text
          display="flex"
          alignItems="center"
          fontFamily="ubuntu"
          fontSize="14px"
          fontWeight="400" 
          letterSpacing="0.3px"
          marginBottom="8px"
          color="#252A32"
        >{title}
          {info &&
            <Tooltip
              label={info}
              hasArrow
              bg="#2A2F38"
              fontSize="16px"
              fontWeight="500"
              padding="10px 16px"
              marginTop="8px"
              color="#FFF"
              borderRadius="6px"
            >
              <InfoIcon
                alt="tip"
                marginLeft="8px"
                cursor="pointer"
                fill="#A3A3A3"
                width="16px"
                height="16px"
              />
            </Tooltip>
          }
        </Text>
        <SectionText>
          {text}
        </SectionText>
        {children}
      </Box>
    )
  }

  const keyIcons = (ref) => {
    let href = ""
    let alt = ""

    if(ref.github_user) {
      const github = ref.github_user.replace(/(https:)\/\/(github.com)\//gim, "")
      href = `https://github.com/${github}` 
      alt = "github basedosdados"
    }
    if(ref.twitter_user) {
      const twitter = ref.twitter_user.replace(/(https:)\/\/(twitter.com)\//gim, "")
      href = `https://twitter.com/${twitter}`
      alt = "twitter basedosdados"
    }
    if(ref.email) {
      href = `mailto:${ref.email}`
      alt= "email do contribuidor"
    }
    if(ref.website) {
      const website = ref.website.replace(/(https?:)\/\//gim, "")
      href = `https://${website}`
      alt = "website pessoal"
    }

    return {
      alt: alt,
      cursor: "pointer",
      width:"20px",
      height:"20px",
      fill: "#0068C5",
      onClick: () => {window.open(href)}
    }
  }

  const PublishedOrDataCleanedBy = ({ resource }) => {
    return (
      <HStack spacing="4px">
        {resource?.firstName && resource?.lastName ?
          <Text
            marginRight="4px !important"
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="14px"
            lineHeight="20px"
            color="#464A51"
          >
            {`${resource.firstName} ${resource.lastName}`}
          </Text>
          :
          <Text
            marginRight="4px !important"
          >
            Não listado
          </Text>
        }
        {resource?.email && <EmailIcon {...keyIcons({email : resource.email})}/>}
        {resource?.github && <GithubIcon {...keyIcons({github_user : resource.github})}/>}
        {resource?.website && <WebIcon {...keyIcons({website : resource.website})}/>}
        {resource?.twitter && <TwitterIcon {...keyIcons({twitter_user : resource.twitter_user})}/>}
      </HStack>
    )
  }

  const UpdateFrequency = () => {
    const value = resource?.updates?.[0]
    if(value === undefined || Object.keys(value).length === 0) return "Não listado"

    if(value?.frequency >= 0 && value?.entity?.name) return `${value.frequency} ${value.entity.name}`
    if(value?.entity?.name) return `${value.entity.name}`

    return "Não listado"
  }

  const Empty = () => {
    return (
      <p style={{margin:"0", fontWeight:"500", color:"#C4C4C4"}}>
        Não listado
      </p>
    )
  }

  const ObservationLevel = () => {
    const notFound = <SectionText marginRight="4px !important">Nenhum nível da observação fornecido.</SectionText>
    if(resource?.observationLevels === undefined || Object.keys(resource?.observationLevels).length === 0) return notFound

    let array = []
    const keys = Object.keys(resource?.observationLevels)

    keys.forEach((elm) => {
      const value = resource?.observationLevels[elm]

      const newValue = [value?.entity?.name || <Empty/>, value?.columns[0]?.name || <Empty/>]
      array.push(newValue)
    })

    return (
      <SimpleTable
        headers={["Entidade","Colunas Correspondentes"]}
        values={array}
        valuesTable={{_first:{textTransform: "capitalize"}}}
      />
    )
  }

  const StackSkeleton = ({ children, ...props }) => {
    return (
      <Skeleton
        startColor="#F0F0F0"
        endColor="#F3F3F3"
        borderRadius="6px"
        height="36px"
        width="100%"
        isLoaded={!isLoading}
        {...props}
      >
        {children}
      </Skeleton>
    )
  }

  if(isError) return <FourOFour/>

  return (
    <Stack
      flex={1}
      overflow="hidden"
      paddingLeft={{base: "0", lg: "24px"}}
      spacing={0}
    >
      <StackSkeleton>
        <Text
          fontFamily="Roboto"
          fontWeight="500"
          fontSize="24px"
          lineHeight="36px"
          color="#252A32"
          width="100%"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          {resource?.name}
        </Text>
      </StackSkeleton>

      <SkeletonText
        startColor="#F0F0F0"
        endColor="#F3F3F3"
        borderRadius="6px"
        width="100%"
        minHeight="60px"
        spacing="6px"
        skeletonHeight="16px"
        noOfLines={3}
        marginTop="8px !important"
        marginBottom="40px !important"
        isLoaded={!isLoading}
      >
        <ReadMore id="readLessTable">
          {resource?.description || "Não fornecido"}
        </ReadMore>
      </SkeletonText>

      <Stack spacing="8px">
        <StackSkeleton width="160px" height="20px">
          <Text
            fontFamily="Roboto"
            fontWeight="500"
            fontSize="18px"
            lineHeight="20px"
            color="#252A32"
          >
            Cobertura temporal
          </Text>
        </StackSkeleton>

        <StackSkeleton height="46px" width="350px">
          <TemporalCoverageBar value={resource?.fullCoverage}/>
        </StackSkeleton>
      </Stack>

      {/* <DataInformationQuery resource={resource}/> */}

      {/* <VStack width="100%" spacing={4} alignItems="flex-start">
        <Subtitle>
          Colunas
        </Subtitle>
        <ColumnDatasets tableId={resource?._id} />
      </VStack> */}

      {/* <VStack width="100%" spacing={5} alignItems="flex-start">
        <Subtitle>
          Nível da observação
        </Subtitle>
        <ObservationLevel/>
      </VStack> */}

      <Divider marginY="40px !important" borderColor="#DEDFE0"/>

      <StackSkeleton width="190px" height="20px" marginBottom="20px !important">
        <Text
          fontFamily="Roboto"
          fontWeight="500"
          fontSize="18px"
          lineHeight="20px"
          color="#252A32"
        >
          Informações adicionais
        </Text>
      </StackSkeleton>

      <SkeletonText
        startColor="#F0F0F0"
        endColor="#F3F3F3"
        borderRadius="6px"
        width="200px"
        minHeight="40px"
        spacing="4px"
        skeletonHeight="16px"
        noOfLines={2}
        marginBottom="24px !important"
        isLoaded={!isLoading}
      >
        <Text
          fontFamily="Roboto"
          fontWeight="500"
          fontSize="14px"
          lineHeight="20px"
          color="#252A32"
        >Publicação por</Text>
        <PublishedOrDataCleanedBy
          resource={resource?.publishedByInfo || "Não listado"}
        />
      </SkeletonText>

      <SkeletonText
        startColor="#F0F0F0"
        endColor="#F3F3F3"
        borderRadius="6px"
        width="200px"
        minHeight="40px"
        spacing="4px"
        skeletonHeight="16px"
        noOfLines={2}
        marginBottom="24px !important"
        isLoaded={!isLoading}
      >
        <Text
          fontFamily="Roboto"
          fontWeight="500"
          fontSize="14px"
          lineHeight="20px"
          color="#252A32"
        >Tratamento por</Text>
        <PublishedOrDataCleanedBy
          resource={resource?.dataCleanedByInfo || "Não listado"}
        />
      </SkeletonText>

      <SkeletonText
        startColor="#F0F0F0"
        endColor="#F3F3F3"
        borderRadius="6px"
        width="200px"
        minHeight="40px"
        spacing="2px"
        skeletonHeight="18px"
        noOfLines={2}
        marginBottom="24px !important"
        isLoaded={!isLoading}
      >
        <Text
          fontFamily="Roboto"
          fontWeight="500"
          fontSize="14px"
          lineHeight="20px"
          color="#252A32"
        >Versão</Text>
        <Text
          fontFamily="Roboto"
          fontWeight="400"
          fontSize="14px"
          lineHeight="20px"
          color="#464A51"
        >{resource?.version || "Não listado"}</Text>
      </SkeletonText>
    </Stack>
  )
}

  {/* <Grid width="100%" flex={1} templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
        <StarIcon alt="" width="22px" height="22px" fill="#D0D0D0"/>
        <AddInfoTextBase
          title="ID do conjunto"
          text={resource?.dataset?._id || "Não listado"}
        />
      </GridItem>

      <GridItem colSpan={useCheckMobile() && 2} display="flex" alignItems="flex-start" gridGap="8px">
        <StarIcon alt="" width="22px" height="22px" fill="#D0D0D0"/>
        <AddInfoTextBase
          title="ID da tabela"
          text={resource?._id || "Não listado"}
        />
      </GridItem>

      <GridItem colSpan={2} display="flex" alignItems="flex-start" gridGap="8px">
        <FrequencyIcon alt="Frequência de atualização" width="22px" height="22px" fill="#D0D0D0"/>
        <AddInfoTextBase
          title="Frequência de atualização"
          text={UpdateFrequency()}
        />
      </GridItem>

      <GridItem colSpan={2} display="flex" alignItems="flex-start" gridGap="8px">
        <PartitionIcon alt="Partições no BigQuery" width="22px" height="22px" fill="#D0D0D0"/>
        <AddInfoTextBase
          title="Partições no BigQuery"
          info="As partições são divisões feitas em uma tabela para facilitar o gerenciamento e a consulta aos dados.
          Ao segmentar uma tabela grande em partições menores, a quantidade de bytes lidos é reduzida,
          o que ajuda a controlar os custos e melhora o desempenho da consulta."
          text={resource?.partitions || "Não listado"}
        />
      </GridItem>

      <GridItem colSpan={2} display="flex" alignItems="flex-start" gridGap="8px">
        <FileIcon alt="Arquivos auxiliares" width="22px" height="22px" fill="#D0D0D0"/>
        <AddInfoTextBase
          title="Arquivos auxiliares"
          info="Os arquivos dão mais contexto e ajudam a entender melhor os dados disponíveis.
          Podem incluir notas técnicas, descrições de coleta e amostragem, etc."
          text={!resource?.auxiliaryFilesUrl && "Não listado"}
        >
          {resource?.auxiliaryFilesUrl &&
            <Link
              color="#42B0FF"
              href={resource?.auxiliaryFilesUrl}
            >
              Download dos arquivos
              <DownloadIcon
                alt="tip"
                marginLeft="8px"
                cursor="pointer"
                fill="#42B0FF"
                width="18px"
                height="18px"
              />
            </Link>
          }
        </AddInfoTextBase>
      </GridItem>
  </Grid> */}
