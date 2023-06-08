import Head from 'next/head'

import { gqlShopify } from '@/pages/api/graphql'
import { GET_PAYMENT_METHODS, GET_SHOP_NAME } from '@/pages/api/queries'

import layout from '@/styles/Layout.module.scss'
//import styles from '@/styles/Cart.module.scss'
import PageHeader from '@/components/PageHeader'
import { useCart } from '@/context/state'

const Cart = ({ shopName }: any) => {
	const { cartId, items, updateCartId, updateCartItems } = useCart()
	console.log(cartId, items, updateCartId, updateCartItems)

	const title = `${shopName} | Din kundvagn`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content='Generated by create next app' />
			</Head>
			<div className={`${layout.container} ${layout.no_top_margin}`}>
				<PageHeader>Din kundvagn</PageHeader>
				{items && items > 0 ? null : (
					<div className={layout.wrapped_container}>
						<PageHeader style={{ textAlign: 'center' }} heading='h2'>
							Din kundvagn är tom
						</PageHeader>
					</div>
				)}
			</div>
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopName: shop.shop.name,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default Cart