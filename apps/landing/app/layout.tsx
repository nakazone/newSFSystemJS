import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Denver Hardwood Flooring Experts | Senior Floors | Free Estimate | (720) 751-9813",
  description: "Denver's #1 Hardwood Flooring Company | Senior Floors | Free In-Home Estimates | Licensed & Insured | 5-Star Rated | Serving Denver, Cherry Creek, Greenwood Village, Lakewood, Morrison.",
  keywords: "Denver flooring, hardwood flooring Denver, flooring contractor Denver CO, floor installation Denver, hardwood refinishing Denver, luxury vinyl plank Denver, laminate flooring Denver",
  openGraph: { title: "Senior Floors | Denver Hardwood Flooring Experts", description: "Free in-home estimates. 5-star rated. Licensed & insured." },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="https://www.senior-floors.com/logoSeniorFloors.png?v=6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
