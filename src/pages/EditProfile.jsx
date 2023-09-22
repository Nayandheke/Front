import { useEffect, useState } from "react"
import { FormItem, SubmitBtn} from "../components"
import http from "../http"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../store"
import { Col, Form, Row } from "react-bootstrap";
import { setInForm } from "../lib"
import { Loading } from "../components"

export const EditProfile = () => {

    const user = useSelector(state => state.user.value)

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(user).length){
            setForm({
                name: user.name,
                phone: user.phone,
                address: user.address
            })

        }
    }, [user])

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/edit', form)
            .then(() => http.get('profile/details'))
            .then(({data}) => {
                dispatch(setUser(data))
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
                <Form onSubmit={handleSubmit}>
                    <FormItem title="Name" label="Name">
                        <Form.Control type="text" name="name" id="name" defaultValue={form.name} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Phone" label="Phone">
                        <Form.Control type="text" name="phone" id="phone" defaultValue={form.phone} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Address" label="Address">
                        <Form.Control as="textarea" name="address" id="address" defaultValue={form.address} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>
                    <div className="mb-3">
                        <SubmitBtn loading={loading}/>

                    </div>
                </Form>
               
    );
};