export default function Login(){
    return (
        <div className="flex flex-col justify-center items-center h-max">
            <form className="align-middle" action="" method="get">
                <label htmlFor="Username">Username: </label> <br />
                <input className="border-2" type="text" id="username" name="username"/> <br />
                <label htmlFor="Password">Password: </label> <br />
                <input className="border-2" type="text" id="password" name="password"/> <br /> <br />
                <input className="border-2" type="submit" value="Login"></input>
            </form>
        </div>
    );
}