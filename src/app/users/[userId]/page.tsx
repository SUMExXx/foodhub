interface UserProps{
    params: {userId: string}
}

export default async function User({params: {userId}} : UserProps) {
    return(
        <div></div>
    )
}