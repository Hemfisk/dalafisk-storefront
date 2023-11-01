import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import styles from '@/styles/Popup.module.scss'
import Button from './Button'

const MailPopup = ({ newsletter }: any) => {
	const [open, setOpen] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [email, setEmail] = useState('')

	const notification = (message: string) => {
		if (message === 'success') {
			toast.success('Tack för att du gått med i vårt nyhetsbrev!', {
				position: toast.POSITION.BOTTOM_CENTER,
			})
		} else if (message === 'fail') {
			toast.error('Åh nej! Något gick fel, var vänlig försök igen.', {
				position: toast.POSITION.BOTTOM_CENTER,
			})
		}
	}

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

	const submitMailForm = (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitting(true)

		axios
			.post(
				'https://Dalafisk.us9.list-manage.com/subscribe/post?u=ccd90fd17dce57c1ad1f1f663&id=ef7ad01277&f_id=004722e1f0',
				{ MAIL: email, b_ccd90fd17dce57c1ad1f1f663_ef7ad01277: '' }
			)
			.then((res) => {
				if (res.status === 200) {
					notification('success')
					localStorage.setItem('newsLetterShown', 'signed-up')
					setOpen(false)
				} else {
					setSubmitting(false)
					notification('fail')
					console.error('Message not sent')
					console.error(e)
				}
			})
			.catch((e) => {
				setSubmitting(false)
				notification('fail')
				console.error('Message not sent')
				console.error(e)
			})
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
					<form onSubmit={(e) => submitMailForm(e)} className={styles.form}>
						<div className={styles.input_container}>
							<label htmlFor='email'>Din e-post</label>
							<input
								type='email'
								name='email'
								id='email'
								placeholder='Din e-postadress'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className={styles.button_container}>
							<Button primary type='submit' disabled={submitting}>
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
