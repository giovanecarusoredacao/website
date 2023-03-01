import axios from "axios";
import { removeEmptyFields } from "../../utils";

const API_URL= process.env.NEXT_PUBLIC_API_URL

export async function getListDatasets() {
  const res = await axios({
    url: API_URL,
    method: "POST",
    data: {
      query: `
      query {
        allDataset {
          edges {
            node {
              _id
            }
          }
        }
      }
      `
    },
    variables: null
  })
  try {
    const data = res.data.data.allDataset.edges.map((res) => res.node._id)
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getShowDataset(id) {
  const res = await axios({
    url: API_URL,
    method: "POST",
    data: {
      query: `
      query {
        allDataset (id: "${id}") {
          edges {
            node {
              _id
              slug
              name
              description
              organization {
                _id
                slug
                name
                website
              }
              informationRequests {
                edges {
                  node {
                    _id
                    slug
                  }
                }
              }
              rawDataSources {
                edges {
                  node {
                    _id
                    name
                  }
                }
              }
              tables {
                edges {
                  node {
                    _id
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables: null
    }
  })
  try {
    const data = res.data.data.allDataset.edges[0].node
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getBdmTable(id) {
  const res = await axios({
    url: API_URL,
    method: "POST",
    data: {
      query: `
      query {
        allTable (id: "${id}") {
          edges {
            node {
              _id
              slug
              name
              description
            }
          }
        }
      }
      `,
      variables: null
    }
  })
  try {
    const data = res.data.data.allTable.edges[0].node
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getRawDataSources(id) {
  const res = await axios({
    url: API_URL,
    method: "POST",
    data: {
      query: `
      query {
        allRawdatasource (id: "${id}"){
          edges {
            node {
              _id
              name
              description
              rawDataUrl
              auxiliaryFilesUrl
              languages {
                edges {
                  node {
                    _id
                    name
                  }
                }
              }
              availability {
                _id
                name
              }
              coverages {
                edges {
                  node {
                    _id
                    temporalCoverage
                  }
                }
              }
              license {
                name
              }
              updateFrequency {
                timeUnit {
                  name
                }
              }
            }
          }
        }
      }
      `,
      variables: null
    }
  })
  try {
    const data = res.data.data.allRawdatasource.edges[0].node
    return data
  } catch (error) {
    console.error(error)
  }
}

export async function getInformationRequest(id) {
  const res = await axios({
    url: API_URL,
    method: "POST",
    data: {
      query: `
      query {
        allInformationrequest (id: "${id}"){
          edges {
            node {
              _id
              slug
              url
              dataUrl
              origin
              observations
              updateFrequency {
                _id
                number
              }
              status {
                _id
                name
              }
              coverages {
                edges {
                  node {
                    _id
                    datetimeRanges {
                      edges {
                        node {
                          _id
                          startYear
                          startSemester
                          startQuarter
                          startMonth
                          startDay
                          startHour
                          startMinute
                          startSecond
                          endYear
                          endSemester
                          endQuarter
                          endMonth
                          endDay
                          endHour
                          endMinute
                          endSecond
                          interval
                        }
                      }
                    } 
                  }
                }
              }
            }
          }
        }
      }
      `,
      variables: null
    }
  })
  try {
    const data = res.data.data.allInformationrequest.edges[0].node

    return removeEmptyFields(data)
  } catch (error) {
    console.error(error)
  }
}
