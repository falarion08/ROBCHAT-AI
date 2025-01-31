
// Component for loading animation while waiting or message from the server
export default function LoadingMessage() {
    return (

            <div className='flex space-x-2 justify-center items-center min-h-5'>
                <span className='sr-only'>Loading...</span>
                <div className='h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-1.5 w-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-1.5 w-1.5 bg-white rounded-full animate-bounce'></div>
            </div>

)

}