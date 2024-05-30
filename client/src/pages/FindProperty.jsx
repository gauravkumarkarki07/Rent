import { useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import useGetApi from '../services/api/useGetAPI.js';

export default function FindProperty() {

  const [get, responseData] = useGetApi(`/api/user/getallproperty`);

  useEffect(() => {

      const getData=async()=>{
          await get();
      }

     getData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between">
        <div className="w-[80%] border flex justify-center px-2 py-2">
                    <input
                        className="border"
                        type="text"
                        placeholder="Search..."
                    />
        </div>
        <div className="w-[80%] grid grid-cols-4 py-2">
                    {responseData?.propertyDetails ? (
                        responseData.propertyDetails.map((data, index) => (
                            <PropertyCard key={index}
                                address={data.address}
                                propertyImage={data.propertyImage}
                                bedroom={data.bedroom}
                                bathroom={data.bathroom}
                                propertyType={data.propertyType}
                                price={data.price}
                            />
                        ))
                    ) : (
                        <p>No Data</p>
                    )}
                </div>
    </div>
  )
}
