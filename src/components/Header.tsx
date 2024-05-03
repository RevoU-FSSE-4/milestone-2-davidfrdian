import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="flex bg-green-800 flex-col p-8">
        <h1 className="text-white text-3xl font-bold my-6 w-full">
          Pokemon Stats
        </h1>
        <nav className="my-4">
          <ul className="flex justify-center gap-10">
            <li className="bg-emerald-200 font-semibold py-2 px-2 rounded-lg hover:text-slate-100 hover:bg-green-900 duration-200 shadow-lg w-32">
              <Link to="/">Search</Link>
            </li>
            <li className="bg-emerald-200 font-semibold py-2 px-2 rounded-lg hover:text-slate-100 hover:bg-green-900 duration-200 shadow-lg w-32">
              <Link to="/list">Pokemon List</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
