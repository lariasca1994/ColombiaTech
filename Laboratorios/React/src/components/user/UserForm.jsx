export default function UserForm({ props }) {
    const { handleSubmit, handleChangeAvatar, user } = props
  
    return (
      <div className="max-w-md mx-auto px-5 py-5">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full focus:shadow-outline"
              defaultValue={user?.name}
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              className="shadow appearance-none border rounded w-full focus:shadow-outline"
              defaultValue={user?.lastname}
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full focus:shadow-outline"
              defaultValue={user?.email}
            ></input>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Identification
            </label>
            <input
              type="number"
              name="identification"
              placeholder="Identification"
              className="shadow appearance-none border rounded w-full focus:shadow-outline"
              defaultValue={user?.userId}
            ></input>
          </div>
          {user ? null : (
            <div className="mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full focus:shadow-outline"
                ></input>
              </div>
              <div className="py-2"></div>
            </div>
          )}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="avatar"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
                type="file"
                className="hidden"
                onChange={handleChangeAvatar}
              />
            </label>
          </div>
          <div className="py-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 rounded text-blue-50 font-bold py-2 px-4"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }  