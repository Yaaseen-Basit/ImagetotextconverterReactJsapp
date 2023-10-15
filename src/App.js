// import './App.css';
// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';

// const languageOptions = [
//   { label: 'English', value: 'eng' },
//   { label: 'French', value: 'fra' },
//   { label: 'Spanish', value: 'spa' },
//   { label: 'Arabic', value: 'ara' },
//   { label: 'Hindi', value: 'hin' },
//   { label: 'Urdu', value: 'urd' },
//   { label: 'Marathi', value: 'mar' },
// ];

// function MultilingualOCR() {
//   const [selectedLanguage, setSelectedLanguage] = useState('');
//   const [recognizedText, setRecognizedText] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };

//   const performTextRecognition = async () => {
//     if (selectedImage && selectedLanguage) {
//       const { data } = await Tesseract.recognize(selectedImage, selectedLanguage);
//       setRecognizedText(data.text);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//         <h1 className="text-primary cursive-font">Multilingual Image to Text Converter</h1>

//           <div className="form-group">
//             <input type="file" className="form-control" onChange={handleImageUpload} />
//           </div>
//           {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="img-fluid" />}
//           <select
//             className="form-control my-3"
//             value={selectedLanguage}
//             onChange={handleLanguageChange}
//           >
//             <option value="">Select a Language</option>
//             {languageOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//           <button className="btn btn-primary" onClick={performTextRecognition}>Recognize Text</button>
//           <div className="mt-3">
//             <pre>{recognizedText}</pre>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MultilingualOCR;
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import Spinner from './Spinner';

const languageOptions = [
  { label: 'English', value: 'eng' },
  { label: 'French', value: 'fra' },
  { label: 'Spanish', value: 'spa' },
  { label: 'Arabic', value: 'ara' },
  { label: 'Hindi', value: 'hin' },
  { label: 'Urdu', value: 'urd' },
  { label: 'Marathi', value: 'mar' },
];

function MultilingualOCR() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // Clear recognized text when a new image is selected
    setRecognizedText('');
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const performTextRecognition = async () => {
    if (selectedImage && selectedLanguage) {
      setProcessing(true); // Start processing

      try {
        const { data } = await Tesseract.recognize(selectedImage, selectedLanguage);
        setRecognizedText(data.text);
      } catch (error) {
        // Handle any errors if needed
        console.error(error);
      } finally {
        setProcessing(false); // Processing is complete
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-primary cursive-font">Multilingual Image to Text Converter</h1>

          <div className="form-group" >
            <input type="file" className="form-control" onChange={handleImageUpload} />
          </div>
          {selectedImage && (
            <div style={{ marginTop: '10px' }}>
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="img-fluid" />
            </div>
          )}
          <div style={{ marginTop: '15px' }}> {/* Add spacing here */}
            <select
              className="form-control"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="">Select a Language</option>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button style={{ marginTop: '15px' }} className="btn btn-primary" onClick={performTextRecognition} disabled={processing}>
            Recognize Text
          </button>
          {processing && (
            <div>
              <Spinner />
              <p>Processing...</p>
            </div>
          )}
          <div className="mt-3">
            <pre>{recognizedText}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultilingualOCR;
