'use client'

export function LoginStatus( { loginStatus }: {loginStatus: boolean} ){

    let message : string = '';

    if(loginStatus){
        message = "Logged In";
    }
    else{
        message = "Logged Out";
    }

    return (
        <div>
            {message}
        </div>
    );
}