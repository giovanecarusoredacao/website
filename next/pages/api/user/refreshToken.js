import axios from "axios";
import cookies from 'js-cookie';

const API_URL= `${process.env.NEXT_PUBLIC_API_URL}/api/v1/graphql`
let token = cookies.get("token") || ""

export default async function refreshToken() {
  const res = await axios({
    url: API_URL,
    method: "POST",
    data: {
      query: `
      mutation {
        refreshToken ( token: "${token}" ) {
          payload,
          refreshExpiresIn,
          token
        }
      }`
    }
  })
  try {
    const data = res.data.data
    if(res.data.errors.length > 0) {
      cookies.remove('user', { path: '/' })
      cookies.remove('token', { path: '/' })

      return window.open("/user/login", "_self")
    } 
    cookies.set('token', data?.refreshToken?.token)
    return data
  } catch (error) {
    console.error(error)
  }
}
