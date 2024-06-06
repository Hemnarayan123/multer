import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('file', file);


    if (editingProduct) {
      await axios.put(`http://localhost:4001/update/${editingProduct._id}`, formData)
        .then(res => {
          console.log(res);
          fetchProducts();
          setEditingProduct(null);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      await axios.post('http://localhost:4001/upload', formData)
        .then(res => {
          console.log(res);
          fetchProducts();
        })
        .catch(err => {
          console.log(err);
        });
    }

    setName('');
    setPrice('');
    setFile(null);
  };

  const fetchProducts = () => {
    axios.get('http://localhost:4001/getProducts')
      .then(res => {
        setProducts(res.data.result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/delete/${id}`)
      .then(res => {
        console.log(res);
        fetchProducts();
      })
      .catch(err => {
        console.log(err);
      });
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
       <div>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={handleUpdate}>
          {editingProduct ? 'Update' : 'Upload'}
        </button>
      </div>

      <div>
        {products.map(product => (
          <div key={product._id} className="card">
            <img src={`http://localhost:4001/image/${product.image}`} alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Price: ${product.price}</p>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
