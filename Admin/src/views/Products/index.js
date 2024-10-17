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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { base_URL } from '../../global'

const Tables = () => {

  const [products, setProducts] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get(`${base_URL}/api/products/get`)
      .then((res) => {
        console.log(res, 111111)
        setProducts(res.data.products)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])
  let nav = useNavigate()

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false)
    const [newProducts, setNewProducts] = useState(item)
    const handleChange = (e) => setNewProducts({ ...newProducts, [e.target.name]: e.target.value })

    const handleEdit = () => {
      setChange(true)
      axios.put(`${base_URL}/api/products/update/${newProducts._id}`, newProducts)
        .then((res) => {
          if (res.data.success) {
            alert("Product updated successfully")
          }
          else {
            alert(res.data.message)
          }
          setVisible(false)
          setChange(false)
        })
        .catch((err) => {
          alert(err.message)
          setVisible(false)
        })
    }
    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Modal title</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="Input1">Trailer</CFormLabel>
                <CFormInput
                  value={newProducts?.trailer_id?.name}
                  type="text"
                  name="trailer_id"
                  id="Input1"
                  placeholder="Enter Movie Name"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input2">Product Name</CFormLabel>
                <CFormInput
                  value={newProducts.name}
                  type="text"
                  name="name"
                  id="Input2"
                  placeholder="Enter Product Name"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input4">Price</CFormLabel>
                <CFormInput
                  value={newProducts.price}
                  type="text"
                  name="price"
                  id="Input4"
                  placeholder="Price"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input5">Description</CFormLabel>
                <CFormInput
                  value={newProducts.description}
                  type="text"
                  name="description"
                  id="Input5"
                  placeholder="Product Description"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input6">Color</CFormLabel>
                <CFormInput
                  value={newProducts.color}
                  type="text"
                  name="color"
                  id="Input6"
                  placeholder="Enter Color"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input7">Size</CFormLabel>
                <CFormInput
                  value={newProducts.size}
                  type="text"
                  name="size"
                  id="Input7"
                  placeholder="Enter Size"
                  onChange={handleChange}
                  required
                />
              </div>
            </CForm>

          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton onClick={handleEdit} color="primary">Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }

  const handleDelete = (id) => {
    setChange(true)
    axios.delete(`${base_URL}/api/products/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Product deleted successfully")
        }
        else {
          alert(res.data.message)
        }
        setChange(false)
      })
      .catch((err) => {
        alert(err.message)
        setVisible(false)
      })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CButton color='info' onClick={() => nav('/products/insert')} >Insert</CButton>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong>
          </CCardHeader>
          <CCardBody>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Trailer</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Color</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Size</CTableHeaderCell>

                </CTableRow>
              </CTableHead>
              <CTableBody>
                {products.map((item, index) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                      <CTableDataCell>{item?.trailer_id?.name}</CTableDataCell>
                      <CTableDataCell>{item?.name}</CTableDataCell>
                      <CTableDataCell><img style={{ height: "100px", width: "100px" }} src={`${base_URL}/productImages/${item?.photo}`} alt="No Image" /> </CTableDataCell>
                      <CTableDataCell>{item?.price}</CTableDataCell>
                      <CTableDataCell>{item?.description}</CTableDataCell>
                      <CTableDataCell>{item?.color}</CTableDataCell>
                      <CTableDataCell>{item?.size}</CTableDataCell>


                      <CTableDataCell>
                        <Edit item={item} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButton onClick={() => handleDelete(item._id)} color='danger'>Delete</CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}

              </CTableBody>

            </CTable>

          </CCardBody>
        </CCard>
      </CCol>

    </CRow>
  )
}


export default Tables
