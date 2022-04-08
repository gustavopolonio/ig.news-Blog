import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import { createClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'

import styles from './post.module.scss'

interface PostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string
  }
}

export default function Post({ post }: PostProps) {

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  if (!session.activeSubscription) {

    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
  
  const { slug } = params
  
  const prismic = createClient()
  const response = await prismic.getByUID('post', String(slug))

  // console.log('post', JSON.stringify(response, null, 2))

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: { post }
  }
}