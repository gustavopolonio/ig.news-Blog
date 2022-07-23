import { useState } from 'react'
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'
import { GiHamburgerMenu } from 'react-icons/gi'

import styles from './styles.module.scss'

export function Header() {
  const [isMenuHamburguerOpen, setIsMenuHamburguerOpen] = useState(false)

  function toggleMenuHamburguer() {
    setIsMenuHamburguerOpen(true)
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig news" />
        
        <nav>
          <button 
            onClick={() => toggleMenuHamburguer()} 
            className={isMenuHamburguerOpen ? 'dsa' : styles.menuHamburguerButton}
          >
            <GiHamburgerMenu />
          </button>

          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}