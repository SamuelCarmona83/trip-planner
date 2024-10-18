import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext.js"
import '../../styles/viajes.css';
import {Link} from 'react-router-dom';
import ShoppingCart from "../component/shoppingCart.js"
import toast from "react-hot-toast";


const IndividualTrip = () => {

    const { store, actions } = useContext(Context);

    const [newMember, setNewMember] = useState({ name: "", email: "" });

    const handleInputChange = (e) => {
        setNewMember({ ...newMember, [e.target.name] : e.target.value });
    }
    
    const handleAddMemeber = () => {
        if(newMember.name && newMember.email) {
            actions.addMember(newMember);
            setNewMember({ name: "", email: "" });
            toast.success("Miembro agregado correctamente")
        } else {
            alert("Por favor, completa todos los campos")
        }
    }

    const [selectedMember, setSelectedMember] = useState("null");
    
    return (
        <>
            <div className="container">

                <div className=" rounded d-flex flex-column flex-md-row justify-content-between bg-light p-4 shadow">
                    <div className="d-flex flex-column flex-md-row justify-content-between" style={{ width: "80%" }} >
                        <h5 className="mb-1">Nombre de Viaje</h5>
                        <p className="mb-1">DD/MM/AAAA</p>
                        <p className="mb-1">Presupuesto</p>

                    </div>
                    <div className="mx-4 mt-3 mt-md-0">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle shadow" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                <i className="fa-solid fa-user-group me-2"></i>
                                Miembros
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark p-1 " aria-labelledby="dropdownMenuButton2">
                                {store.miembros.length == 0 ? (
                                <span className="d-flex flex justify-content-center text-secundary m-3">Ni tienes ningún miembre en tu grupo</span>
                                ) : (
                                    store.miembros.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <li className="d-flex flex">
                                                <p className="dropdown-item d-flex flex justify-content-between align-items-center" href="#">{item.name}</p>
                                                <i className="d-flex flex fa-solid justify-content-end fa-circle-info fs-5 m-1"></i>
                                                <i className="d-flex flex delete-trip align-item-center fa-solid fa-trash-can m-1 " role="button" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#deleteModal"
                                                    onClick={()=>setSelectedMember(item)}
                                                    ></i>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                        </React.Fragment>
                                    ))
                                )}
                            
                                <li className="add-member text">
                                    <span className="dropdown-item"><i className="fa-solid fa-user-plus me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                    </i>Agregar miembro</span>                                        
                                </li>
                            </ul>
                            
                            {/* modal para eliminar miembro */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <React.Fragment>
                                                <div className="modal-header">
                                                    <h1 className="modal-title d-flex flex justify-content-center align-center fs-5" id="deleteModalLabel">Eliminar miembro</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    {selectedMember ? `¿Estás seguro de eliminar a ${selectedMember.name} de tu grupo?` : "...Cargando"}
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                                    <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                                        onClick={() => {
                                                            actions.deleteMember(selectedMember)
                                                            setSelectedMember(null)
                                                            toast.success("Miembro borrado correctamente")
                                                        }}
                                                    >Eliminar</button>
                                                </div>
                                            </React.Fragment>
                                        </div>
                                    </div>
                                </div>

                            {/* modal para agregar miembro */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Invita a un amigo</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="mb-3">
                                                        <label htmlFor="recipient-name" className="col-form-label">Email:</label>
                                                        <input type="email" className="email form-control" id="recipient-email" name="email" value={newMember.email} onChange={handleInputChange} />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="message-text" className="col-form-label">Nombre:</label>
                                                        <input type="text" className="name form-control" id="recipient-name" name="name" value={newMember.name} onChange={handleInputChange} />
                                                    </div>
                                                </form>
                                            </div>
                        
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                                <button type="button" className="btn btn-success" 
                                                    data-bs-dismiss="modal" 
                                                    onClick={handleAddMemeber}
                                                    >Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ShoppingCart />
            </div>
            <div className="container">
                <div className="row justify-content-center g-4">
                    {store.activities.map((item, index) => {
                        return (
                            // <Card className="col" key={index} actividad={item.name} costo={item.cost} autor={item.author} likes={item.likes} image={item.imageUrl} />
                            <div key={index} className="col-md-3">
                                <div className="card rounded shadow h-100" style={{ width: '100%' }}>
                                    <img src={item.imageUrl} className="card-img-top" alt="..." style={{ height: '280px', objectFit: 'cover' }} />
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="card-title mb-0">{item.name}</h5>
                                            <p className="mb-0 text-muted small"><i className="fa-solid fa-user me-2"></i>{item.author}</p>
                                        </div>
                                        <p className="card-text">{item.description}</p>
                                            <div className="d-flex justify-content-end align-items-center border-black border-bottom border-3  my-2">
                                                <span className="p-2 rounded">${item.cost}</span>
                                            </div>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <Link to="/details" className="detalles text-light btn-sm px-4">Ver más</Link>
                                            <div className="d-flex align-items-center">
                                                <button className="bg-transparent border-0"><i className="text-danger fa-solid fa-heart me-2"></i>{item.likes}</button>
                                            </div>
                                        </div>
                                    </div>
                                        <div className="card-footer text-center bg-secondary text-light p-2">
                                            <button className={`btn btn btn-light btn-sm px-4 shadow ${actions.isViaje({name: item.name, id: item.id, type: "tripDetail"}) && "btn-danger"} `}
                                            onClick={() => actions.addViaje( {name: item.name, id: item.id, type: "tripDetail", cost: item.cost, imageUrl: item.imageUrl} )}>
                                            {actions.isViaje( {name: item.name, id: item.id, type: "tripDetail", cost: item.cost, imageUrl: item.imageUrl}) ? 
                                                <>
                                                    <i className="text-danger delete-trip fa-solid fa-trash-can p-1"></i>
                                                    <span className="text-danger">Quitar</span> 
                                                </>
                                                : 
                                                <>
                                                    <i className="text-success fa-solid fa-circle-plus p-1"></i>
                                                    <span>Agregar</span>
                                                </>
                                            }
                                            </button>
                                        </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}
export default IndividualTrip

{/* <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <img src="..." class="card-img-top" alt="...">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </div>
    </div>
  </div> */}