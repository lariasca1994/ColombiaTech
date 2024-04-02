import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useState } from 'react';
import { useCreateHouseMutation } from '../../features/api/apiHousesSlice';
import HouseForm from './HouseForm';

export default function HouseFormCreate() {
    const navigate = useNavigate();
    const [createHouse] = useCreateHouseMutation()
    
    const [file, setFile] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newHouse = {
            code: e.target.code.value,
            address: e.target.address.value,
            department: e.target.department.value.split("-")[1],
            city: e.target.city.value,
            price: e.target.price.value,
            numRooms: e.target.numRooms.value
        }
        try {
            const response = await createHouse(newHouse)
            if (response.data.status === "error") {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "La casa no pudo ser registrada, por favor verifique los datos",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                if (file) {
                    const formData = new FormData();
                    formData.append("file", file[0])
                    // uploadAvatar({_id: response.data._id, file: formData})
                }
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Casa creada correctamente",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    navigate('/houses') // Hacemos la redirección
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <HouseForm props={{
            handleSubmit: handleSubmit,
            handleChangeAvatar: null,
            house: null
        }} />
    );
}