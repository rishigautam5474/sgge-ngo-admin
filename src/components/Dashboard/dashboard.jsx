export const Dashboard = () => {
    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center">
                <h6>Dashboard</h6>
            </div>
            <div className="mt-3 ms-4 px-4">
                <div className="row">
                    <div className="col-4 border border-1 border-dark rounded p-2 m-2" style={{height: "200px", width: "350px", backgroundColor: "lightblue"}}></div>
                    <div className="col-4 border border-1 border-dark rounded p-2 m-2" style={{height: "200px", width: "350px", backgroundColor: "lightgreen"}}></div>
                    <div className="col-4 border border-1 border-dark rounded p-2 m-2" style={{height: "200px", width: "350px", backgroundColor: "lightpink"}}></div>
                </div>
                <div className="row">
                    <div className="col-4 border border-1 border-dark rounded p-2 m-2" style={{height: "200px", width: "350px", backgroundColor: "lightblue"}}></div>
                    <div className="col-4 border border-1 border-dark rounded p-2 m-2" style={{height: "200px", width: "350px", backgroundColor: "lightgreen"}}></div>
                    <div className="col-4 border border-1 border-dark rounded p-2 m-2" style={{height: "200px", width: "350px", backgroundColor: "lightpink"}}></div>
                </div>
                <div>
                    <h2>Admin Dashboard</h2>
                </div>
            </div>
        </div>
    )
}