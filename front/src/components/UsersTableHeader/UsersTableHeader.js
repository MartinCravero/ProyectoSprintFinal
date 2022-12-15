import { UsersData } from "../UsersData/UsersData"

export const UsersTableHeader = ({renderData, renderCleanUsers, openEditModal}) => {

    return <>
    {renderData ?
        <table className="content-table">
            <thead>
                <tr>
                    <th className='th2'>Nombre</th>
                    <th className='th3'>Apellido</th>
                    <th className='th4'>Email</th>
                    <th className='th5'>Perfil</th>
                    <th className='th6'>Contraseña</th>
                    <th className='th8'>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {renderData ? renderData.map((data)=> 
                <UsersData renderData={data} key={data.id_usuario} renderCleanUsers={renderCleanUsers} openEditModal={openEditModal}/>) : <tr className="loading"></tr>}
            </tbody>
        </table>
    : <div className="loadingFather"><div className="loading"></div></div> }
    </>
}