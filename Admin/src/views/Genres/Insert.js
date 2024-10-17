import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { base_URL } from '../../global'

const FormControl = () => {
    let nav = useNavigate()
    const [genres,setGenres]=useState("")
    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post(`${base_URL}/api/genres/insert`,{name:genres})
        .then((res)=>{
            console.log(res)
            if(res.data.success){
                alert("genre added successfully")
                nav('/genres')
            }
            else{
                alert(res.data.message)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Genres</strong>
          </CCardHeader>
          <CCardBody>
            
              <CForm onSubmit={handleSubmit}>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Genres Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder="Enter Genres Name"
                    onChange={(e)=>setGenres(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <CButton type='submit' color="primary">Submit</CButton>
                </div>
              </CForm>
            
          </CCardBody>
        </CCard>
      </CCol>
      
    </CRow>
  )
}

export default FormControl
