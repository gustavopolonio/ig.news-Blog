import { AiFillGithub } from "react-icons/ai";
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from "next-auth/react"

import styles from './styles.module.scss'

export function SignInButton() {
  const { data: session } = useSession()

  return session 
  ? (
    <button className={styles.signInButton} onClick={() => signOut()}>
      <AiFillGithub color='#04D361' />
      {session.user.name}
      <FiX color='#737380' className={styles.closeButton} />
    </button>
  ) : (
    <button className={styles.signInButton} onClick={() => signIn('github')}>
      <AiFillGithub color='#EBA417' />
      Sign in with Github
    </button>
  )
}