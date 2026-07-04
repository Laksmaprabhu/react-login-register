const Dashboard = () => {

    const userRole = localStorage.getItem("userrole");
    return(
        <>
        <div className="heading-section">
            <h1>Dashboard</h1>
            {userRole =="contractor" ? "Hello contractor" : ""}
        </div>
        </>
    )
}

export default Dashboard;