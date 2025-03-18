import React, { useState } from 'react';
import { Camera } from 'lucide-react';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState({ flavor: '', crunchiness: 0, filling: 0, global: 0, price: 1 , sabor:0});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResult((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('flavor', result.flavor);
    formData.append('crunchiness', result.crunchiness);
    formData.append('filling', result.filling);
    formData.append('global', result.global);
    formData.append('price', result.price);
    formData.append('sabor', result.sabor);


    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Submitted:', data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const priceLabels = ["Muito barato", "Barato", "Justo", "Caro", "Muito caro"];

  return (
    <div className="background" style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom right, #fff5f0, #ffe8e8)",
      padding: "1rem" 
    }}>
      <div className="box" style={{ 
        maxWidth: "500px", 
        margin: "0 auto", 
        background: "white", 
        borderRadius: "24px", 
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)", 
        padding: "1.5rem", 
        overflow: "hidden" 
      }}>
        <h1 className="header" style={{ 
          fontSize: "2rem", 
          fontWeight: "bold", 
          textAlign: "center", 
          color: "#e53e3e", 
          marginBottom: "1.5rem" 
        }}>🍕 Avaliação de Pizza</h1>
        
        <div className="image-container" style={{ marginBottom: "1.5rem" }}>
          <label className="image-input" style={{ 
            display: "block",
            position: "relative",
            cursor: "pointer",
            background: "#fff5f5",
            borderRadius: "16px",
            padding: "1.5rem",
            border: "2px dashed #feb2b2",
            transition: "background-color 0.2s",
            textAlign: "center"
          }}>
            <Camera className="camera-icon" style={{ 
              color: "#e53e3e", 
              height: "2.5rem", 
              width: "2.5rem", 
              margin: "0 auto 0.5rem" 
            }} />
            <span className="upload-text" style={{ 
              color: "#c53030", 
              fontWeight: "500", 
              textAlign: "center", 
              display: "block" 
            }}>
              {preview ? "Trocar a foto" : "Toque para tirar uma foto da sua Pizza"}
            </span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>

          {preview && (
            <div className="preview-container" style={{ marginTop: "1.5rem" }}>
              <img
                src={preview}
                alt="Preview"
                className="preview"
                style={{ 
                  width: "100%", 
                  aspectRatio: "1/1", 
                  objectFit: "cover", 
                  borderRadius: "16px", 
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
                  border: "2px solid #fed7d7" 
                }}
              />
            </div>
          )}
        </div>

        <div className="form-container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="input-group" style={{ 
            background: "#fff5f5", 
            padding: "1rem", 
            borderRadius: "12px" 
          }}>
            <label className="input">
              <span className="input-label" style={{ 
                color: "#9b2c2c", 
                fontWeight: "500", 
                display: "block", 
                marginBottom: "0.5rem" 
              }}>Sabor:</span>
              <input
                type="text"
                name="flavor"
                value={result.flavor}
                onChange={handleInputChange}
                className="text-input"
                placeholder="ex.: Margherita, Pepperoni"
                style={{ 
                  width: "90%", 
                  padding: "0.75rem 1rem", 
                  borderRadius: "12px", 
                  border: "1px solid #fed7d7",
                  outline: "none" 
                }}
              />
            </label>
          </div>

          <div className="input-group" style={{ 
            background: "#fff5f5", 
            padding: "1rem", 
            borderRadius: "12px" 
          }}>
            <label className="input">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span className="input-label" style={{ color: "#9b2c2c", fontWeight: "500" }}>Crocância:</span>
                <span className="value-display" style={{ color: "#e53e3e", fontWeight: "bold" }}>{result.crunchiness}</span>
              </div>
              <input
                type="range"
                name="crunchiness"
                min="0"
                max="10"
                value={result.crunchiness}
                onChange={handleInputChange}
                className="slider-input"
                style={{ 
                  width: "100%", 
                  height: "8px",
                  background: "#fed7d7",
                  borderRadius: "9999px",
                  appearance: "none",
                  cursor: "pointer"
                }}
              />
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                fontSize: "0.75rem", 
                color: "#e53e3e", 
                marginTop: "0.25rem",
                position: "relative",
                height: "1rem",
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
              }}>
                <span style={{ position: "absolute", left: "0%" }}>0</span>
                <span style={{ position: "absolute", left: "50%" }}>5</span>
                <span style={{ position: "absolute", right: "0%" }}>10</span>
              </div>
            </label>
          </div>

          <div className="input-group" style={{ 
            background: "#fff5f5", 
            padding: "1rem", 
            borderRadius: "12px" 
          }}>
            <label className="input">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span className="input-label" style={{ color: "#9b2c2c", fontWeight: "500" }}>Recheio:</span>
                <span className="value-display" style={{ color: "#e53e3e", fontWeight: "bold" }}>{result.filling}</span>
              </div>
              <input
                type="range"
                name="filling"
                min="0"
                max="10"
                value={result.filling}
                onChange={handleInputChange}
                className="slider-input"
                style={{ 
                  width: "100%", 
                  height: "8px",
                  background: "#fed7d7",
                  borderRadius: "9999px",
                  appearance: "none",
                  cursor: "pointer"
                }}
              />
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                fontSize: "0.75rem", 
                color: "#e53e3e", 
                marginTop: "0.25rem",
                position: "relative",
                height: "1rem",
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
              }}>
                <span style={{ position: "absolute", left: "0%" }}>0</span>
                <span style={{ position: "absolute", left: "50%" }}>5</span>
                <span style={{ position: "absolute", right: "0%" }}>10</span>
              </div>
            </label>
          </div>
          <div className="input-group" style={{ 
            background: "#fff5f5", 
            padding: "1rem", 
            borderRadius: "12px" 
          }}>
            <label className="input">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span className="input-label" style={{ color: "#9b2c2c", fontWeight: "500" }}>Sabor:</span>
                <span className="value-display" style={{ color: "#e53e3e", fontWeight: "bold" }}>{result.sabor}</span>
              </div>
              <input
                type="range"
                name="sabor"
                min="0"
                max="10"
                value={result.sabor}
                onChange={handleInputChange}
                className="slider-input"
                style={{ 
                  width: "100%", 
                  height: "8px",
                  background: "#fed7d7",
                  borderRadius: "9999px",
                  appearance: "none",
                  cursor: "pointer"
                }}
              />
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                fontSize: "0.75rem", 
                color: "#e53e3e", 
                marginTop: "0.25rem",
                position: "relative",
                height: "1rem",
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
              }}>
                <span style={{ position: "absolute", left: "0%" }}>0</span>
                <span style={{ position: "absolute", left: "50%" }}>5</span>
                <span style={{ position: "absolute", right: "0%" }}>10</span>
              </div>
            </label>
          </div>
          <div className="input-group" style={{ 
            background: "#fff5f5", 
            padding: "1rem", 
            borderRadius: "12px" 
          }}>
            <label className="input">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span className="input-label" style={{ color: "#9b2c2c", fontWeight: "500" }}>Preço:</span>
                <span className="value-display" style={{ color: "#e53e3e", fontWeight: "bold" }}>{priceLabels[result.price-1]}</span>
              </div>
              <input
                type="range"
                name="price"
                min="1"
                max="5"
                value={result.price}
                onChange={handleInputChange}
                className="slider-input"
                style={{ 
                  width: "100%", 
                  height: "8px",
                  background: "#fed7d7",
                  borderRadius: "9999px",
                  appearance: "none",
                  cursor: "pointer"
                }}
              />
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                fontSize: "0.75rem", 
                color: "#e53e3e", 
                marginTop: "0.25rem",
                position: "relative",
                height: "1rem",
                paddingLeft: "2%",
                paddingRight: "2%"
              }}>
                {priceLabels.map((label, index) => (
                  <span 
                    key={index} 
                    style={{ 
                      position: "absolute", 
                      left: `${index * 25}%`, 
                      fontWeight: result.price === index + 1 ? "600" : "normal",
                      transform: "translateX(-50%)"
                    }}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>
            </label>
          </div>

          <div className="input-group" style={{ 
            background: "#fff5f5", 
            padding: "1rem", 
            borderRadius: "12px" 
          }}>
            <label className="input">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                <span className="input-label" style={{ color: "#9b2c2c", fontWeight: "500" }}>Nota Geral:</span>
                <span className="value-display" style={{ color: "#e53e3e", fontWeight: "bold" }}>{result.global}</span>
              </div>
              <input
                type="range"
                name="global"
                min="0"
                max="10"
                value={result.global}
                onChange={handleInputChange}
                className="slider-input"
                style={{ 
                  width: "100%", 
                  height: "8px",
                  background: "#fed7d7",
                  borderRadius: "9999px",
                  appearance: "none",
                  cursor: "pointer"
                }}
              />
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                fontSize: "0.75rem", 
                color: "#e53e3e", 
                marginTop: "0.25rem",
                position: "relative",
                height: "1rem",
                paddingLeft: "0.5%",
                paddingRight: "0.5%"
              }}>
                <span style={{ position: "absolute", left: "0%" }}>0</span>
                <span style={{ position: "absolute", left: "50%" }}>5</span>
                <span style={{ position: "absolute", right: "0%" }}>10</span>
              </div>
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!image || loading}
            className="submit-btn"
            style={{ 
              width: "100%", 
              padding: "1rem", 
              borderRadius: "12px", 
              fontWeight: "bold", 
              fontSize: "1.125rem", 
              transition: "all 0.2s",
              backgroundColor: !image ? "#d1d5db" : loading ? "#fc8181" : "#e53e3e",
              color: !image ? "#6b7280" : "white",
              cursor: !image ? "not-allowed" : loading ? "wait" : "pointer",
              boxShadow: !image ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            {loading ? 'Enviando...' : 'Submeter Avaliação'}
          </button>

          {submitted && (
            <div className="success-message" style={{ 
              backgroundColor: "#f0fff4", 
              borderColor: "#c6f6d5", 
              color: "#2f855a", 
              padding: "0.75rem 1rem", 
              borderRadius: "12px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: "0.5rem", 
              marginTop: "1rem" 
            }}>
              <span style={{ fontSize: "1.25rem" }}>🎉</span>
              <span style={{ fontWeight: "500" }}>Avaliação enviada com sucesso!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;