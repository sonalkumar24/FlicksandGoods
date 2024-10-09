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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { base_URL } from '../../global'



const FormControl = () => {
  const [trailers, setTrailers] = useState({})
  let nav = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("genres_id", trailers.genres_id)
    formData.append("name", trailers.name)
    formData.append("movie_details", trailers.movie_details)
    formData.append("photo", trailers.photo)
    formData.append("video", trailers.video)
    formData.append("release_date", trailers.release_date)
    formData.append("actor_name", trailers.actor_name)
    formData.append("ratings", trailers.ratings)
    formData.append("media_type", trailers.media_type)

    axios.post(`${base_URL}/trailers/insert`, formData)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          alert("trailer added successfully")
          nav('/trailers')
        }
        else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const [genres, setGenres] = useState([])
  useEffect(() => {
    axios.get(`${base_URL}/genres/get`)
      .then((res) => {
        console.log(res)
        setGenres(res.data.genres)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleChange = (e) => {
    setTrailers({ ...trailers, [e.target.name]: e.target.value })
  }
  console.log(trailers)

  const handleChangeIV = (e) => {
    setTrailers({ ...trailers, [e.target.name]: e.target.files[0] })
  }



  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Trailer</strong>
          </CCardHeader>
          <CCardBody>

            <CForm encType='multipart/form-data' onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="Input1">Genres</CFormLabel>
                <CFormSelect onChange={handleChange} name='genres_id' aria-label="Default select example">
                  <option value="" selected disabled>Select Genre</option>
                  {genres.map((item) => {
                    return (
                      <option value={item._id}>{item.name}</option>
                    )
                  })}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input2">Movie Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input2"
                  placeholder="Enter Movie Name"
                  onChange={handleChange}
                  required
                  name='name'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input3">Movie Details</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input3"
                  placeholder="Enter Movie Details"
                  onChange={handleChange}
                  required
                  name='movie_details'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input4">Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="Input4"
                  placeholder="Add Photo"
                  onChange={handleChangeIV}

                  name='photo'
                />
              </div>
           
              <div className="mb-3">
                <CFormLabel htmlFor="Input5">Video</CFormLabel>
                <CFormInput
                  type="url"
                  id="Input5"
                  placeholder="Add Video URL"
                  onChange={handleChange}

                  name='video'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input6">Release Date</CFormLabel>
                <CFormInput
                  type="date"
                  id="Input6"
                  placeholder="Release Date"
                  onChange={handleChange}
                  required
                  name='release_date'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input7">Actor Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input7"
                  placeholder="Actor Name"
                  onChange={handleChange}
                  required
                  name='actor_name'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input7">Ratings</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input8"
                  placeholder="Ratings"
                  onChange={handleChange}
                  required
                  name='ratings'
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="Input7">media_type</CFormLabel>
                <CFormInput
                  type="text"
                  id="Input9"
                  placeholder="Media Type"
                  onChange={handleChange}
                  required
                  name='media_type'
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
