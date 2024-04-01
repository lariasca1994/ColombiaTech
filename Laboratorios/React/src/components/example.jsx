import { useState } from "react";

function Profile({ user }) {
  /*Se elimina el objeto quemado y se le pasa a la función para que la reciba por parámetro */
  // const user = {
  //   name : "Radamel Falcao",
  //   imageUrl : "https://pm1.aminoapps.com/6306/e5193c687a065f8ea3f0412a24c6237502a31905_128.jpg",
  //   imageSize : 90
  // }

  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of" + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}

export default function Example() {
  const saludar = () => {
    alert("Saludos");
  };

  const mostrarTexto = (e) => {
    console.log(e.target.value);
  };

  const keyUp = () => {
    console.log("Soltó una tecla");
  };

  /*Cambiando el estado del contador*/
  const [count, setCount] = useState(0);

  const users = [
    {
      name: "Radamel Falcao",
      imageUrl:
        "https://pm1.aminoapps.com/6306/e5193c687a065f8ea3f0412a24c6237502a31905_128.jpg",
      imageSize: 90,
    },
    {
      name: "Ma Long",
      imageUrl:
        "https://images.sportschau.de/image/c1eee748-73a4-4403-a290-a20d43b980c9/AAABi5tZdaQ/AAABjcWey4U/1x1-256/ma-long-100.jpg",
      imageSize: 90,
    },
    {
      name: "Zhang Jike",
      imageUrl:
        "https://butterflyonline.com/wp-content/uploads/2017/08/Zhang-Jike-Chiquita-.jpg",
      imageSize: 90,
    },
  ];

  return (
    <>
      {users.map((user) => (
        <Profile key={user.name} user={user} />
      ))}
      <br />
      <button onClick={() => saludar()}>Enviar</button>
      <input type="text" onChange={mostrarTexto} onKeyUp={keyUp}></input>
      <br />
      <button onClick={() => setCount(count + 1)}>Sumar</button>
      <button onClick={() => setCount(count - 1)}>Restar</button>
      <p>El contador va en: {count}</p>
    </>
  );
}