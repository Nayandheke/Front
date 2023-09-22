import { useEffect, useState } from "react"
import {DataTable, Loading} from "../components"
import http from "../http"
import moment from "moment"

export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState([false])

    useEffect(() => {
        setLoading(true)
        http.get('profile/reviews')
            .then(({data}) => setReviews(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    },[])

    return loading ? <Loading/> : <DataTable data={reviews.map(review => {
        return {
            'Product' : review.product.name,
            'Comment' : review.comment,
            'Rating' : review.rating,
            'Created At': moment(review.createdAt).format('llll'),
            'Updated At': moment(review.updateAt).format('llll'),
        }
    })}/>
}