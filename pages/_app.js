import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
  <Component {...pageProps} />
  {console.log(pageProps)}
  </>
}

export default MyApp
