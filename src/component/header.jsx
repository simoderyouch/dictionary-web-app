import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../store/features/fontSlice";

function Header() {

  const { font } = useSelector((state) => state.font);

  const [show, setShow] = useState(false);
 
  const dispatch = useDispatch();
  const handleClick = (className) => {
    dispatch(change(className));
  };
  
   const handleTheme = () => {
    document.body.classList.toggle("dark")
   }
  return (
   
      <div className="header">
        <img src="./assets//images/logo.svg" alt="logo" />
        <div className="left">
          <div className="drop-menu">
            <div
              className="drop-menu-btn"
              onClick={() => {
                setShow(!show);
              }}
            >
              {" "}
              <span>{font}</span>
              <img src="./assets//images/icon-arrow-down.svg" alt="logo" />
            </div>
            <ul className={show ? "option show" : "option"}>
              <li
                className="Sans-serif"
                onClick={() => handleClick("Sans-serif")}
              >
                Sans-serif
              </li>

              <li className="Serif" onClick={() => handleClick("Serif")}>
                Serif
              </li>

              <li className="Mono" onClick={() => handleClick("Mono")}>
                Mono
              </li>
            </ul>
          </div>

          <div className="vl"></div>

          <div className="switch">
            <div className="switch-mode">
              <input type="checkbox" onChange={handleTheme} className="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label">
                <span className="ball"></span>
              </label>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
            >
              <path
                fill="none"
                stroke="#838383"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
              />
            </svg>
          </div>
        </div>
      </div>

  
  );
}

export default Header;
