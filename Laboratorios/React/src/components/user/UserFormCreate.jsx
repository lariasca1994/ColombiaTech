import { useNavigate } from 'react-router-dom'
import { useCreateUserMutation, useUpdateAvatarMutation } from '../../features/api/apiSlice';
import Swal from 'sweetalert2'
import UserForm from './UserForm';
import { useState } from 'react';

export default function UserFormCreate(){

    const navigate = useNavigate(); // Instanciamos la variable de useNavigate
    const [file, setFile] = useState(null);
    const [createUser] = useCreateUserMutation();
    const [uploadAvatar] = useUpdateAvatarMutation();

    const handleChangeAvatar = (e) => {
      setFile(e.target.files);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
          name: e.target.name.value,
          lastname: e.target.lastname.value,
          email: e.target.email.value,
          userId: e.target.identification.value,
          password: e.target.password.value,
        };
        console.log(e.target.avatar.value);
        try {
          const response = await createUser(newUser);
          // console.log(response.data.status);
    
          if (response.data.status == "error") {
            // console.log(response.data.message);
            Swal.fire({
              icon: "error",
              title: response.data.status.toUpperCase(),
              text: response.data.message,
            })
          } else {

            if(file){
              const formData = new FormData();
              formData.append("file", file[0]);
              uploadAvatar({_id : response.data._id, file: formData});
            }
            Swal.fire({
              icon: "success",
              title: "Usuario creado correctamente",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              navigate("/users");
            });
          }
        } catch (error) {
            console.log(error);
        }
      };
      return (
        <UserForm props={{handleSubmit: handleSubmit, handleChangeAvatar:handleChangeAvatar, user:null}} />
    );
}