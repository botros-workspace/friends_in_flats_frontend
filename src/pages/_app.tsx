import React from 'react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import Layout from '@/components/shared/Layout'
import '../globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}
export default MyApp
