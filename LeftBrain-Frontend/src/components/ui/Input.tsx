export function Input({reference,placeholder}:{reference:any, placeholder:string}){
    return <div className="flex justify-center">
        <input type="text" placeholder={placeholder} className="px-10 py-2 border m-2 rounded-md text-xl " ref={reference}/>
    </div>
}