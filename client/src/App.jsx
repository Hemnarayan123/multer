import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('http://localhost:4001/upload', formData)
      .then(res => {
        console.log(res);
        fetchImage();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const fetchImage = () => {
    axios.get('http://localhost:4001/getImage')
      .then(res => {
        const images = res.data.result;
        if (images.length > 0) {
          setImage(images[0].image);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <div>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleUpdate}>Upload</button>
      </div>

      {image && (
        <div>
          <img src={`http://localhost:4001/image/${image}`} alt="Uploaded" />
        </div>
      )}
    </>
  );
}

export default App;
