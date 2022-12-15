import { ContactData } from "../ContactData/ContactData"
import './ContactsTableHeader.css'

export const ContactsTableHeader = ({renderData, openEditModal}) => {

    return <>
    {renderData ?
        <table className="content-table">
            <thead>
                <tr>
                    <th className='th1'><input type="checkbox" className="selectContact" id="selectContact" /></th>
                    <th className='th2'>Contacto</th>
                    <th className='th3'>País/Región</th>
                    <th className='th4'>Compañía</th>
                    <th className='th5'>Cargo</th>
                    <th className='th7'>Interés</th>
                    <th className='th8'>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {renderData ? renderData.map((data)=> 
                <ContactData renderData={data} openEditModal={openEditModal} key={data.id_contacto}/>) : <tr className="loading"></tr>}
            </tbody>
        </table>
    : <div className="loadingFather"><div className="loading"></div></div> }
    </>
}