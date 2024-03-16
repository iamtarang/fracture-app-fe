import { useState } from 'react'
import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';


function App() {

  const [selectedImage, setSelectedImage] = useState(null)

  const handleFileUpload = async () => {
    if (selectedImage) {
      console.log('there is selected image!')
      const formData = new FormData()
      formData.append('uploadImg', selectedImage)
      const { data } = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Access-Control-Allow-Origin": "*"
        }
      })
      console.log(data)
    }

  }

  return (
    <>
      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br /><br />
      <h1>Input File</h1>
      <input type="file"
        name="fileUpload"
        className="form-control"
        onChange={(e) => {
          console.log(e.target.files[0])
          setSelectedImage(e.target.files[0])
        }}
      />
      <br /><br />
      <button onClick={handleFileUpload}>Upload File</button>
    </>
  )
}

export default App
