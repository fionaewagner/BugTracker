import './Header.css'
const Header =({name})=>{
    return(
        <div className="dash-header">
                <h3 className="header-title">
                    {name}
                </h3>

        </div>
    )
}

export default Header