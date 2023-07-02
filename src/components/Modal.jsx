import { useState, useEffect } from "react";
import Mensaje from "./Mensaje";
import CerrarBTN from '../img/cerrar.svg'




const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const[mensaje, setMensaje] = useState('')    
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
 
    }, [])
    




    const ocultarModal = () => {
        setModal(false)
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 250);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if([ nombre, cantidad, categoria ].includes('')) {
            setMensaje('todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 5000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }


  return (
    <div className="modal">
        <div className="cerrar-modal"> 
            <img 
            src={CerrarBTN}
            alt="cerrar modal"
            onClick={ocultarModal}
            />
        
        
        </div>   

        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
        >
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo gasto' }</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input
                    id="nombre"
                    type="text"
                    placeholder="añade el nombre del gasto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="nombre">cantidad</label>

                <input
                    id="cantidad"
                    type="number"
                    placeholder="añade la cantidad del gasto: ej. 300"
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">categoria</label>

                <select id="categoria"
                value={categoria}
                    onChange={e => setCategoria(e.target.value)}>
                    <option value="">-- seleccione --</option>
                    <option value="ahorro">ahorro</option>
                    <option value="comida">comida</option>
                    <option value="casa">casa</option>
                    <option value="gastos">gastos varios</option>
                    <option value="ocio">ocio</option>
                    <option value="salud">salud</option>
                    <option value="suscripciones"> suscripciones</option>
                </select>

            </div>

            <input 
            type="submit"
            value={gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo gasto' }
            />

        </form>     
    </div>
  )
}

export default Modal