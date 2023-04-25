import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

import { gqlShopify } from './api/graphql'
import { GET_SHOP_NAME } from './api/queries'

const inter = Inter({ subsets: ['latin'] })

const Home = ({ data }: any) => {
	console.log(data)
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				{/* <link rel='icon' href='/favicon.ico' /> */}
			</Head>
			<main className={`${styles.main} ${inter.className}`}>
				<div className={styles.description}>
					<p>
						Get started by editing&nbsp;
						<code className={styles.code}>src/pages/index.tsx</code>
					</p>
				</div>

				<div className={styles.center}>
					<h1>{data?.shop?.name}</h1>
				</div>

				<div className={styles.grid}>
					<a
						href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						className={styles.card}
						target='_blank'
						rel='noopener noreferrer'
					>
						<h2>
							Docs <span>-&gt;</span>
						</h2>
						<p>
							Find in-depth information about Next.js features and&nbsp;API.
						</p>
					</a>

					<a
						href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						className={styles.card}
						target='_blank'
						rel='noopener noreferrer'
					>
						<h2>
							Learn <span>-&gt;</span>
						</h2>
						<p>
							Learn about Next.js in an interactive course with&nbsp;quizzes!
						</p>
					</a>

					<a
						href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						className={styles.card}
						target='_blank'
						rel='noopener noreferrer'
					>
						<h2>
							Templates <span>-&gt;</span>
						</h2>
						<p>
							Discover and deploy boilerplate example Next.js&nbsp;projects.
						</p>
					</a>

					<a
						href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
						className={styles.card}
						target='_blank'
						rel='noopener noreferrer'
					>
						<h2>
							Deploy <span>-&gt;</span>
						</h2>
						<p>
							Instantly deploy your Next.js site to a shareable URL
							with&nbsp;Vercel.
						</p>
					</a>
				</div>
			</main>
		</>
	)
}

export const getServerSideProps = async () => {
	const data = await gqlShopify(GET_SHOP_NAME)

	return { props: { data } }
}

export default Home
