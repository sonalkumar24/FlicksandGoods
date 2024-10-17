import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
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
import { Link, useNavigate } from 'react-router-dom'
import { base_URL } from '../../global'

const Tables = () => {

  const [trailers, setTrailers] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    axios.get(`${base_URL}/api/trailers/get/all`)
      .then((res) => {
        console.log(res, 111111)
        setTrailers(res?.data?.trailers)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [change])
  let nav = useNavigate()

  const [genres, setGenres] = useState([])
  useEffect(() => {
    axios.get(`${base_URL}/api/genres/get`)
      .then((res) => {
        console.log(res)
        setGenres(res.data.genres)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleDelete = (id) => {
    setChange(true)
    axios.delete(`${base_URL}/api/trailers/delete/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Trailer deleted successfully")
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

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false)
    const [newTrailers, setNewTrailers] = useState(item)
    const handleChange = (e) => setNewTrailers({ ...newTrailers, [e.target.name]: e.target.value })

    const handleEdit = () => {
      setChange(true)
      axios.put(`${base_URL}/api/trailers/update/${newTrailers._id}`, newTrailers)
        .then((res) => {
          if (res.data.success) {
            alert("Trailer updated successfully")
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
            <CModalTitle>Update</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="Input1">Genre</CFormLabel>
                <CFormSelect onChange={handleChange} name='genres_id' aria-label="Default select example">
                  <option value="" selected disabled>Select Genre</option>
                  {genres.map((item) => {
                    return (
                      <option value={item._id}>{item.name}</option>
                    )
                  })}
                </CFormSelect>

                <CFormLabel htmlFor="Input2">Trailer Name</CFormLabel>
                <CFormInput
                  value={newTrailers.name}
                  type="text"
                  name="name"
                  id="Input2"
                  placeholder="Enter Trailer Name"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input3">Movie Details</CFormLabel>
                <CFormInput
                  value={newTrailers.movie_details}
                  type="text"
                  name="movie_details"
                  id="Input3"
                  placeholder="Enter Movie Details"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input4">Photo</CFormLabel>
                <CFormInput
                  value={newTrailers.photo}
                  type="text"
                  name="photo"
                  id="Input4"
                  placeholder="Add Photo"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input5">Video</CFormLabel>
                <CFormInput
                  value={newTrailers.video}
                  type="url"
                  name="video"
                  id="Input5"
                  placeholder="Add Video"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input6">Release Date</CFormLabel>
                <CFormInput
                  value={newTrailers?.release_date}
                  type="text"
                  name="release_date"
                  id="Input6"
                  placeholder="Release Date"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="Input7">Actor Name</CFormLabel>
                <CFormInput
                  value={newTrailers.actor_name}
                  type="text"
                  name="actor_name"
                  id="Input7"
                  placeholder="Actor Name"
                  onChange={handleChange}
                  required
                />
                <CFormInput
                  value={newTrailers.ratings}
                  type="text"
                  name="ratings"
                  id="Input8"
                  placeholder="Ratings"
                  onChange={handleChange}
                  required
                />
                <CFormInput
                  value={newTrailers.media_type}
                  type="text"
                  name="media_type"
                  id="Input9"
                  placeholder="Media Type"
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
  return (
    <CRow>
      <CCol xs={12}>
        <CButton color='info' onClick={() => nav('/trailers/insert')} >Insert</CButton>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Trailers</strong>
          </CCardHeader>
          <CCardBody>

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Genres</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Movie Details</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Video</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Release Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actor Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ratings</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Media Type</CTableHeaderCell>

                </CTableRow>
              </CTableHead>
              <CTableBody>
                {trailers.map((item, index) => {
                  return (
                    <CTableRow>
                      <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                      <CTableDataCell>{item?.genres_id?.name}</CTableDataCell>
                      <CTableDataCell>{item?.name}</CTableDataCell>
                      <CTableDataCell> <textarea style={{ height: "100px" }} readOnly>{item?.movie_details}</textarea> </CTableDataCell>
                      <CTableDataCell> <img src={`${base_URL}/photo/${item?.photo}`} style={{ borderRadius: "10px", height: "100px", width: "100px" }} alt="No Image" /></CTableDataCell>
                      <CTableDataCell><Link target='_blank' to={item?.video}> <CButton color="success">View</CButton> </Link></CTableDataCell>
                      <CTableDataCell>{moment(item?.release_date).format('L')}</CTableDataCell>
                      <CTableDataCell><ul>{item?.actor_name.map((val) => (
                        <li>{val}</li>
                      ))}</ul></CTableDataCell>
                      <CTableDataCell>{item?.ratings}</CTableDataCell>
                      <CTableDataCell>{item?.media_type}</CTableDataCell>


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

