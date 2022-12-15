import './ImportContactModal.css'
import importImg from '../../assets/ImportContact.png'

export const ImportContactModal = ({closeModal}) => {
    return <div className="importModal">
            <div className="importModalBody">
                <img src={importImg} alt="importImg"/>
                <p>Selecciona el archivo de tu ordenador para importar tus contactos.</p>
                <div className="importModalActions">
                    <button className="cancelBtn" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" >Importar</button>
                </div>
            </div>
    </div>
}