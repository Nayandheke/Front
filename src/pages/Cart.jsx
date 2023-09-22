import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearStorage, imgUrl } from "../lib"
import { clearCart, setCart } from "../store"
import { toast } from "react-toastify"
import { Loading } from "../components"
import http from "../http"

export const Cart = () => {
  const [cartInfo, setCartInfo] = useState({ qty: 0, total: 0 })
  const cart = useSelector(state => state.cart.value)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(cart).length) {
      let qty = 0, total = 0

      for (let id in cart) {
        qty += cart[id].qty
        total += cart[id].total
      }
      setCartInfo({ qty, total })
    } else {
      setCartInfo({ qty: 0, total: 0 })
    }
  }, [cart])

  const handleClear = () => {
    dispatch(clearCart())

    toast.success('Shopping cart is empty.')
  }

  const handleChange = (id, qty) => {
    dispatch(
      setCart({
        ...cart,
        [id]: {
          product: cart[id].product,
          qty,
          total: qty * cart[id].price,
          price: cart[id].price,
        },
      })
    );
  }

  const handleDelete = id => {
    let temp = {}

    for (let k in cart) {
      if (k != id) {
        temp = {
          ...temp,
          [k]: cart[k],
        }
      }
    }
    dispatch(setCart(temp))
  }

  const handleCheckout = () => {
    setLoading(true)
    let data = []


    for (let k in cart) {
      data.push({
        productId: k,
        qty: cart[k].qty
      })
    }
    http.post('checkout', data)
      .then(() => {
        dispatch(clearCart())

        navigate('/')
      })
      .catch(err => { })
      .finally(() => setLoading(false))
  }

  return <>

    <div className="col-12">
      {/* Main Content */}
      <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
          <h2>Shopping Cart</h2>
        </div>
      </div>
      {loading ? <Loading /> : <main className="row">
        <div className="col-12 bg-white py-3 mb-3">
          <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-10 mx-auto table-responsive">
              {Object.keys(cart).length ? <form className="row">
                <div className="col-12">
                  <table className="table table-striped table-hover table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Amount</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(cart).map(item =>
                        <tr key={item.product._id}>
                          <td>
                            <img src={imgUrl(item.product.images[0])} className="img-fluid me-4" />
                            {item.product.name}
                          </td>
                          <td>
                            Rs. {item.price}
                          </td>
                          <td>
                            <input type="number" min={1} defaultValue={item.qty} onChange={ev => handleChange(item.product._id, parseInt(ev.target.value))} />
                          </td>
                          <td>
                            Rs. {item.total}
                          </td>
                          <td>
                            <button className="btn btn-link text-danger" onClick={() => handleDelete(item.product._id)}><i className="fas fa-times" /></button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th colSpan={2} className="text-right">Total</th>
                        <th>{cartInfo.qty}</th>
                        <th>Rs. {cartInfo.total}</th>
                        <th />
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="col-12 text-right">
                  <button className="btn btn-outline-secondary me-3" type="button" onClick={handleClear}>Clear Cart</button>
                  <button className="btn btn-outline-success" onClick={handleCheckout}>Checkout</button>
                </div>
              </form> : <h4 className="fst-italic text-center">Shopping cart is empty</h4>
              }
            </div>
          </div>
        </div>
      </main>}
      {/* Main Content */}
    </div>


  </>
}