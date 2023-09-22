import { useState } from "react"
import { FormItem, SubmitBtn} from "../components"
import http from "../http"
import { useSelector } from "react-redux"
import { Form } from "react-bootstrap";
import { setInForm } from "../lib"

export const Password = () => {

    const user = useSelector(state => state.user.value)

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/password', form)
            .then(() => http.get('profile/details'))
            .then(({data}) => {
                
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
                <Form onSubmit={handleSubmit}>
                    <FormItem title="Old Password" label="old Password">
                        <Form.Control type="password" name="oldPassword" id="oldPassword" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="New Password" label="New Password">
                        <Form.Control type="password" name="newPassword" id="newPassword" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Confirm Password" label="Confirm Password">
                        <Form.Control type="password" name="confirmPassword" id="confirmPassword" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <div className="mb-3">
                        <SubmitBtn loading={loading}/>

                    </div>
                </Form>
    );
};