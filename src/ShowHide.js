import React, { useState } from 'react'; //importing react and the useState hook
import 'react-datepicker/dist/react-datepicker.css'; //importing the CSS for the date picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; //importing LocalizationProvider from MUI date pickers
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; //importing AdapterDayjs from MUI date pickers
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; //importing DateTimePicker from MUI date pickers
import dayjs from 'dayjs'; //importing dayjs library for date manipulation
import propertiesData from './properties.json'; //importing property data from a JSON file

const ShowHide = ({onSearch}) => { //declaring the ShowHide component receiving onSearch as a prop
    const [showForm, setShowForm] = useState(false); //state for toggling form visibility
    const [value, setValue] = useState(dayjs); //state for managing date/time value
    const [searchCriteria, setSearchCriteria] = useState({ //state for managing search criteria
        type: '',
        priceRange: '',
        minBedrooms: '',
        maxBedrooms: '',
        minDate: null,
        maxDate: null,
        postcodeArea: '',
    });

    const [filteredProperties, setFilteredProperties] = useState(propertiesData); //state for filtered properties

    const toggleForm = () => { //function to toggle the form visibilty
        setShowForm(!showForm); 
    };

    const searchProperty = (address, price, rooms, dateAdded) => { //function to filter properties based on search criteria
        let filteredProperties = propertiesData;
      
        if (searchCriteria.address) { //filtering by address if provided in the search criteria
          filteredProperties = filteredProperties.filter((property) => 
            property.address.toLowerCase().includes(address.toLowerCase()) //filter by address
          );
        }
      
        if (price) {
          filteredProperties = filteredProperties.filter(
            (property) => property.price === parseInt(price) //filter by price
          );
        }
      
        if (rooms) {
          filteredProperties = filteredProperties.filter(
            (property) => property.rooms === parseInt(rooms) //filer by num of rooms
          );
        }
      
        if (dateAdded) {
          filteredProperties = filteredProperties.filter((property) =>
            property.dateAdded.includes(dateAdded) //filter bt date added
          );
        }
      
        setFilteredProperties(filteredProperties); //set properties based on filters
     };
    
    

    return (
        <div className="showhide"> {/* Render a div with class 'showhide' */}
            <button className="showhidebtn" onClick={toggleForm}> {/* Render a button to toggle the form visibility */}
                {showForm ? 'Hide Advanced Search' : 'Show Advanced Search'} {/* Conditional button text */}
            </button>
            {showForm && ( 
                <div className="showhideform">
                    <div className="typeContainer">
                        <label htmlFor="proptype" className="typelabel">Type:</label>
                        <select
                            id="proptype"
                            value={searchCriteria.type}
                            className="proptype"
                            onChange={(e) => 
                                setSearchCriteria({...searchCriteria, type: e.target.value})
                            }
                        >
                            <option value="">Select Type</option>
                            <option value="House">House</option>
                            <option value="Flat">Flat</option>
                            <option value="Any">Any</option>
                        </select>
                    </div>
                    <div className="typeContainer">
                    <label htmlFor="proptype" className="typelabel">Price range:</label>
                        <select
                            className="proptype"
                            value={searchCriteria.priceRange}
                            onChange={(e) =>
                                setSearchCriteria({...searchCriteria, priceRange: e.target.value})
                            }
                        >
                            <option value="">Select Price Range</option>
                            <option value="0-200,000">0-200,000</option>
                            <option value="200,000-400,000">200,000-400,000</option>
                            <option value="400,000-600,000">400,000-600,000</option>
                            <option value="600,000-800,000">600,000-800,000</option>
                            <option value="800,000-1,000,000">800,000-1,000,000</option>
                        </select>
                    </div>
                    <div className="typeContainer">
                    <label htmlFor="proptype" className="typelabel">Bedrooms:</label>
                        <input
                            type="number"
                            className="proptype"
                            placeholder="Min bedrooms"
                            value={searchCriteria.minBedrooms}
                            onChange={(e) =>
                                setSearchCriteria({...searchCriteria, minBedrooms: e.target.value})
                            }
                        />
                        <input
                            type="number"
                            className="proptype"
                            placeholder="Max bedrooms"
                            value={searchCriteria.maxBedrooms}
                            onChange={(e) =>
                                setSearchCriteria({...searchCriteria, maxBedrooms: e.target.value})
                            }
                        />
                    </div>
                    <p className="typelabel">Date Range:</p>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        defaultValue={dayjs('2023-01-01')}
                        className="datetime"
                    />
                    <DateTimePicker
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        className="datetime"
                    />
                    </LocalizationProvider>
                    <div className="typeContainer">
                    <label htmlFor="proptype" className="typelabel">Postcode:</label>
                        <input
                            type="text"
                            className="proptype"
                            placeholder="Enter postcode"
                            value={searchCriteria.postcodeArea}
                            onChange={(e) =>
                                setSearchCriteria({...searchCriteria, postcodeArea: e.target.value})
                            }
                        />
                    </div>
                    <button type="button" className="submitbtn" onClick={() => searchProperty(
                        searchCriteria.address,
                        searchCriteria.priceRange,
                        searchCriteria.minBedrooms,
                        searchCriteria.maxBedrooms,
                        searchCriteria.minDate,
                        searchCriteria.maxDate,
                        searchCriteria.postcodeArea
                    )}>
                        <b>Search</b>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShowHide;
