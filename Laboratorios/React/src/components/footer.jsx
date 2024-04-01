export default function Footer() {
    return (
      <div className="bg-gray-800  shadow-lg shadow-orange-500/100 text-white py-5 w-100 bottom-0 w-full">
        <p>
          <span className="text-green-200"><strong>Desarrollador: </strong></span>
          <span>Diego Núñez</span>
        </p>
        <div className="inline-flex px-1 py-2">
          <a href="https://www.linkedin.com/in/ddienu/" target="blank">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
              alt="Logo linkedIn"
              height={25}
              width={25}
            />
          </a>
        </div>
        <div className="inline-flex px-1 py-2">
          <a href="https://github.com/ddienu" target="blank">
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-github-36-226096.png?f=webp"
              alt="Logo Github"
              height={25}
              width={25}
            />
          </a>
        </div>
        <p>Talento Tech <strong>&#169;</strong></p>
        <p className="text-green-200">2024</p>
      </div>
    );
  }  