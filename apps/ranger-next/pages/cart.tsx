import Link from 'next/link'

const Cart = () => {
  return (
    <div>
      <span>Cart Page</span>
      <br />
      <Link href="/checkout">Checkout Page</Link>
    </div>
  )
}

export default Cart
