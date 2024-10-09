import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Login = ({ setToken }) => {
  let nav = useNavigate()
  const [login_details, setLogin_details] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${base_URL}/admin/login`, login_details)
      .then((res) => {
        console.log(res, 1111)
        if (res.data.success) {
          let token = res.data.token
          setToken(token)
          localStorage.setItem("token", token)
          alert("Login Successful")
          nav('/')
        }
        else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err, 2222)
      })
  }

  const handleChange = (e) => {
    setLogin_details({ ...login_details, [e.target.name]: e.target.value });
  }
  console.log(login_details, 1111)
  return (

    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput name='email' placeholder="Username" autoComplete="email" onChange={handleChange} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name='password'
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
