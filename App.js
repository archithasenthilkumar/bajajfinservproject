import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [inputData, setInputData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate JSON input
            const jsonData = JSON.parse(inputData);
            if (!jsonData.data) {
                throw new Error('Invalid JSON format');
            }

            // Call the backend API
            const response = await axios.post('http://localhost:3000/bfhl', jsonData);
            setResponseData(response.data);
            setErrorMessage('');
            setDropdownVisible(true);
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred');
            setResponseData(null);
        }
    };

    const handleOptionChange = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const renderResponse = () => {
        if (!responseData) return null;

        return (
            <div>
                {selectedOptions.includes('Alphabets') && (
                    <div>
                        <h3>Alphabets:</h3>
                        <p>{responseData.alphabets.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Numbers') && (
                    <div>
                        <h3>Numbers:</h3>
                        <p>{responseData.numbers.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div>
                        <h3>Highest Lowercase Alphabet:</h3>
                        <p>{responseData.highest_lowercase_alphabet.join(', ')}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={inputData}
                    onChange={handleInputChange}
                    placeholder='Enter JSON here...'
                    rows='4'
                    cols='50'
                />
                <br />
                <button type='submit'>Submit</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {dropdownVisible && (
                <div>
                    <h3>Select Options:</h3>
                    <label>
                        <input type="checkbox" onChange={() => handleOptionChange('Alphabets')} />
                        Alphabets
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => handleOptionChange('Numbers')} />
                        Numbers
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => handleOptionChange('Highest lowercase alphabet')} />
                        Highest lowercase alphabet
                    </label>

                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;