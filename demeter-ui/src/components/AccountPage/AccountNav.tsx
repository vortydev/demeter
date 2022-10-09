interface AccountNavProps{
    subPage: string;
    setSubPage:(location : string) => void;
}

function AccountNav({subPage, setSubPage} :AccountNavProps) {
// use subPage to change the class of the a and make it green and pretty :3
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <div
        className="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" onClick={()=>setSubPage('admin')}>
              Administration <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setSubPage('shops')}>
              Succursales
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setSubPage('delivery')}>
              Livraison
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setSubPage('other')}>
              Autres
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export { AccountNav };
