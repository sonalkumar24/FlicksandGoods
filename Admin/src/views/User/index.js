import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
import moment from 'moment'

const Tables = () => {

  const [users, setUsers] = useState([])
  const [change, setChange] = useState(false)
  useEffect(() => {
    axios.get(`${base_URL}/api/user/get`)
      .then((res) => {
        console.log(res, 111111)
        setUsers(res.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])

  let nav = useNavigate()

  const handleDelete = (id) => {
    axios.delete(`${base_URL}/api/user/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("User deleted successfully")
          setChange(!change)
        } else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert(err.message)
      })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Users</strong>
          </CCardHeader>
          <CCardBody>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {users.map((item, index) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{item.phone}</CTableDataCell>
                      <CTableDataCell>{item.email}</CTableDataCell>
                      <CTableDataCell>{moment(item.date).format("L")}</CTableDataCell>


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
