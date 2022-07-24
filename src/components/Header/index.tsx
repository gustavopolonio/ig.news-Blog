import { useState } from 'react'
import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoCloseSharp } from 'react-icons/io5'

import styles from './styles.module.scss'

export function Header() {
  const [isMenuHamburguerOpen, setIsMenuHamburguerOpen] = useState(false)

  function toggleMenuHamburguer() {
    isMenuHamburguerOpen ? setIsMenuHamburguerOpen(false) : setIsMenuHamburguerOpen(true)
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig news" />
        
        <nav className={isMenuHamburguerOpen ? styles.menuHamburguerOpen : ''}>
          <button 
            onClick={() => toggleMenuHamburguer()} 
            className={styles.menuHamburguerButton}
          >
            { isMenuHamburguerOpen ? <IoCloseSharp /> : <GiHamburgerMenu /> }
            
          </button>

          <ActiveLink href="/" activeClassName={styles.active}>
            <a onClick={() => toggleMenuHamburguer()}>Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a onClick={() => toggleMenuHamburguer()}>Posts</a>
          </ActiveLink>
        </nav>

        <div 
          style={{ display: 'none' }}
          className={isMenuHamburguerOpen ? styles.overlayBackground : ''} 
          onClick={() => toggleMenuHamburguer()}
        ></div>

        <SignInButton />
      </div>
    </header>
  )
}