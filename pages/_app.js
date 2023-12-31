import '../styles/globals.css'
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Footer from '../components/Footer';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Navbar from '../components/Navbar';
import { RecoilRoot } from 'recoil';
import Layout from '../components/layout';
config.autoAddCss = false;
library.add(fas, fab);
import { ClerkProvider } from "@clerk/nextjs";
import {neobrutalism, dark} from '@clerk/themes';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
       
        <link rel="icon" href="/PostPilot.png" type="image/png" sizes="64x64" />

      </Head>
    <RecoilRoot>
      <ClerkProvider appearance={{
        baseTheme: neobrutalism
      }}>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </RecoilRoot>
    </>
  );
}
export default MyApp


