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
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { useNavigate } from 'react-router-dom'
import { base_URL } from '../../global'
import moment from 'moment'

const Tables = () => {

  const [reviews, setReviews] = useState([])
  const [change, setChange] = useState(false)
  useEffect(() => {
    axios.get(`${base_URL}/review/get`)
      .then((res) => {
        console.log(res, 111111)
        setReviews(res.data.reviews)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])

  let nav = useNavigate()

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Reviews</strong>
          </CCardHeader>
          <CCardBody>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Trailer Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Review</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {reviews.map((item, index) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                      <CTableDataCell>{item.trailer_id.name}</CTableDataCell>
                      <CTableDataCell>{item.user_id.name}</CTableDataCell>
                      <CTableDataCell>{item.user_id.phone}</CTableDataCell>
                      <CTableDataCell><textarea name="" id="" style={{height:"100px"}}>{item.message}</textarea></CTableDataCell>
                      <CTableDataCell>{moment(item.date).format("L")}</CTableDataCell>


                      {/* <CTableDataCell>
                        <CButton onClick={() => handleDelete(item._id)} color='danger'>Delete</CButton>
                      </CTableDataCell> */}
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
