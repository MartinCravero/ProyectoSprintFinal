import { LocationData } from "../LocationData/LocationData"

export const LocationTableHeader = ({renderData, renderCleanCities, openEditModal}) => {

    return <>
    {renderData ?
        <table className="content-table">
            <thead>
                <tr>
                    <th className='th2'>Región</th>
                    <th className='th3'>País</th>
                    <th className='th4'>Provincia</th>
                    <th className='th5'>Ciudad</th>
                    <th className='th6'>Dirección</th>
                    <th className='th8'>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {renderData ? renderData.map((data)=> 
                <LocationData renderData={data} key={data.id_ciudad} renderCleanCities={renderCleanCities} openEditModal={openEditModal}/>) : <tr className="loading"></tr>}
            </tbody>
        </table>
    : <div className="loadingFather"><div className="loading"></div></div>}
    </>

}