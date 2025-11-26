import { redirect } from 'next/navigation'

export default function RootPage() {
  // default to English
  redirect('/en')
}
