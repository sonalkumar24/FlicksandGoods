import React, { useEffect, useState } from 'react'
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
  CFormSelect,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { base_URL } from '../../global'

const FormControl = () => {
  const [products, setProducts] = useState({})
  let nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append("trailer_id", products.trailer_id)
    formData.append("name", products.name)
    formData.append("photo", products.photo)
    formData.append("price", products.price)
    formData.append("description", products.description)
    formData.append("color", products.color)
    formData.append("size", products.size)

    axios.post(`${base_URL}/products/insert`, formData)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          alert("product added successfully")
          nav('/products')
        }
        else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const [trailers, setTrailers] = useState([])
  useEffect(() => {
    axios.get(`${base_URL}/trailers/get/all`)
      .then((res) => {
        console.log(res)
        setTrailers(res.data.trailers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value })
  }
  console.log(products)

  const handleChangeImage = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.files[0] })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Product</strong>
          </CCardHeader>
          <CCardBody>

            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="Input1">Movies</CFormLabel>
                <CFormSelect onChange={handleChange} name='trailer_id' aria-label="Default select example">
                  <option value="" selected disabled>Select Movie</option>
                  {trailers.map((item) => {
                    return (
                      <option value={item._id}>{item.name}</option>
                    )
                  })}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input2">Product Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input2"
                  placeholder="Enter Product Name"
                  onChange={handleChange}
                  required
                  name='name'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input3">Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="Input3"
                  placeholder="Add Photo"
                  onChange={handleChangeImage}

                  name='photo'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input4">Price</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input4"
                  placeholder="Enter Price"
                  onChange={handleChange}
                  name='price'
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input5">Description</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input5"
                  placeholder="Add Description"
                  onChange={handleChange}
                  required
                  name='description'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input6">Color</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input6"
                  placeholder="Add Color"
                  onChange={handleChange}
                  required
                  name='color'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input7">Size</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input7"
                  placeholder="Add Size"
                  onChange={handleChange}
                  required
                  name='size'
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
