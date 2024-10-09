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

  const [genres,setGenres]=useState([])
  const [change,setChange] = useState(false)
  useEffect(()=>{
    axios.get(`${base_URL}/genres/get`)
    .then((res)=>{
      console.log(res,111111)
      setGenres(res.data.genres)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[change])

  let nav = useNavigate()
  
  const Edit = ({item}) => {
    const [visible, setVisible] = useState(false)
    const[newGenres, setNewGenres] = useState(item)
    const handleChange = (e) => setNewGenres({...newGenres,[e.target.name]:e.target.value})

    const handleEdit=()=>{
      setChange(true)
      axios.put(`${base_URL}/genres/update/${newGenres._id}`,{name:newGenres.name})
      .then((res)=>{
        if(res.data.success){
          alert("Genre updated successfully")          
        }
        else{
          alert(res.data.message)          
        }
        setVisible(false)
        setChange(false)
      })
      .catch((err)=>{
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
                  <CFormLabel htmlFor="exampleFormControlInput1">Genres Name</CFormLabel>
                  <CFormInput
                    value={newGenres.name}
                    type="text"
                    name="name"
                    id="exampleFormControlInput1"
                    placeholder="Enter Genres Name"
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
    axios.delete(`${base_URL}/genres/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Genre deleted successfully")
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
        <CButton color='info' onClick={()=>nav('/genres/insert')} >Insert</CButton>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Genres</strong>
          </CCardHeader>
          <CCardBody>
            
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                {genres.map((item,index)=>{
                  return(
                    <CTableRow>
                    <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.date}</CTableDataCell>

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
