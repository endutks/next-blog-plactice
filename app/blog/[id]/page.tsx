import {client} from '@/libs/microcms'
import styles from './page.module.css'

type Props = {
    id: string
    title: string
    content: string
    publishedAt: string
    tags: {name: string}
}

async function getBlogPost(id: string): Promise<Props> {
    const data = await client.get({
        endpoint: `blog/${id}`
    })
    return data 
}

export default async function BlogPostPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params //IDを取得
    const post = await getBlogPost(id)

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.tags}>カテゴリー：{post.tags && post.tags.name}</div>
            <div className={styles.post} dangerouslySetInnerHTML={{__html: post.content}} />
        </main>
    )
}

export async function generateStaticParams() {
    const contentIds = await client.getAllContentIds({endpoint: 'blog'})

    return contentIds.map((contentId) => ({id: contentId}))
}