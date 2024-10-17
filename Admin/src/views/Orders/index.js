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
  CCollapse,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { base_URL } from '../../global'
import moment from 'moment'

const OrdersTable = () => {

  const [orders, setOrders] = useState([])
  const [shippings, setShippings] = useState([])
  const [change, setChange] = useState(false)
  const [openOrderId, setOpenOrderId] = useState(null)

  useEffect(() => {
    axios.get(`${base_URL}/api/order/get`)
      .then((res) => {
        setOrders(res.data.orders)
        setShippings(res.data.shippings)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])

  let nav = useNavigate()

  const toggleOrderDetails = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId)
  }

  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`${base_URL}/api/order/update/${orderId}`, { status: newStatus })
      .then((res) => {
        if (res.data.success) {
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
            <strong>Orders</strong>
          </CCardHeader>
          <CCardBody>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>Customer Name</CTableHeaderCell>
                  <CTableHeaderCell>Phone</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Amount</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {orders.map((order, index) => (
                  <React.Fragment key={order._id}>
                    <CTableRow>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{shippings[index]?.name}</CTableDataCell>
                      <CTableDataCell>{shippings[index]?.phone}</CTableDataCell>
                      <CTableDataCell>{shippings[index]?.email}</CTableDataCell>
                      <CTableDataCell>{order.amount}</CTableDataCell>
                      <CTableDataCell>{moment(order.date).format("L")}</CTableDataCell>
                      <CTableDataCell>{order.status}</CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">
                            Change Status
                          </CDropdownToggle>
                          <CDropdownMenu>
                            <CDropdownItem onClick={() => handleStatusChange(order._id, 'Pending')}>Pending</CDropdownItem>
                            <CDropdownItem onClick={() => handleStatusChange(order._id, 'Shipped')}>Shipped</CDropdownItem>
                            <CDropdownItem onClick={() => handleStatusChange(order._id, 'Delivered')}>Delivered</CDropdownItem>
                            <CDropdownItem onClick={() => handleStatusChange(order._id, 'Cancelled')}>Cancelled</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                        <CButton onClick={() => toggleOrderDetails(order._id)} color='primary' style={{ marginLeft: '10px' }}>
                          {openOrderId === order._id ? 'Hide Details' : 'Show Details'}
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell colSpan="7">
                        <CCollapse visible={openOrderId === order._id}>
                          <CTable>
                            <CTableHead>
                              <CTableRow>
                                <CTableHeaderCell>Product Image</CTableHeaderCell>
                                <CTableHeaderCell>Product Name</CTableHeaderCell>
                                <CTableHeaderCell>Quantity</CTableHeaderCell>
                                <CTableHeaderCell>Price</CTableHeaderCell>
                                <CTableHeaderCell>Total</CTableHeaderCell>
                              </CTableRow>
                            </CTableHead>
                            <CTableBody>
                              {order.product_details.map((product, idx) => (
                                <CTableRow key={idx}>
                                  <CTableDataCell>
                                    <img style={{ height: "100px", width: "100px" }} src={product.product_id?.photo ? `${base_URL}/api/productImages/${product.product_id.photo}`: 'defaultImageUrl'} alt={product.product_id?.name ||'Product Image'} />
                                  </CTableDataCell>
                                  <CTableDataCell>{product.product_id?.name}</CTableDataCell>
                                  <CTableDataCell>{product.quantity}</CTableDataCell>
                                  <CTableDataCell>{product.price}</CTableDataCell>
                                  <CTableDataCell>{(product.quantity * product.price).toFixed(2)}</CTableDataCell>
                                </CTableRow>
                              ))}
                            </CTableBody>
                          </CTable>
                        </CCollapse>
                      </CTableDataCell>
                    </CTableRow>
                  </React.Fragment>
                ))}
              </CTableBody>
            </CTable>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default OrdersTable
