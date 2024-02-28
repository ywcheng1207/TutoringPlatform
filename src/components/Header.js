'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useContext } from "react"
import { mainContext } from "@/context/mainContext"

const navLinks = [
  {
    id: 1,
    href: '/signin',
    Name: 'signin'
  },
  {
    id: 2,
    href: '/signup',
    Name: 'signup'
  },
  {
    id: 3,
    href: '/home',
    Name: 'home'
  }
]

const Header = () => {
  const pathname = usePathname()
  const test = useContext(mainContext)
  console.log(test)

  return (
    <div>
      {
        navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <Link
              style={{ color: isActive ? 'yellow' : 'blue' }}
              href={link.href}
              key={link.id}
            >
              {link.Name}
            </Link>
          )
        })
      }
      <div>
        {test}
      </div>
    </div>
  )
}

export default Header