interface AccountNavProps{
    subPage: number;
    setSubPage:(location : number) => void;
}

const AccountNav = ({subPage, setSubPage} :AccountNavProps)=> {
// use subPage to change the class of the a and make it green and pretty :3
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" onClick={()=>setSubPage(1)}>
              Administration <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setSubPage(2)}>
              Succursales
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setSubPage(3)}>
              Livraison
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setSubPage(4)}>
              Autres
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { AccountNav };
