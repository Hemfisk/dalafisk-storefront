import React from 'react'

import styles from '@/styles/Banner.module.scss'

const Banner = ({ bannerContent }: any) => {
	if (!bannerContent) {
		return null
	}

	return (
		<div className={styles.delivery_background}>
			<div className={styles.delivery_container}>
				<div className={styles.delivery_content}>
					<h2>{bannerContent.title}</h2>
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: bannerContent.body }}
					/>
				</div>
			</div>
		</div>
	)
}

export default Banner
