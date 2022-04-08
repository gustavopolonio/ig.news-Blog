import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { createClient } from '../../../services/prismic'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'

import styles from '../post.module.scss'

interface PostPreviewProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title} | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
            className={`${styles.content} ${styles.previewContent}`} 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </article>

        <Link href='/'>
          <a className={styles.subscribeButton}>
            Wanna continue reading?
            <span> Subscribe now 🤗</span>
          </a>
        </Link>
      </main>
    </>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params
  
  const prismic = createClient()
  const response = await prismic.getByUID('post', String(slug))

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.slice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: { post },
    revalidate: 60 * 30 // 30 minutos
  }
}