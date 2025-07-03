import Link from "next/link"
import {client} from '@/libs/microcms'

type Props = {
    id: string
    title: string
}

async function getBlogProps(): Promise<Props[]>{
    const data = await client.get({
        endpoint: 'blog',
        queries: {
            fields: 'id,title',
            limit: 5
        }
    })
    return data.contents
}

export default async function Home() {
    const posts = await getBlogProps()

    return(
        <main>
            <h1>ブログ記事一覧</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}