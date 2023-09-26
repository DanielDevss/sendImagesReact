import { useState } from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [image, setImage] = useState("https://via.placeholder.com/500x500");

  const handleSubmit = async(e) => {
    e.preventDefault();
    let formData =  new FormData(e.target);
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NzYzNTcxLCJleHAiOjE3MDM1Mzk1NzF9.2XvGPbnDb2vHMyBprPcAecNUAmb5_OSDyJAGvYg-O-I";

    fetch(`https://lovelatnet.com/api/upload/uploadImages?token=${token}`, {
      method: "POST",
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      let imageurl = result.urlbase + result.array[0];
      setImage(imageurl)
      console.log(imageurl)
      console.log(result)
    })
  };

  return (
    <>
      <figure className='mb-3 card'>
        <img src={image} className='d-block m-auto w-50 rounded-3' alt="Imagen de prueba" />
        <caption className='w-100 d-block text-center'>{(image === "https://via.placeholder.com/500x500") ? "En espera" : "Imagen desde el servidor"}</caption>
      </figure>
      <form method='POST' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="images" className='form-label'>Selecciona las imagenes</label>
            <input type="file" multiple name='images' className='form-control' />
          </div>
          <div className="mb-3"><button type='submit' className="btn btn-success">Enviar foto</button></div>
      </form>
    </>
  )
}

export default App
