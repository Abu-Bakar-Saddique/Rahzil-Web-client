import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/http-hook';
import PlaceList from '../components/Trips/PlaceList';
import LoadingSpinner from '../components/UIElements/LoadingSpinner';
import { useLocation } from 'react-router-dom';

const UserPlaces = () => {

  const loc=useLocation();
  const { isloading, error, sendRequest } = useHttpClient();

  const [allPlaces, setallPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/trips/');
        setallPlaces(responseData.trips)

      } catch (errorr) {
        console.log(errorr)
      }
    }
    fetchData();
  }, [sendRequest])

  return (
    <div>
      {
        error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      }
      {
        isloading && (
          <div className='center'>
            <LoadingSpinner />
          </div>
        )
      }
      {
        loc.state&&(
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {loc.state}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      }
      {allPlaces.length !== 0 && (
        <PlaceList items={allPlaces} />
      )
      }
    </div>

  );
};

export default UserPlaces;
