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

const PaymentsTable = () => {

  const [payments, setPayments] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get(`${base_URL}/payments/get`)
      .then((res) => {
        setPayments(res.data.payments)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])

  let nav = useNavigate()


  const totalAmount = payments.reduce((total, payment) => total + payment.total_amount, 0)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Payments</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col">Product</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Payment Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {payments.map((payment, index) => (
                  <CTableRow key={payment._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{payment.user_id.name}</CTableDataCell>
                    <CTableDataCell>{payment.user_id.phone}</CTableDataCell>
                    <CTableDataCell>{payment.user_id.email}</CTableDataCell>
                    <CTableDataCell>{payment.total_amount}</CTableDataCell>

                    <CTableDataCell>{payment.payment_type}</CTableDataCell>
                    <CTableDataCell>{moment(payment.date).format("L")}</CTableDataCell>

                  </CTableRow>
                ))}
                <CTableRow color='success'>
                  <CTableDataCell colSpan={6}>Total </CTableDataCell>
                  <CTableDataCell colSpan={1}>{totalAmount} </CTableDataCell>
                </CTableRow>
              </CTableBody>

            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default PaymentsTable
