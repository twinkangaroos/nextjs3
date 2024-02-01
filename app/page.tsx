import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Next.js 検証ページ',
}

export default function Home() {
  return (
    <>
      <h1>Hello, Next.js!</h1>
      <Link href="/dashboard">Dashboard</Link>
    </>
  )
}
