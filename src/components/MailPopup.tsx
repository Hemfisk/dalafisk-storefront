import React, { useEffect, useState } from 'react'

import styles from '@/styles/Popup.module.scss'
import Button from './Button'

const MailPopup = ({ newsletter }: any) => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		const newsLetterShown = localStorage.getItem('newsLetterShown')
		const d = new Date()
		d.setMonth(d.getMonth() - 3)
		if (
			!newsLetterShown ||
			(newsLetterShown &&
				new Date(d.toLocaleDateString()) > new Date(newsLetterShown))
		) {
			setTimeout(() => {
				setOpen(true)
			}, 3000)
		}
	}, [])

	const closePopup = () => {
		localStorage.setItem('newsLetterShown', new Date().toLocaleDateString())
		setOpen(false)
	}

	const submittedMailForm = () => {
		setTimeout(() => {
			localStorage.setItem('newsLetterShown', 'signed-up')
			setOpen(false)
		}, 200)
	}

	if (open) {
		return (
			<>
				<div className={styles.popup_wrapper} onClick={() => closePopup()} />
				<div className={styles.popup}>
					<div className={styles.header}>{newsletter.title}</div>
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{
							__html: newsletter.body,
						}}
					/>
					<form
						action='https://Dalafisk.us9.list-manage.com/subscribe/post?u=ccd90fd17dce57c1ad1f1f663&id=ef7ad01277&f_id=004722e1f0'
						method='post'
						id='mc-embedded-subscribe-form'
						name='mc-embedded-subscribe-form'
						target='_blank'
						className={styles.form}
					>
						<div className={styles.input_container}>
							<label htmlFor='mce-EMAIL'>Din e-post</label>
							<input
								type='email'
								name='EMAIL'
								id='mce-EMAIL'
								required
								placeholder='Din e-postadress'
							/>
							<input
								className={styles.hidden}
								type='text'
								name='b_ccd90fd17dce57c1ad1f1f663_ef7ad01277'
							/>
						</div>
						<div className={styles.button_container}>
							<Button
								primary
								clickCallback={() => submittedMailForm()}
								type='submit'
							>
								Ja tack!
							</Button>
							<Button clickCallback={() => closePopup()}>Nej tack...</Button>
						</div>
					</form>
				</div>
			</>
		)
	}
	return null
}

export default MailPopup
